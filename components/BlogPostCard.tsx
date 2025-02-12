import Image from "next/image"
import Link from "next/link"

interface SanityImage {
  asset: {
    _id: string
    url: string
  }
  alt: string
}

interface SanityCategory {
  title: string
  slug: { current: string }
}

interface SanityPost {
  title: string
  slug: { current: string }
  featuredImage: SanityImage
  excerpt: string
  categories: SanityCategory[]
  publishedAt: string
}

export default function BlogPostCard({ post }: { post: SanityPost }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <Image
          src={post.featuredImage?.asset?.url || "/placeholder.svg"}
          alt={post.featuredImage?.alt || post.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <span className="text-blue-500 text-sm font-semibold">{post.categories?.[0]?.title || "Uncategorized"}</span>
        <h2 className="text-xl font-bold mt-2 mb-2">{post.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</span>
          <Link href={`/blog/${post.slug?.current || "#"}`} className="text-blue-500 hover:underline">
            Read more
          </Link>
        </div>
      </div>
    </div>
  )
}

