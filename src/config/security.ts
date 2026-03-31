// Security configuration constants

export const SECURITY_CONFIG = {
  // CSP Configuration
  CSP: {
    DIRECTIVES: {
      DEFAULT_SRC: "'self'",
      SCRIPT_SRC: "'self'",
      STYLE_SRC: "'self' 'unsafe-inline' https://fonts.googleapis.com",
      FONT_SRC: "'self' https://fonts.gstatic.com",
      IMG_SRC:
        "'self' data: https://cdn2.thecatapi.com https://thecatapi.com https://images.unsplash.com",
      CONNECT_SRC: "'self' https://api.thecatapi.com",
      FRAME_SRC: "'none'",
      OBJECT_SRC: "'none'",
      BASE_URI: "'self'",
      FORM_ACTION: "'self'",
      FRAME_ANCESTORS: "'none'",
    },
  },

  // Input validation limits
  VALIDATION: {
    MAX_STRING_LENGTH: 1000,
    MAX_URL_LENGTH: 2048,
    ALLOWED_PROTOCOLS: ["https:", "http:"],
    ALLOWED_HOSTS: [
      "thecatapi.com",
      "cdn2.thecatapi.com",
      "images.unsplash.com",
      "localhost",
    ],
  },

  // Rate limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100, // limit each IP to 100 requests per windowMs
  },

  // Security headers
  HEADERS: {
    HSTS_MAX_AGE: 31536000, // 1 year
    EXPECT_CT_MAX_AGE: 86400, // 24 hours
  },
} as const;

// XSS Protection patterns
export const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<img[^>]*src[^>]*javascript:/gi,
  /<\s*script/gi,
  /<\s*object/gi,
  /<\s*embed/gi,
  /<\s*link/gi,
];

// SQL Injection patterns (for future database operations)
export const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
  /(--|\*\/|\/\*)/g,
  /(\bOR\b.*=.*\bOR\b)/gi,
  /(\bAND\b.*=.*\bAND\b)/gi,
];
