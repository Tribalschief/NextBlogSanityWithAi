import Link from "next/link"
import type React from "react"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <nav>
            <Link href="/" className="text-sm font-medium hover:underline">
              ← Back to home
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  )
}

