import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  Home
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-4">
        <div className="flex-1 overflow-hidden">
          <div className="relative w-full h-full">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Click me</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
