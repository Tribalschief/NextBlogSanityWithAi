import Link from "next/link"
import { Inter } from "next/font/google"
import "../(main)/global.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "My Blog",
  description: "A simple blog built with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              My Website
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            © {new Date().getFullYear()} My Website. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}

