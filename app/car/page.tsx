import { AppSidebar } from "@/components/app-sidebar"
// Car page content
import Spline from '@splinetool/react-spline';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>

      <SidebarInset>
        <div className="h-16 bg-[#2ACB40] h-full">
        <header className="absolute top-0 left-0 right-0 z-10 flex h-16 shrink-0 items-center gap-2 px-16">

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

        <div className="flex flex-1 flex-col bg-[#2ACB40] h-full">

          <div className="relative aspect-video w-full overflow-hidden h-[600px]">
            <Spline
              scene="https://prod.spline.design/o2Wqsd0wdmoIlUsF/scene.splinecode"
              className="w-full h-full"
            />
          </div>









        </div>
        </div>



      </SidebarInset>
      <AppSidebar side="right" />

    </SidebarProvider>
  )
}
