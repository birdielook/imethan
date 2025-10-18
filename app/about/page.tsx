import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <>
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
                  Project Management & Task Tracking
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center w-full">
            <h1 className="text-2xl font-semibold mb-4">About Page</h1>
            <p className="text-gray-600">This is the about page content.</p>
          </div>
        </div>
      </div>
    </>
  )
}
