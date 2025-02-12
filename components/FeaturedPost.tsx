import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/lib/blog-data"

export default function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
      <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} layout="fill" objectFit="cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
        <span className="text-white text-sm font-semibold mb-2">{post.category}</span>
        <h2 className="text-white text-3xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-200 mb-4">{post.excerpt}</p>
        <Link
          href={`/blog/${post.id}`}
          className="inline-block bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

