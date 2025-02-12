import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"
import { format } from "date-fns"
//import { PortableTextBlock } from '@portabletext/react';

interface Author {
  name: string
  image: {
    asset: {
      _ref: string
    }
  }
}

interface Category {
  title: string
}

interface MainImage {
  asset: {
    _id: string
    url: string
  }
  alt: string
}

interface Post {
  title: string
  author: Author
  categories: Category[]
  mainImage: MainImage
  publishedAt: string
  content: any[] // This should be the Portable Text content
}

interface ArticleLayoutProps {
  post: Post
  isPreview?: boolean
}

export default function ArticleLayout({ post, isPreview = false }: ArticleLayoutProps) {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {isPreview && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p className="font-bold">Preview mode active</p>
          <p>You are viewing draft content.</p>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex items-center mb-6">
        {post.author.image && (
          <Image
            src={urlFor(post.author.image).url() || "/placeholder.svg"}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-full mr-4"
          />
        )}
        <div>
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-gray-500 text-sm">{format(new Date(post.publishedAt), "MMMM d, yyyy")}</p>
        </div>
      </div>

      {post.mainImage && (
        <div className="mb-8">
          <Image
            src={post.mainImage.asset.url || "/placeholder.svg"}
            alt={post.mainImage.alt || post.title}
            width={800}
            height={400}
            layout="responsive"
            className="rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-lg">
        <PortableText value={post.content} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Categories:</h2>
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <span key={category.title} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              {category.title}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

