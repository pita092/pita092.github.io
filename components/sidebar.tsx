"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
        className={`flex items-center py-2 px-0 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary cursor-pointer group`}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {(hasChildren || hasPosts) && (
          <div className="mr-2 flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
            )}
          </div>
        )}
        <Folder className="h-4 w-4 mr-2 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 flex-shrink-0" />
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
                  className="flex items-center py-2 px-0 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-secondary hover:text-gray-900 dark:hover:text-gray-200 group"
                  style={{ paddingLeft: `${(level + 1) * 16}px` }}
                >
                  <File className="h-4 w-4 mr-2 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 flex-shrink-0" />
                  <span className="truncate text-xs">{post.title}</span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showBlogTree, setShowBlogTree] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [activeTab, setActiveTab] = useState<"nav" | "blogs">("nav")

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
        className="fixed top-4 left-4 z-50 bg-white dark:bg-background border border-gray-200 dark:border-border shadow-sm hover:shadow-md lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay - Mobile only */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar - mobile optimized */}
      <div
        className={`
        sidebar z-40 overflow-y-auto
        lg:translate-x-0 lg:static lg:shadow-none
        ${isOpen ? "fixed inset-0 translate-x-0" : "relative translate-x-0"}
      `}
      >
        {/* Profile Section - Compact */}
        <div className="profile-section">
          <div className="flex items-center space-x-3 mb-3">
            <Image
              src="/pfp.jpg"
              alt="Pita"
              width={60}
              height={60}
              className="border border-gray-200 dark:border-gray-700 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100 truncate">Pita</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">computer stuff</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">pita's city</p>
            </div>
          </div>
        </div>

        {/* About Section - Collapsible */}
        <div className="about-section">
          <button
            className="flex items-center justify-between w-full text-left mb-3 group"
            onClick={() => setShowAbout(!showAbout)}
          >
            <h2 className="text-base font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wide">About</h2>
            {showAbout ? (
              <ChevronDown className="h-3 w-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
            ) : (
              <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
            )}
          </button>

          {showAbout && (
            <div className="space-y-3 leading-8 leading-9 leading-7">
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                nate
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                nate
              </p>
            </div>
          )}
        </div>

        {/* Navigation Section - Tabbed Interface */}
        <div className="navigation-section">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-1 bg-gray-100 dark:bg-secondary p-1 rounded-sm">
              <button
                className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${
                  activeTab === "nav"
                    ? "bg-white dark:bg-background text-gray-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
                onClick={() => setActiveTab("nav")}
              >
                Nav
              </button>
              <button
                className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${
                  activeTab === "blogs"
                    ? "bg-white dark:bg-background text-gray-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
                onClick={() => setActiveTab("blogs")}
              >
                Blogs
              </button>
            </div>
            <ThemeToggle />
          </div>

          <div className="space-y-1">
            {activeTab === "nav" && (
              <>
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary transition-colors group"
                    >
                      <Icon className="h-4 w-4 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                      {item.label}
                    </Link>
                  )
                })}
              </>
            )}

            {activeTab === "blogs" && (
              <div className="space-y-1">
                <Link
                  href="/blogs"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center py-2 text-xs text-gray-500 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-secondary hover:text-gray-700 dark:hover:text-gray-300 mb-2"
                >
                  <FileText className="h-4 w-4 mr-2" />
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
            )}
          </div>
        </div>
      </div>
    </>
  )
}
