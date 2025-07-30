"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Home } from "lucide-react"
import Link from "next/link"
import { categoryToSlug } from "@/lib/blog-data"
import { ThemeToggle } from "@/components/theme-toggle"

interface BlogPostPageProps {
  post: {
    title: string
    date: string
    category: string
    content: string
  }
}

export function BlogPostPage({ post }: BlogPostPageProps) {
  const categorySlug = categoryToSlug(post.category)

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header with Navigation and Theme Toggle */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild className="hover:bg-accent transition-colors">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Home</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hover:bg-accent transition-colors">
                <Link href={`/blog/category/${categorySlug}/`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Back to {post.category}</span>
                  <span className="sm:hidden">{post.category}</span>
                </Link>
              </Button>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground hidden md:inline">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {/* Article Header */}
          <header className="mb-8 not-prose">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <Link
                href={`/blog/category/${categorySlug}/`}
                className="inline-flex items-center bg-muted px-3 py-1.5 rounded-full hover:bg-muted/80 transition-colors font-medium"
              >
                {post.category}
              </Link>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>5 min read</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
          </header>

          {/* Article Content */}
          <div className="prose-content leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-border not-prose">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/blog/category/${categorySlug}/`}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    More {post.category}
                  </Link>
                </Button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Switch theme:</span>
                <ThemeToggle />
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}

