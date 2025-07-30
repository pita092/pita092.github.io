"use client"

import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export function Navigation({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}


//         <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:hidden">
//   <SidebarTrigger className="-ml-1" />
// </header>
