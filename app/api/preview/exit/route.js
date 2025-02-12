// app/api/preview/exit/route.ts
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  draftMode().disable()
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`)
}