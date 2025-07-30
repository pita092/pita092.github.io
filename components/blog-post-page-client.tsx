"use client"

import { BlogPost } from "@/components/blog-post"
import { notFound } from "next/navigation"

const blogPosts: Record<string, { title: string; date: string; category: string; content: string }> = {
  "learning-rust": {
    title: "learning rust",
    date: "some time in 2025",
    category: "rusting",
    content: `
\`\`\`rust
fn main() {
    println!("Hello, world!");
}
\`\`\`
    `,
  },
  "learning-zig": {
    title: "learning zig",
    date: "some time in 2025",
    category: "ziging",
    content: `
\`\`\`zig
const std = @import("std");
\`\`\`
    `,
  },
}

function getPost(slug: string) {
  return blogPosts[slug] ?? null
}

export function BlogPostPageClient({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <BlogPost
      title={post.title}
      date={post.date}
      category={post.category}
      content={post.content}
      onBack={() => history.back()}
    />
  )
}
