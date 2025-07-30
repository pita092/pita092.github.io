import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"

export default function Home() {
  return (
    <Navigation>
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        <About />
        <Projects />
      </main>
    </Navigation>
  )
}
