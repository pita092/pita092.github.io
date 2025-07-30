"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ThemeToggle } from "@/components/theme-toggle"
import Prism from "prismjs"

import "prismjs/components/prism-rust"
import "prismjs/components/prism-zig"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-bash"

// Make sure your Prism CSS is imported globally, e.g. in your _app.tsx or main CSS:
// import "prismjs/themes/prism-tomorrow.css"

interface BlogPostProps {
  title: string
  date: string
  category: string
  content: string
  onBack: () => void
}

export function BlogPost({ title, date, category, content, onBack }: BlogPostProps) {
  // Track which code block was copied (by index)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // For assigning unique indexes to code blocks
  let codeBlockCounter = 0

  // Handle copying code to clipboard
  const handleCopy = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      alert("Failed to copy code")
    }
  }

  const router = useRouter()

  const goBackToCategory = () => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-")
    router.push(`/blog/category/${categorySlug}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={goBackToCategory} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to {category}
      </Button>
    <ThemeToggle />

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="mb-8">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <span className="bg-muted px-2 py-1 ">{category}</span>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />9001 min read
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
        </header>

        <div className="prose-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                if (inline) {
                  // Inline code: just render normally
                  return (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  )
                }

                // For code blocks:
                const lang = className?.replace("language-", "") || ""
                const codeString = String(children).trim()

                // Assign a unique index to each code block (increment per render)
                const index = codeBlockCounter++

                // Prism-highlighted HTML (cached in state)
                const [html, setHtml] = useState("")

                useEffect(() => {
                  if (Prism.languages[lang]) {
                    const highlighted = Prism.highlight(codeString, Prism.languages[lang], lang)
                    setHtml(highlighted)
                  } else {
                    // If unknown language, escape HTML
                    setHtml(codeString.replace(/</g, "&lt;").replace(/>/g, "&gt;"))
                  }
                }, [codeString, lang])

                return (
                  <div
                    className="code-block-container"
                    style={{ position: "relative", marginBottom: "1.5rem" }}
                  >
                    <div
                      className="code-block-titlebar"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "hsl(var(--alt-background))",
                        color: "hsl(var(--foreground))",
                        fontSize: "0.85rem",
                        padding: "0.3rem 1rem",
                        borderTopLeftRadius: "0.3em",
                        borderTopRightRadius: "0.3em",
                        fontFamily: "monospace",
                      }}
                    >
                      <span>{lang.toUpperCase()}</span>
                      <button
                        onClick={() => handleCopy(codeString, index)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#aaa",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                        }}
                        aria-label="Copy code"
                        type="button"
                      >
                        {copiedIndex === index ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <pre
                      className={`language-${lang}`}
                      style={{
                        marginTop: 0,
                        borderRadius: "0 0 0.3em 0.3em",
                      }}
                    >
                      <code
                        className={`language-${lang}`}
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </pre>
                  </div>
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
