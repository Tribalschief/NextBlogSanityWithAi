"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { ClerkLoaded, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
const { user } =  useUser(); // Fetch user on the server
  console.log(user)
  // Prevent hydration mismatch
  useEffect(() => setIsMounted(true), [])

  if (!isMounted) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b text-gray-900  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px]"
                onInteractOutside={() => setIsMenuOpen(false)}
              >
                <nav className="flex flex-col space-y-4 pt-6">
                  {[
                    { href: "/blog", label: "All Posts" },
                    { href: "/author", label: "Author" },
                    { href: "/contact", label: "Contact Us" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="py-2 text-lg font-medium text-white transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-6">
                  <ClerkLoaded>
                    <div >
  {user ? (
    <p className="text-lg font-medium"><UserButton/></p>
  ) : (
    <div className="flex flex-col space-y-2">
      <Button asChild>
        <SignInButton mode="modal" />
      </Button>
      <Button asChild>
        <SignUpButton mode="modal"/>
      </Button> 
    </div>
  )}
  </div>
</ClerkLoaded>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex flex-1 items-center lg:position-relative justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold  text-gray-100">MyBlog</span>
            </Link>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:space-x-4">
            {[
              { href: "/blog", label: "All Posts" },
              { href: "/author", label: "Author" },
              { href: "/contact", label: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="hidden lg:block">
            <ClerkLoaded>
              
  {user ? (
    <p className="text-lg font-medium"><UserButton/></p>
  ) : (
    <div className="flex py-3">
      <Button asChild variant={"outline"} >
        <SignInButton mode="modal" />
      </Button>
      <Button asChild variant={"outline"}>
        <SignUpButton mode="modal"/>
      </Button> 
    </div>
  )}
 
</ClerkLoaded>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

