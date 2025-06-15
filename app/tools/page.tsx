import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import LayoutWrapper from "../../components/layout-wrapper"

const tools = [
  {
    name: "Figma",
    description: "My go-to design tool for creating interfaces and prototypes",
    url: "https://figma.com",
    category: "Design",
  },
  {
    name: "VS Code",
    description: "Primary code editor with excellent TypeScript support",
    url: "https://code.visualstudio.com",
    category: "Development",
  },
  {
    name: "Linear",
    description: "Issue tracking and project management done right",
    url: "https://linear.app",
    category: "Productivity",
  },
  {
    name: "Vercel",
    description: "Deployment platform that makes shipping web apps effortless",
    url: "https://vercel.com",
    category: "Deployment",
  },
  {
    name: "Notion",
    description: "All-in-one workspace for notes, docs, and project planning",
    url: "https://notion.so",
    category: "Productivity",
  },
  {
    name: "GitHub",
    description: "Version control and collaboration platform",
    url: "https://github.com",
    category: "Development",
  },
]

const resources = [
  {
    name: "MDN Web Docs",
    description: "The most comprehensive web development documentation",
    url: "https://developer.mozilla.org",
    category: "Learning",
  },
  {
    name: "Egghead.io",
    description: "Concise video tutorials on modern web development",
    url: "https://egghead.io",
    category: "Learning",
  },
  {
    name: "TypeScript Handbook",
    description: "Official guide to TypeScript features and best practices",
    url: "https://www.typescriptlang.org/docs/",
    category: "Learning",
  },
  {
    name: "React Docs",
    description: "Official React documentation with interactive examples",
    url: "https://react.dev",
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
                  <Card className="hover:shadow-sm transition-shadow cursor-pointer border-0 h-full rounded bg-[hsl(var(--secondary))]">
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
          <div className="space-y-4">
            {resources.map((resource, index) => (
              <Link key={index} href={resource.url} target="_blank" className="group">
                <Card className="hover:shadow-sm transition-shadow cursor-pointer border-gray-100 dark:border-gray-800 rounded bg-white dark:bg-gray-950">
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
