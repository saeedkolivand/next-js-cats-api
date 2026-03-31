import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cat Explorer",
  description:
    "Discover Amazing Cat Breeds & Images - Your ultimate destination for cat information and photos",
  other: {
    "color-scheme": "light dark",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Handle browser extension modifications
              if (typeof window !== 'undefined') {
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                      const html = document.documentElement;
                      if (html.getAttribute('lang') !== 'en') {
                        console.warn('Lang attribute modified by browser extension, resetting to "en"');
                        html.setAttribute('lang', 'en');
                      }
                    }
                  });
                });
                
                observer.observe(document.documentElement, {
                  attributes: true,
                  attributeFilter: ['lang']
                });
              }
              
              if (typeof window !== 'undefined') {
                document.addEventListener('securitypolicyviolation', function(event) {
                  console.error('CSP Violation:', {
                    violatedDirective: event.violatedDirective,
                    blockedURI: event.blockedURI,
                    sourceFile: event.sourceFile,
                    lineNumber: event.lineNumber,
                    columnNumber: event.columnNumber,
                  });
                  
                  // In production, send to monitoring service
                  if (typeof fetch !== 'undefined' && window.location.hostname !== 'localhost') {
                    fetch('/api/csp-violation', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        violatedDirective: event.violatedDirective,
                        blockedURI: event.blockedURI,
                        sourceFile: event.sourceFile,
                        lineNumber: event.lineNumber,
                        columnNumber: event.columnNumber,
                      })
                    }).catch(console.error);
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
