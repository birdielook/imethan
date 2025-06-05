import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4">

        <span className="font-bold mr-4rem">Ethan Nguyen</span>
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-16 pt-8">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden">
          <Image
            src="/images/project-thumb-vs.png"
            alt="Project Thumbnail"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
          />
        </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/project-thumb-vs.png"
                alt="Project Thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/project-thumb-vs.png"
                alt="Project Thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/project-thumb-vs.png"
                alt="Project Thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />

    </SidebarProvider>
  )
}
