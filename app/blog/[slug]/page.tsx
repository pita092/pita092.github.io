
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type { JSX } from "react/jsx-runtime"
import LayoutWrapper from "../../../components/layout-wrapper"
import { SyntaxHighlighter } from "../../../components/syntax-highlighter"
import { use } from 'react'

const blogPosts = {
  "css-grid-mastery": {
    title: "CSS Grid Mastery",
    date: "2023-11-28",
    readTime: "8 min read",
    category: "Development",
    subcategory: "Tools",
    content: ``,
  },
}

function MarkdownRenderer({ content }: { content: string }) {
  const renderContent = (text: string) => {
    const lines = text.split("\n")
    const elements: JSX.Element[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      if (line.startsWith("```")) {
        const language = line.slice(3).trim()
        const codeLines: string[] = []
        i++

        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i])
          i++
        }

        elements.push(
          <div key={i} className="my-6">
            <SyntaxHighlighter language={language}>{codeLines.join("\n")}</SyntaxHighlighter>
          </div>,
        )
        i++
        continue
      }

      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 first:mt-0">
            {line.slice(2)}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">
            {line.slice(3)}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-5 mb-2">
            {line.slice(4)}
          </h3>,
        )
      } else if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={i}
            className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic text-gray-700 dark:text-gray-300"
          >
            {line.slice(2)}
          </blockquote>,
        )
      } else if (line.trim() === "") {
        elements.push(<div key={i} className="h-2" />)
      } else if (line.trim() !== "") {
        const formattedLine = formatInlineElements(line)
        elements.push(
          <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {formattedLine}
          </p>,
        )
      }

      i++
    }

    return elements
  }

  const formatInlineElements = (text: string) => {
    text = text.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200">$1</code>',
    )
    text = text.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>',
    )
    text = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>',
    )

    return <span dangerouslySetInnerHTML={{ __html: text }} />
  }

  return <div className="prose prose-gray max-w-none">{renderContent(content)}</div>
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = use(params)
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <LayoutWrapper contentWidth="medium">
      <div className="py-16">
        <div className="mb-8">
          <Link href="/blogs">
            <Button
              variant="ghost"
              className="pl-0 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to blogs
            </Button>
          </Link>
        </div>

        <article>
          <header className="mb-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                {post.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                {post.subcategory}
              </span>
              <time className="text-xs text-gray-500 dark:text-gray-500">{post.date}</time>
              <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-500">{post.readTime}</span>
            </div>
            <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100">{post.title}</h1>
          </header>

          <MarkdownRenderer content={post.content} />
        </article>
      </div>
    </LayoutWrapper>
  )
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

