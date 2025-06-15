import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LayoutWrapper from "../../components/layout-wrapper"

const favorites = [
  {
    title: "Favorite Book",
    description: "The Design of Everyday Things by Don Norman",
    image: "/placeholder.svg?height=200&width=300",
    category: "Books",
  },
]

export default function FavoriteThings() {
  return (
    <LayoutWrapper contentWidth="wide">
      <div className="py-16">
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-2">Favorite Things</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">A visual collection of things that bring me joy</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {favorites.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 rounded bg-[hsl(var(--secondary))]"
            >
              <div className="aspect-[4/3] relative">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-1">
                  <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">{item.title}</CardTitle>
                  <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 bg-[hsl(var(--secondary))] px-2 py-1 rounded">
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
