import "./globals.css";
import type { Metadata } from "next"; 
import React from "react";

export const metadata: Metadata = {
  title: "Profiles / Next.js Project",
  description: "Browse user profiles built with Next.js app router",
};

export default function RootLayout({ 
  children, 
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Profiles</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2025 Profiles, Inc.</p>
        </footer>
      </body>
    </html>
  );
}