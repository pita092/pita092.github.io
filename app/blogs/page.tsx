import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Folder, File } from "lucide-react"
import LayoutWrapper from "../../components/layout-wrapper"

const blogPosts = [
  {
    id: "css-grid-mastery",
    title: "CSS Grid Mastery",
    description: "Everything you need to know about CSS Grid to create complex layouts with ease.",
    date: "2023-11-28",
    readTime: "8 min read",
    category: "Development",
    subcategory: "Tools",
  },
]

// Group posts by category and subcategory
const groupedPosts = blogPosts.reduce(
  (acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = {}
    }
    if (!acc[post.category][post.subcategory]) {
      acc[post.category][post.subcategory] = []
    }
    acc[post.category][post.subcategory].push(post)
    return acc
  },
  {} as Record<string, Record<string, typeof blogPosts>>,
)

export default function AllBlogs() {
  return (
    <LayoutWrapper contentWidth="wide">
      <div className="py-16">
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-2">All Blogs</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {blogPosts.length} posts organized by category and topic
          </p>
        </header>

        <div className="space-y-8">
          {Object.entries(groupedPosts).map(([category, subcategories]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Folder className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{category}</h2>
              </div>

              {Object.entries(subcategories).map(([subcategory, posts]) => (
                <div key={subcategory} className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Folder className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{subcategory}</h3>
                  </div>

                  <div className="space-y-3 max-w-2xl mx-auto">
                    {posts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`}>
                        <Card className="hover:shadow-sm transition-shadow cursor-pointer border-0 dark:border-gray-800 rounded bg-white bg-[hsl(var(--secondary))]">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <File className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                                <time className="text-xs text-gray-500 dark:text-gray-500">{post.date}</time>
                                <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                                <span className="text-xs text-gray-500 dark:text-gray-500">{post.readTime}</span>
                              </div>
                            </div>
                            <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
                              {post.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                              {post.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </LayoutWrapper>
  )
}
