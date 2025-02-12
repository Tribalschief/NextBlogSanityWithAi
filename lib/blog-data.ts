export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    date: string
    author: string
    category: string
    imageUrl: string
    isFeatured: boolean
  }
  
  export const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of AI in Web Development",
      excerpt:
        "Explore how artificial intelligence is reshaping the landscape of web development and what it means for developers.",
      content: "Full article content here...",
      date: "2023-07-15",
      author: "Alice Johnson",
      category: "Technology",
      imageUrl: "https://source.unsplash.com/random/800x600?ai",
      isFeatured: true,
    },
    {
      id: "2",
      title: "Mastering CSS Grid Layout",
      excerpt:
        "Learn how to create complex, responsive layouts with CSS Grid and take your web design skills to the next level.",
      content: "Full article content here...",
      date: "2023-07-10",
      author: "Bob Smith",
      category: "Design",
      imageUrl: "https://source.unsplash.com/random/800x600?design",
      isFeatured: false,
    },
    {
      id: "3",
      title: "The Rise of JAMstack",
      excerpt: "Discover why JAMstack architectures are gaining popularity and how they can benefit your web projects.",
      content: "Full article content here...",
      date: "2023-07-05",
      author: "Charlie Brown",
      category: "Development",
      imageUrl: "https://source.unsplash.com/random/800x600?code",
      isFeatured: false,
    },
    {
      id: "4",
      title: "Optimizing Web Performance",
      excerpt:
        "Learn techniques to improve your website's loading speed and overall performance for a better user experience.",
      content: "Full article content here...",
      date: "2023-06-30",
      author: "Diana Martinez",
      category: "Performance",
      imageUrl: "https://source.unsplash.com/random/800x600?speed",
      isFeatured: false,
    },
    {
      id: "5",
      title: "Accessibility in Web Design",
      excerpt:
        "Explore best practices for creating websites that are accessible to all users, regardless of their abilities.",
      content: "Full article content here...",
      date: "2023-06-25",
      author: "Ethan Lee",
      category: "Accessibility",
      imageUrl: "https://source.unsplash.com/random/800x600?accessibility",
      isFeatured: false,
    },
  ]
  
  export const categories = Array.from(new Set(blogPosts.map((post) => post.category)))
  
  