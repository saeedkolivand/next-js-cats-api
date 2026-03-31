// Utility to sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove basic HTML tags
    .trim()
    .substring(0, 1000); // Limit length
}

// Validate URLs to prevent XSS
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ["https:", "http:"].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

// Content Security Policy violation handler
export function handleCSPViolation(event: SecurityPolicyViolationEvent) {
  console.error("CSP Violation:", {
    violatedDirective: event.violatedDirective,
    blockedURI: event.blockedURI,
    sourceFile: event.sourceFile,
    lineNumber: event.lineNumber,
    columnNumber: event.columnNumber,
  });

  // In production, you might want to send this to a monitoring service
  if (process.env.NODE_ENV === "production") {
    // Send to monitoring service like Sentry, LogRocket, etc.
  }
}

// Check if running in browser
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// Get current origin for CSP validation
export function getCurrentOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}
