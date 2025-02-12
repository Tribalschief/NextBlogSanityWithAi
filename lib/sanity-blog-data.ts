import { client } from "@/sanity/lib/client"

export const allBlog = async () => {
  const data = await client.fetch(
    `*[_type == "post" && status == "published"] {
      title,
      slug,
      author->{
        name,
        image
      },
      featuredImage {
        asset->{
          _id,
          url
        },
        alt
      },
      excerpt,
      categories[]->{
        title,
        slug
      },
      tags,
      publishedAt,
      readingTime
    } | order(publishedAt desc)`,
  )
  return data
}

export const featurePost = async () => {
  const data = await client.fetch(`
    *[_type == "post" && featured == true && status == "published"] {
      title,
      slug,
      featuredImage {
        asset->{
          _id,
          url
        },
        alt
      },
      publishedAt
    } | order(publishedAt desc)
  `)
  return data
}

export const categories = async () => {
  const data = await client.fetch(`
    *[_type == "category"] {
      title,
      slug
    }
  `)
  return data
}



export const getBlog = async (slug:string) => {
  const query = `
    *[_type == "post" && slug.current == $slug && status == "published"][0] {
    _id,  
    title,
      slug,
      author->{
        name,
        avatar {
          asset->{
            url
          }
        }
      },
      featuredImage {
        asset->{
          url
        },
        alt
      },
      excerpt,
      aiSummary,
      content[]{
        ...,
        _type == "image" => {
          "url": asset->url,
          caption
        }
      },
      categories[]->{
        title,
        slug
      },
      tags,
      publishedAt,
      updatedAt,
      readingTime,
      seo {
        metaTitle,
        metaDescription,
        keywords
      },
      socialSharing {
        twitterTitle,
        linkedInTitle,
        ogImage {
          asset->{
            url
          }
        }
      },
      relatedPosts[]->{
        title,
        slug,
        featuredImage {
          asset->{
            url
          }
        }
      },
      comments[]->{
        name,
        comment,
        createdAt
      }
    }
  `
  
  const data = await client.fetch(query, { slug })
  return data
}

export const getPreviewBlog = async (slug: string, token: string) => {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      author->{
        name,
        avatar {
          asset->{
            url
          }
        }
      },
      featuredImage {
        asset->{
          url
        },
        alt
      },
      excerpt,
      categories[]->{
        title,
        slug
      },
      tags,
      publishedAt,
      readingTime
    }
  `
  
  const data = await client.fetch(query, { slug }, { token })
  return data
}

