import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import ErrorUtil from "@/utils/error/Error";

export interface ApiErrorResponse {
  error?: {
    message?: string;
  };
}

export type GatewayResponse<T> = AxiosResponse<T>;
export type BaseGatewayResponse<T> = GatewayResponse<{ data: T }>;

export interface ErrorCallbacks {
  onBadRequest?: (error: AxiosError) => void;
  onUnauthorized?: (error: AxiosError) => void;
  onForbidden?: (error: AxiosError) => void;
  onNotFound?: (error: AxiosError) => void;
  onInternalServerError?: (error: AxiosError) => void;
}

export class GatewayService {
  private instance: AxiosInstance;
  private locale: string;
  private errorCallbacks: ErrorCallbacks;
  private timeout: number;

  constructor(
    baseURL: string,
    locale: string,
    errorCallbacks: ErrorCallbacks = {},
    timeout = 180000,
  ) {
    this.instance = axios.create({
      baseURL,
      timeout,
      headers: {
        accept: "*/*",
      },
    });

    this.locale = locale;
    this.errorCallbacks = errorCallbacks;
    this.timeout = timeout;
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use((request) => {
      // Add auth token from localStorage if available
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth-token");
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }
      }
      return request;
    });

    this.instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(ErrorUtil.normalizeError(error)),
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        this.handleResponseError(error);
        return Promise.reject(ErrorUtil.normalizeError(error));
      },
    );
  }

  private handleResponseError(error: AxiosError<ApiErrorResponse>) {
    const {
      onBadRequest,
      onUnauthorized,
      onForbidden,
      onNotFound,
      onInternalServerError,
    } = this.errorCallbacks;

    if (error.response?.status === 400 && onBadRequest) {
      onBadRequest(error);
    }
    if (error.response?.status === 401) {
      if (onUnauthorized) onUnauthorized(error);
    }
    if (error.response?.status === 403 && onForbidden) {
      onForbidden(error);
    }
    if (error.response?.status === 404 && onNotFound) {
      onNotFound(error);
    }
    if (error.response?.status === 500 && onInternalServerError) {
      onInternalServerError(error);
    }
  }

  public get(
    url: string,
    params?: Record<string, unknown>,
    options: AxiosRequestConfig = {},
  ) {
    const axiosParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle all array values as repeated parameters
          value.forEach((item) => axiosParams.append(key, String(item)));
        } else if (value !== undefined && value !== null) {
          axiosParams.append(key, String(value));
        }
      });
    }

    return this.instance.get(url, {
      ...options,
      params: axiosParams,
    });
  }

  public post(
    url: string,
    data?: FormData | URLSearchParams | Record<string, unknown>,
    options: AxiosRequestConfig = {},
  ) {
    return this.instance.post(url, data, options);
  }

  public put(
    url: string,
    data?: Record<string, unknown>,
    options: AxiosRequestConfig = {},
  ) {
    return this.instance.put(url, data, options);
  }

  public delete(url: string, options: AxiosRequestConfig = {}) {
    return this.instance.delete(url, options);
  }

  public patch(
    url: string,
    data?: Record<string, unknown>,
    options: AxiosRequestConfig = {},
  ) {
    return this.instance.patch(url, data, options);
  }
}

export const createGatewayService = (
  baseURL: string,
  locale: string,
  errorCallbacks: ErrorCallbacks = {},
) => {
  return new GatewayService(baseURL, locale, errorCallbacks);
};
