import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import LayoutWrapper from "../../components/layout-wrapper"

const tools = [
  {
    name: "AwesomeWM",
    description: "the window manager i use",
    url: "https://awesomewm.org/",
    category: "Ricing",
  },
  {
    name: "Neovim",
    description: "the text editor i use",
    url: "https://neovim.io",
    category: "Development",
  },
  {
    name: "GitHub",
    description: "the git hosting i mostly use",
    url: "https://github.com",
    category: "Development",
  },
]

const resources = [
  {
    name: "AwesomeWM Docs",
    description: "the awesomewm documentations",
    url: "https://awesomewm.org/doc/",
    category: "Learning",
  },
  {
    name: "Zig docs",
    description: "Official Zig documentation",
    url: "https://ziglang.org/documentation/master/",
    category: "Learning",
  },
  {
    name: "DevDocs",
    description: "a lot of documentation",
    url: "https://devdocs.io",
    category: "Learning",
  },
  {
    name: "Lua(5.1) Docs",
    description: "The Lua documentation",
    url: "https://www.lua.org/manual/5.1/manual.html",
    category: "Learning",
  },
]

export default function ToolsAndResources() {
  return (
    <LayoutWrapper contentWidth="medium">
      <div className="py-16">
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-2">Tools & Resources</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">The tools I use daily and resources I recommend</p>
        </header>

        {/* Tools Section */}
        <section className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6 text-center">Tools</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tools.map((tool, index) => (
              <Link key={index} href={tool.url} target="_blank" className="group">
                  <Card className="hover:shadow-sm transition-shadow cursor-pointer border-grey h-full rounded bg-[hsl(var(--background))]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                        {tool.name}
                      </CardTitle>
                      <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{tool.category}</div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section>
  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6 text-center">Learning Resources</h2>
  <div className="grid gap-4 md:grid-cols-2">
    {resources.map((resource, index) => (
      <Link key={index} href={resource.url} target="_blank" className="group">
        <Card className="hover:shadow-sm transition-shadow cursor-pointer border-grey rounded bg-[hsl(var(--background))]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                {resource.name}
              </CardTitle>
              <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">{resource.category}</div>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {resource.description}
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    ))}
  </div>
</section>
            </div>
    </LayoutWrapper>
  )
}
