export const blogData = {
  Rusting: [
    { title: "learning rust", slug: "learning-rust", date: "some time in 2025"},
  ],
  Ziging: [
    { title: "learning zig", slug: "learning-zig", date: "some time in 2025" },
  ],
}

export const blogPosts: Record<string, { title: string; date: string; category: string; content: string }> = {
  "learning-rust": {
    title: "learning rust",
    date: "some time in 2025",
    category: "rusting",
    content: `
\`\`\`zig
const std = @import("std");
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
};

// Helper function to get all blog posts
export function getAllPosts() {
  return Object.values(blogData).flat()
}

// Helper function to get posts by category
export function getPostsByCategory(category: string) {
  return blogData[category as keyof typeof blogData] || []
}

// Helper function to get a single post
export function getPost(slug: string) {
  return blogPosts[slug]
}

// Helper function to get category from slug
export function getCategoryFromSlug(categorySlug: string) {
  const categoryName = categorySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  return categoryName
}

// Helper function to convert category to slug
export function categoryToSlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-")
}
