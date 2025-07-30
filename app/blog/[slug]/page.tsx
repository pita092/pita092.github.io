import { BlogPostPageClient } from "@/components/blog-post-page-client"
import { getAllPosts, getPost } from "@/lib/blog-data"
import type { Metadata } from "next"

// Generate static params for all blog posts
export async function generateStaticParams() {
  const allPosts = getAllPosts()
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | pita`,
    description: `${post.title} - A blog post about ${post.category.toLowerCase()}`,
  }
}

export default function BlogPostRoute({ params }: { params: { slug: string } }) {
  return <BlogPostPageClient params={params} />
}
