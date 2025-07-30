"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar } from "lucide-react"

interface CategoryViewProps {
  category: string
  posts: Array<{ title: string; slug: string; date: string }>
  onBack: () => void
  onPostClick: (slug: string) => void
}

export function CategoryView({ category, posts, onBack, onPostClick }: CategoryViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category}</h1>
        <p className="text-xl text-muted-foreground">Explore all posts in the {category.toLowerCase()} category</p>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card
            key={post.slug}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onPostClick(post.slug)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl hover:text-primary transition-colors">{post.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </div>
              <CardDescription>Click to read this post about {post.title.toLowerCase()}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
