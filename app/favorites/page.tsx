import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LayoutWrapper from "../../components/layout-wrapper"

const favorites = [
  {
    title: "neovim",
    description: "My code editor",
    image: "/catpfp.jpg",
    category: "Code",
  },
]

export default function FavoriteThings() {
  return (
    <LayoutWrapper contentWidth="wide">
      <div className="py-16">
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-2">Stuff i like</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">hi</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {favorites.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 rounded bg-[hsl(var(--background))]"
            >
              <div className="aspect-[4/3] relative">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-1">
                  <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">{item.title}</CardTitle>
                  <span className="text-xs text-gray-500 dark:text-gray-500 dark:bg-secondary bg-[hsl(var(--background))] px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </LayoutWrapper>
  )
}
