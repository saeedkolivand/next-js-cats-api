import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get client IP from headers
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Log CSP violation for monitoring
    console.error("CSP Violation Report:", {
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      ip: ip,
      violation: {
        violatedDirective: body.violatedDirective,
        blockedURI: body.blockedURI,
        sourceFile: body.sourceFile,
        lineNumber: body.lineNumber,
        columnNumber: body.columnNumber,
      },
    });

    // In production, you would send this to a monitoring service
    if (process.env.NODE_ENV === "production") {
      // Example: Send to Sentry, LogRocket, Datadog, etc.
      // await sendToMonitoringService('csp-violation', violationData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing CSP violation:", error);
    return NextResponse.json(
      { error: "Failed to process violation report" },
      { status: 500 },
    );
  }
}
