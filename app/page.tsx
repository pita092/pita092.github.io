import Link from "next/link"
import LayoutWrapper from "../components/layout-wrapper"
import { Trash, Smile, Palette, BookOpen, PenTool, Users, GraduationCap, Code2, Calendar, FileText, Lightbulb } from "lucide-react"

const interests = [
  {
    title: "Draco",
    description: "Silver",
    link: "https://draco.is-a.dev",
    category: "GOATED",
    icon: Smile,
  },
  {
    title: "Ƞ𝑒",
    description: "knee",
    link: "https://open.spotify.com/user/1lrr3glnl1r8jtitkxs15a3r6",
    category: "knees",
    icon: Trash,
  },
  {
    title: "poacher",
    description: "cool dude",
    link: "https://henry.is-a.dev/",
    category: "person",
    icon: Smile,
  },
  {
    title: "Darkkal",
    description: "cool dude",
    link: "https://github.com/darkkal44",
    category: "person",
    icon: Smile,
  },
]

const quickLinks = [
  {
    title: "example",
    description: "example",
    link: "/blog/typescript-best-practices",
    date: "2023-12-20",
    icon: FileText,
  },
  {
    title: "example",
    description: "example",
    link: "/blog/typescript-best-practices",
    date: "2023-12-20",
    icon: FileText,
  },
  {
    title: "example",
    description: "example",
    link: "/blog/typescript-best-practices",
    date: "2023-12-20",
    icon: FileText,
  },
  {
    title: "example",
    description: "example",
    link: "/blog/typescript-best-practices",
    date: "2023-12-20",
    icon: FileText,
  },
  {
    title: "example",
    description: "example",
    link: "/blog/typescript-best-practices",
    date: "2023-12-20",
    icon: FileText,
  },
]

export default function Home() {
  return (
    <LayoutWrapper contentWidth="full">
      <div>
        {/* Interests Section */}
        <section className="mb-12"> {/* Added margin-bottom here */}
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-8">Cool Stuff</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interests.map((interest, index) => {
              const Icon = interest.icon
              return (
                <Link
                  key={index}
                  href={interest.link}
                  className="interest-card group"
                  target={interest.link.startsWith("http") ? "_blank" : undefined}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-secondary flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                        <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                        {interest.title}
                      </h3>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                      {interest.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{interest.description}</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="quick-links-section">
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">Recent Writing</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <Link key={index} href={link.link} className="quick-link-item group">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-6 h-6 bg-gray-100 dark:bg-secondary flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                      <Icon className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 mb-1">
                        {link.title}
                      </h3>
                      <time className="text-xs text-gray-500 dark:text-gray-500">{link.date}</time>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{link.description}</p>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </LayoutWrapper>
  )
}

