"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light mb-6">Pita</h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            i do stuff
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
       </div>
      </div>
    </section>
  )
}
