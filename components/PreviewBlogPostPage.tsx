import { notFound, redirect } from "next/navigation"
import { getPreviewBlog } from "@/lib/sanity-blog-data"
import ArticleLayout from "@/components/ArticleLayout"

interface PreviewBlogPostProps {
  slug: string
}

export default async function PreviewBlogPostPage({ slug }: PreviewBlogPostProps) {
  try {
    // Ensure the Sanity API token is available
    const token = process.env.SANITY_API_READ_TOKEN
    if (!token) {
      throw new Error("Missing SANITY_API_READ_TOKEN")
    }
    const slugs = await slug
    // Fetch the preview post
    const post = await getPreviewBlog(slugs, token)

    // If the post doesn't exist, return 404
    if (!post?._id) {
      notFound()
    }

    // Render the preview
    return <ArticleLayout post={post} isPreview />
  } catch (error) {
    console.error("Error loading preview blog post:", error)
    redirect(`/blog/${slug}?preview-error=true`)
  }
}
