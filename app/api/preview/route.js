// app/api/preview/route.ts
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.SANITY_PREVIEW_SECRET || !slug) {
    return new Response('Invalid request', { status: 401 })
  }

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      "slug": slug.current
    }`,
    { slug }
  )

  if (!post) {
    return new Response('Post not found', { status: 404 })
  }

  draftMode().enable()

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`
  )
}