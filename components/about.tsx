export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light mb-12 text-center">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              i can do code
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              im not good at much
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-4">siklls</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Languages</div>
                  <div className="text-sm">Rust, zig, c, lua, englush, hebrew, learning russian</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Backend</div>
                  <div className="text-sm">idk</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Design</div>
                  <div className="text-sm">I cant design</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Tools</div>
                  <div className="text-sm">git, the other thing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
