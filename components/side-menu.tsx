"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, FileText, Home, Wrench, Heart, ChevronRight, ChevronDown, Folder, File } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

// Blog posts organized in a tree structure
const blogTree = {
  Development: {
    Tools: {
      posts: [{ id: "css-grid-mastery", title: "CSS Grid Mastery", date: "2023-11-28" }],
    },
  },
}

interface TreeNodeProps {
  name: string
  children?: any
  posts?: Array<{ id: string; title: string; date: string }>
  level: number
  onPostClick: () => void
}

function TreeNode({ name, children, posts, level, onPostClick }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2)
  const hasChildren = children && Object.keys(children).length > 0
  const hasPosts = posts && posts.length > 0

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary rounded cursor-pointer group`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {(hasChildren || hasPosts) && (
          <div className="mr-1 flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-3 w-3 text-gray-400" />
            ) : (
              <ChevronRight className="h-3 w-3 text-gray-400" />
            )}
          </div>
        )}
        <Folder className="h-3 w-3 mr-2 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 flex-shrink-0" />
        <span className="truncate">{name}</span>
      </div>

      {isExpanded && (
        <div>
          {/* Render child categories */}
          {hasChildren &&
            Object.entries(children).map(([childName, childData]: [string, any]) => (
              <TreeNode
                key={childName}
                name={childName}
                children={childData.posts ? undefined : childData}
                posts={childData.posts}
                level={level + 1}
                onPostClick={onPostClick}
              />
            ))}

          {/* Render posts */}
          {hasPosts &&
            posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} onClick={onPostClick}>
                <div
                  className="flex items-center py-1 px-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-secondary rounded hover:text-gray-900 dark:hover:text-gray-200 group"
                  style={{ paddingLeft: `${(level + 1) * 12 + 8}px` }}
                >
                  <File className="h-3 w-3 mr-2 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 flex-shrink-0" />
                  <span className="truncate text-xs">{post.title}</span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [showBlogTree, setShowBlogTree] = useState(false)

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/tools", label: "Tools & Resources", icon: Wrench },
    { href: "/favorites", label: "Favorite Things", icon: Heart },
  ]

  const handleBlogClick = () => {
    setShowBlogTree(!showBlogTree)
  }

  const handlePostClick = () => {
    setIsOpen(false)
    setShowBlogTree(false)
  }

  return (
    <>
      {/* Menu Button - Mobile only */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 bg-white dark:bg-background border border-gray-200 dark:border-border shadow-sm hover:shadow-md rounded lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay - Mobile only */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Side Menu */}
      <div
        className={`
        fixed top-0 left-0 h-full w-80 bg-white dark:bg-background border-r border-gray-100 dark:border-border z-40 transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto
        lg:translate-x-0 lg:static lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Navigation</h3>
            <ThemeToggle />
          </div>

          <nav className="space-y-1">
            {/* Regular menu items */}
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary rounded transition-colors group"
                >
                  <Icon className="h-4 w-4 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  {item.label}
                </Link>
              )
            })}

            {/* Blog section with tree view */}
            <div>
              <div
                className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary rounded transition-colors group cursor-pointer"
                onClick={handleBlogClick}
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  <span>All Blogs</span>
                </div>
                {showBlogTree ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>

              {/* Blog tree view */}
              {showBlogTree && (
                <div className="mt-2 ml-3 border-l border-gray-200 dark:border-border">
                  <div className="ml-3">
                    <Link
                      href="/blogs"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center py-1 px-2 text-xs text-gray-500 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-secondary rounded hover:text-gray-700 dark:hover:text-gray-300 mb-2"
                    >
                      <FileText className="h-3 w-3 mr-2" />
                      View All Posts
                    </Link>
                    {Object.entries(blogTree).map(([categoryName, categoryData]) => (
                      <TreeNode
                        key={categoryName}
                        name={categoryName}
                        children={categoryData}
                        level={0}
                        onPostClick={handlePostClick}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
