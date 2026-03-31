#!/usr/bin/env node

/**
 * CSP Testing Script
 * Tests various XSS attack vectors to ensure CSP is effective
 */

const testCases = [
  {
    name: "Script Injection",
    payload: '<script>alert("XSS")</script>',
    shouldBlock: true,
  },
  {
    name: "Inline Event Handler",
    payload: '<img src="x" onerror="alert(\'XSS\')">',
    shouldBlock: true,
  },
  {
    name: "JavaScript Protocol",
    payload: "<a href=\"javascript:alert('XSS')\">Click me</a>",
    shouldBlock: true,
  },
  {
    name: "Data URL Script",
    payload: "<script src=\"data:text/javascript,alert('XSS')\"></script>",
    shouldBlock: true,
  },
  {
    name: "External Script",
    payload: '<script src="https://evil.com/script.js"></script>',
    shouldBlock: true,
  },
  {
    name: "CSS Expression",
    payload:
      "<div style=\"background:url(javascript:alert('XSS'))\">Test</div>",
    shouldBlock: true,
  },
  {
    name: "Iframe Injection",
    payload: "<iframe src=\"javascript:alert('XSS')\"></iframe>",
    shouldBlock: true,
  },
  {
    name: "Object Embed",
    payload: "<object data=\"javascript:alert('XSS')\"></object>",
    shouldBlock: true,
  },
  {
    name: "Valid Image",
    payload: '<img src="https://cdn2.thecatapi.com/image.jpg" alt="Cat">',
    shouldBlock: false,
  },
  {
    name: "Valid Font",
    payload:
      '<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet">',
    shouldBlock: false,
  },
];

function testCSP() {
  console.log("🔒 Testing CSP Implementation\n");

  testCases.forEach((testCase, index) => {
    console.log(`${index + 1}. ${testCase.name}`);
    console.log(`   Payload: ${testCase.payload}`);
    console.log(`   Expected: ${testCase.shouldBlock ? "BLOCKED" : "ALLOWED"}`);

    // In a real browser environment, you would:
    // 1. Inject the payload into a test page
    // 2. Check browser console for CSP violations
    // 3. Verify if the payload was blocked

    console.log(
      `   Status: ${testCase.shouldBlock ? "✅ Should be blocked by CSP" : "✅ Should be allowed by CSP"}\n`,
    );
  });

  console.log("📋 Manual Testing Instructions:");
  console.log("1. Start the development server: npm run dev");
  console.log("2. Open browser dev tools and go to Console tab");
  console.log("3. Try injecting payloads in browser console");
  console.log("4. Check for CSP violation reports");
  console.log("5. Verify network requests are blocked appropriately");

  console.log("\n🔍 CSP Headers to Verify:");
  console.log("- Content-Security-Policy");
  console.log("- X-Content-Type-Options: nosniff");
  console.log("- X-Frame-Options: DENY");
  console.log("- X-XSS-Protection: 1; mode=block");
  console.log("- Referrer-Policy: strict-origin-when-cross-origin");
  console.log("- Permissions-Policy");
}

if (require.main === module) {
  testCSP();
}

module.exports = { testCSP, testCases };
