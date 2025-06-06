import { AppSidebar } from "@/components/app-sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Spline from '@splinetool/react-spline';
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Image from 'next/image'

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center px-4">
          <div className="w-full max-w-full mx-auto flex justify-end">
            <SidebarTrigger className="rotate-180" />
          </div>
        </header>
        <div className="flex flex-1 flex-col">

          <div className="relative aspect-video w-full rounded-xl overflow-hidden h-[400px]">
          <Spline
              scene="https://prod.spline.design/m5uh4Jhoh9m8OkFR/scene.splinecode"
              className="w-full h-full"
            />
          </div>

          <div className="flex-1 flex-col p-16 gap-8">
            
          
          <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8">
            <div className="relative w-full h-full">
              <Image 
                src="/images/project-thumb-vs.png" 
                alt="Project thumbnail"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          


          <div className="grid auto-rows-min gap-8 md:grid-cols-1">

         
            <div className="relative aspect-video rounded-xl">
                <h1 className="text-2xl  mb-12" style={{color: "#222"}}><strong>2024</strong> The future is here. I&apos;m currently working on <strong>Visual Studio at Microsoft </strong> with some incredibly talented people. It&apos;s truly a privilege to learn from them and to work on implementing AI every day. We&apos;re the first generation with access to Artificial Intelligence. As a designer who loves solving user problems, I see AI addressing so many challenges and completely changing the digital landscape and user experience. Check my colleagues <a href="https://www.youtube.com/watch?v=Fq7myF58Odc" target="_blank" rel="noopener noreferrer" style={{color: "purple"}}>demo</a> of what we&apos;re working on at the 2025 Build Conference.</h1>

                  <h1 className="text-1xl  mb-12" style={{color: "#222"}}><strong>2022</strong> I reunited with my former manager for an exciting adventure: designing a <strong>cutting-edge mesh VPN solution</strong>. Together, we brought to life two native desktop apps, two mobile apps, and built a ZenDesk help center. Over two years of collaboration, prototyping, and creative problem-solving, we launched a competitive enterprise solution. Sadly, despite our best efforts, we eventually ran out of runway.</h1>
                  <h1 className="text-1xl  mb-12" style={{color: "#222"}}><strong>2021</strong> Joining a <strong>Dallas FinTech startup</strong> was a whirlwind adventure. I helped hire and support a team of 10 designers, organized us into agile squads, and collaborated across departments to create banking, credit card, mortgage, and insurance apps. In just 12 months, we launched our marketing and mobile banking applications. Though the company’s journey was brief, the creativity, teamwork, and excitement made it an unforgettable experience.</h1>
                  <h1 className="text-1xl  mb-12" style={{color: "#222"}}><strong>2019</strong> Automotive Innovation Awards. I helped launch <strong>the first in-vehcile e-commerce marketplace</strong>, empowering commuters to pay for fuel, order food, and pick up groceries—all directly from their vehicle’s infotainment system. Our platform was installed in millions of GM and Stellantis vehicles, revolutionizing the in-car experience which led to our company being acquired.</h1>
                  <h1 className="text-1xl  mb-12" style={{color: "#222"}}><strong>2015</strong> Connected Car Applications. Over the course of several years, I worked on the team at <strong>Honda and Toyota</strong> in Los Angeles to build connected car mobile applications. I made many friends and started learning how to code.</h1>
                  <h1 className="text-1xl  mb-12" style={{color: "#222"}}><strong>2013</strong> Joining a startup. <strong>Drawing on napkin, coffee with early users,</strong>  late night calls with developers in India. It was invigorating launching one the first few work management platform in the market. Kerika is still in business and growing internationally. Products that solve real pains last.</h1>
                  <h1 className="text-1xl  mb-12" style={{color: "#222"}}><strong>2012</strong> The snap app revolution. <strong>I joined an incubator team </strong> at Microsoft tasked with conceptualizing bite-size mobile applications called <strong>snack apps</strong>. Two of the six concept maded it to the app store.</h1>
                  <h1 className="text-1xl  mb-12" style={{color: "#222"}}><strong>2011</strong> A dream come true for a student studying design. I withdrew from school early to work on the <strong>Bing Search team</strong> —  I worked on many areas across the bing search experience, but an small improvements I made to bing ads helped increased revenue by millions. I realized the smallest details can make big impact.</h1>
            </div>


          </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />

    </SidebarProvider>
  )
}
