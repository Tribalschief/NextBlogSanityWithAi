"use client"

import { useState, useEffect } from "react"
import { allBlog, categories } from "@/lib/sanity-blog-data"
import BlogPostCard from "@/components/BlogPostCard"
import SearchBar from "@/components/SearchBar"

interface SanityPost {
  title: string
  slug: { current: string }
  featuredImage: {
    asset: {
      _id: string
      url: string
    }
    alt: string
  }
  excerpt: string
  categories: Array<{ title: string; slug: { current: string } }>
  publishedAt: string
}

interface SanityCategory {
  title: string
  slug: { current: string }
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState<SanityPost[]>([])
  const [allCategories, setAllCategories] = useState<SanityCategory[]>([])
  const postsPerPage = 9

  useEffect(() => {
    const fetchPostsAndCategories = async () => {
      try {
        const fetchedPosts = await allBlog()
        const fetchedCategories = await categories()
        setPosts(fetchedPosts || [])
        setAllCategories(fetchedCategories || [])
      } catch (error) {
        console.error("Error fetching data:", error)
        setPosts([])
        setAllCategories([])
      }
    }
    fetchPostsAndCategories()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || post.categories?.some((cat) => cat?.title === selectedCategory)),
  )

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8 h-[100vh]">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>

      {/* Search Bar */}
      <div className="my-8">
        <SearchBar
          onSearch={(value: string) => {
            setSearchQuery(value)
            setCurrentPage(1)
          }}
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded ${selectedCategory === "All" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        {allCategories.map((category) => (
          <button
            key={category.slug?.current || category.title}
            onClick={() => {
              setSelectedCategory(category.title)
              setCurrentPage(1)
            }}
            className={`px-4 py-2 rounded ${
              selectedCategory === category.title ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <BlogPostCard key={post.slug?.current || post.title} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-4 py-2 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

