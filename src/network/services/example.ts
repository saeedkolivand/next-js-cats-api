import { BaseGatewayResponse, GatewayService } from "@/network/gateway/Gateway";

class ExamplePostService {
  private gatewayService: GatewayService;

  constructor(gatewayService: GatewayService) {
    this.gatewayService = gatewayService;
  }

  getAllExamplePosts = ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<BaseGatewayResponse<never>> => {
    const url = `${process.env.NEXT_PUBLIC_TARGET_ENV}/${process.env.NEXT_PUBLIC_BASE_API_VERSION}/posts`;

    const params = {
      page,
      limit,
    };

    return this.gatewayService.get(url, params);
  };

  createExamplePost = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }): Promise<any> => {
    const url = `${process.env.NEXT_PUBLIC_TARGET_ENV}/${process.env.NEXT_PUBLIC_BASE_API_VERSION}/create-posts`;
    const params = {
      title,
      description,
    };
    return this.gatewayService.post(url, params);
  };

  updateExamplePost = ({
    id,
    title,
    description,
  }: {
    id: string;
    title: string;
    description: string;
  }): Promise<any> => {
    const url = `${process.env.NEXT_PUBLIC_TARGET_ENV}/${process.env.NEXT_PUBLIC_BASE_API_VERSION}/post/${id}`;
    const params = {
      title,
      description,
    };
    return this.gatewayService.post(url, params);
  };

  deleteExamplePost = ({ id }: { id: string }): Promise<any> => {
    const url = `${process.env.NEXT_PUBLIC_TARGET_ENV}/${process.env.NEXT_PUBLIC_BASE_API_VERSION}/post/${id}`;
    return this.gatewayService.delete(url);
  };
}

export default ExamplePostService;
