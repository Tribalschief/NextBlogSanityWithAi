import ArticleLayout from "./ArticleLayout"

export default function PreviewArticleLayout({ post }) {
  return <ArticleLayout post={post} isPreview={true} />
}

