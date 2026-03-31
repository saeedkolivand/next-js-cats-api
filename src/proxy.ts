import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

// Generate a nonce for CSP
function generateNonce(): string {
  return randomBytes(16).toString("base64");
}

// CSP configuration with nonce support
function getCSP(nonce: string): string {
  return [
    "default-src 'self';",
    `script-src 'self' 'nonce-${nonce}';`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
    "font-src 'self' https://fonts.gstatic.com;",
    "img-src 'self' data: https://cdn2.thecatapi.com https://thecatapi.com https://images.unsplash.com;",
    "connect-src 'self' https://api.thecatapi.com;",
    "frame-src 'none';",
    "object-src 'none';",
    "base-uri 'self';",
    "form-action 'self';",
    "frame-ancestors 'none';",
    "upgrade-insecure-requests;",
  ].join(" ");
}

export default async function proxy(request: NextRequest) {
  const nonce = generateNonce();
  const requestHeaders = new Headers(request.headers);

  // Add CSP with nonce
  requestHeaders.set("Content-Security-Policy", getCSP(nonce));

  // Add nonce to headers for use in components
  requestHeaders.set("x-nonce", nonce);

  // Additional security headers
  requestHeaders.set("X-Content-Type-Options", "nosniff");
  requestHeaders.set("X-Frame-Options", "DENY");
  requestHeaders.set("X-XSS-Protection", "1; mode=block");
  requestHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  requestHeaders.set(
    "Permissions-Policy",
    [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "magnetometer=()",
      "gyroscope=()",
      "accelerometer=()",
    ].join(", "),
  );

  // Remove sensitive headers
  requestHeaders.delete("x-powered-by");
  requestHeaders.delete("server");

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add HSTS for HTTPS
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
    );
  }

  return response;
}

export const config = {
  matcher: ["/cats/:path*"],
};
