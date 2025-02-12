// components/gsap-context.tsx
"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { useRef } from "react"

export function GSAP({ children }) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.defaults({ ease: "power3.out" })
  }, { scope: container })

  return <div ref={container}>{children}</div>
}