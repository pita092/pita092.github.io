import type { ReactNode } from "react"
import Sidebar from "./sidebar"

interface LayoutWrapperProps {
  children: ReactNode
  contentWidth?: "narrow" | "medium" | "wide" | "extra-wide" | "full"
  className?: string
}

export default function LayoutWrapper({ children, contentWidth = "narrow", className = "" }: LayoutWrapperProps) {
  return (
    <div className="app-layout bg-white dark:bg-background transition-colors">
      <Sidebar />

      <div className="main-content">
        <div className="content-area">
          <div className={`content-${contentWidth} ${className}`}>{children}</div>
        </div>
      </div>
    </div>
  )
}
