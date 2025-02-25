import { draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'
import ArticleLayout from '@/components/ArticleLayout'
import { getBlog, getPreviewBlog } from '@/lib/sanity-blog-data'
import { client } from '@/sanity/lib/client'



export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current) && status == "published"].slug.current`
  );
  return posts.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }) {
  try {
    const isDraftMode = draftMode().isEnabled; // ✅ No await needed
    const { slug } = params; // ✅ No `await` needed
    const post = await getBlog(slug);

    if (!post?._id) {
      notFound();
    }

    if (isDraftMode) {
      return (
        <Suspense fallback={<PreviewLoadingState />}>
          <PreviewBlogPostPage slug={slug} />
        </Suspense>
      );
    }

    return <ArticleLayout post={post} />;
  } catch (error) {
    console.error('Error loading blog post:', error);
    redirect('/blog/error');
  }
}

async function PreviewBlogPostPage({ slug }) {
  try {
    const token = process.env.SANITY_API_READ_TOKEN;
    if (!token) throw new Error('Missing preview token');
    const post = await getPreviewBlog(slug, token);

    if (!post?._id) {
      notFound();
    }

    return <ArticleLayout post={post} isPreview />;
  } catch (error) {
    console.error('Preview error:', error);
    redirect(`/blog/${slug}?preview-error=true`);
  }
}

function PreviewLoadingState() {
  return (
    <div className="text-center py-8">
      <div className="text-lg font-medium text-gray-600">Loading preview...</div>
      <div className="mt-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>
    </div>
  );
}
