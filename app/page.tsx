import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Lab",
  description: "A simple Next.js application",
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
          <nav style={{ marginTop: "1rem" }}>
            <Link href="/">Home</Link> |{" "}
            <Link href="/addstudent">Add Student</Link>
          </nav>
        </header>

        <main>{ children }</main>

        <footer>
          <p>© 2025 Profiles, Inc.</p>
        </footer>
      </body>
    </html>
  );
}
