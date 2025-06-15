"use client"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    hljs: any
  }
}

interface SyntaxHighlighterProps {
  children: string
  language?: string
  className?: string
}

export function SyntaxHighlighter({ children, language, className = "" }: SyntaxHighlighterProps) {
  const codeRef = useRef<HTMLElement>(null)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadHighlightJS = async () => {
      if (typeof window === "undefined") return

      try {
        setIsLoading(true)

        // Load highlight.js if not already loaded
        if (!window.hljs) {
          const script = document.createElement("script")
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"

          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve()
            script.onerror = reject
            document.head.appendChild(script)
          })

          // Load additional languages
          const languages = ["javascript", "typescript", "css", "bash", "json", "jsx", "tsx", "html", "xml"]

          await Promise.all(
            languages.map((lang) => {
              return new Promise<void>((resolve, reject) => {
                const langScript = document.createElement("script")
                langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/${lang}.min.js`
                langScript.onload = () => resolve()
                langScript.onerror = reject
                document.head.appendChild(langScript)
              })
            }),
          )
        }

        // Highlight the code
        if (window.hljs && codeRef.current && !isHighlighted) {
          // Clear any existing highlighting
          codeRef.current.removeAttribute("data-highlighted")
          codeRef.current.className = language ? `language-${language}` : ""

          // Apply highlighting
          window.hljs.highlightElement(codeRef.current)
          setIsHighlighted(true)
        }
      } catch (error) {
        console.warn("Failed to load syntax highlighting:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHighlightJS()
  }, [children, language, isHighlighted])

  // Reset highlighting when content changes
  useEffect(() => {
    setIsHighlighted(false)
  }, [children, language])

  return (
    <div className={`relative ${className}`}>
      <pre className="hljs overflow-x-auto border border-gray-200 dark:border-border shadow-sm">
        <code ref={codeRef} className={language ? `language-${language}` : ""} style={{ background: "transparent" }}>
          {children}
        </code>
      </pre>
      {language && (
        <div className="absolute top-3 right-3 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-secondary px-2 py-1 border border-gray-200 dark:border-border shadow-sm">
          {language}
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-50 dark:bg-secondary bg-opacity-50 flex items-center justify-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Loading syntax highlighting...</div>
        </div>
      )}
    </div>
  )
}
