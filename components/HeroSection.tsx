"use client"

import { useRef, useEffect } from "react"
import { Pacifico } from "next/font/google"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function ElegantShape({
  className,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-gray-200",
}: {
  className?: string
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  const shapeRef = useRef(null)

  useEffect(() => {
    if (!shapeRef.current) return

    gsap.fromTo(
      shapeRef.current,
      {
        opacity: 0,
        y: -50,
        rotate: rotate - 15,
      },
      {
        opacity: 1,
        y: 0,
        rotate: rotate,
        duration: 1.5,
        ease: "power3.out",
      },
    )

    gsap.to(shapeRef.current, {
      y: 15,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [rotate])

  return (
    <div ref={shapeRef} className={cn("absolute", className)}>
      <div
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-gray-300",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)]",
          )}
        />
      </div>
    </div>
  )
}

export default function HeroGeometric({
  badge = "All Blogs",
  title1 = "Elevate Your",
  title2 = "Digital Vision",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  const badgeRef = useRef(null)
  const title1Ref = useRef(null)
  const title2Ref = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 })

    tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(title1Ref.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.5")
      .fromTo(title2Ref.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.5")
      .fromTo(subtitleRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.5")
  }, [])

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white text-black">
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          width={600}
          height={140}
          rotate={12}
          gradient="from-gray-100"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          width={500}
          height={120}
          rotate={-15}
          gradient="from-gray-200"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          width={300}
          height={80}
          rotate={-8}
          gradient="from-gray-300"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          width={200}
          height={60}
          rotate={20}
          gradient="from-gray-400"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          width={150}
          height={40}
          rotate={-25}
          gradient="from-gray-500"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-8 md:mb-12"
          >
            <Image src="https://kokonutui.com/logo.svg" alt="Kokonut UI" width={20} height={20} />
            <span className="text-sm text-gray-600 tracking-wide">{badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
            <span ref={title1Ref} className="text-gray-900 block">
              {title1}
            </span>
            <span ref={title2Ref} className={cn("text-gray-700 block", pacifico.className)}>
              {title2}
            </span>
          </h1>

          <div ref={subtitleRef}>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Crafting exceptional digital experiences through innovative design and cutting-edge technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

