import { CategoryPageView } from "@/components/category-page-view"
import { blogData, getCategoryFromSlug, getPostsByCategory } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Generate static params for all categories
export async function generateStaticParams() {
  return Object.keys(blogData).map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, "-"),
  }))
}

// Generate metadata for each category
export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryName = getCategoryFromSlug(params.category)

  return {
    title: `${categoryName} | pita`,
    description: `All blog posts about ${categoryName.toLowerCase()}`,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryName = getCategoryFromSlug(params.category)
  const posts = getPostsByCategory(categoryName)

  if (!posts.length) {
    notFound()
  }

  return <CategoryPageView category={categoryName} posts={posts} />
}
