"use client"

import {
  Home,
  User,
  Briefcase,
  FileText,
  ChevronRight,
  ChevronDown,
  Menu,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { blogData, categoryToSlug } from "@/lib/blog-data"

function useMobileBreakpoint(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [breakpoint])

  return isMobile
}

const menuItems = [
  {
    title: "Home",
    icon: Home,
    id: "hero",
  },
  {
    title: "About",
    icon: User,
    id: "about",
  },
  {
    title: "Projects",
    icon: Briefcase,
    id: "projects",
  },
]

export function AppSidebar() {
  const [openCategories, setOpenCategories] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useMobileBreakpoint()
  const router = useRouter()
  const pathname = usePathname()

  const maybeCloseSidebar = () => {
    if (isMobile) setSidebarOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    if (pathname === "/") {
      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    } else {
      router.push(`/#${sectionId}`)
    }

    maybeCloseSidebar()
  }

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleCategoryClick = (category: string) => {
    const categorySlug = categoryToSlug(category)
    router.push(`/blog/category/${categorySlug}/`)
    maybeCloseSidebar()
  }

  const handleBlogClick = (slug: string) => {
    router.push(`/blog/${slug}/`)
    maybeCloseSidebar()
  }

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 bg-white dark:bg-black p-2 rounded-md shadow-md md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SidebarHeader className="p-6">
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => {
              router.push("/")
              maybeCloseSidebar()
            }}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src="/polite.jpg?height=58&width=58" alt="pita" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">pita</h2>
              <p className="text-sm text-muted-foreground">Computering</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => scrollToSection(item.id)}
                      className="cursor-pointer"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Blog/Writings Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Blog & Writings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Object.entries(blogData).map(([category, posts]) => (
                  <Collapsible key={category} open={openCategories.includes(category)}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          onClick={() => toggleCategory(category)}
                          className="cursor-pointer w-full"
                        >
                          <FileText className="h-4 w-4" />
                          <span>{category}</span>
                          {openCategories.includes(category) ? (
                            <ChevronDown className="ml-auto h-4 w-4" />
                          ) : (
                            <ChevronRight className="ml-auto h-4 w-4" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              onClick={() => handleCategoryClick(category)}
                              className="cursor-pointer font-medium text-muted-foreground hover:text-foreground"
                            >
                              View all in {category}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          {posts.map((post) => (
                            <SidebarMenuSubItem key={post.slug}>
                              <SidebarMenuSubButton
                                onClick={() => handleBlogClick(post.slug)}
                                className="cursor-pointer"
                              >
                                {post.title}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </>
  )
}
