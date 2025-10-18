"use client"

import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Mail,
  MessageCircleQuestion,
  Settings2,
  Sparkles,
  Trash2,
  User,
} from "lucide-react"
import { useTheme } from "next-themes"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavWorkspaces } from "@/components/nav-workspaces"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      // isActive: true,
    },
    {
      title: "About",
      url: "/about",
      icon: User,
    },
    {
      title: "Resume",
      url: "#",
      icon: Sparkles,
    },

    {
      title: "Contact",
      url: "#",
      icon: Mail,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  favorites: [
    {
      name: "Insurance Agents Platform",
      url: "#",
      emoji: "",
    },
    {
      name: "Visual Studio GitHub Copilot",
      url: "#",
      emoji: "",
    },
    {
      name: "Enterprise VPN",
      url: "#",
      emoji: "",
    },
    {
      name: "FinTech",
      url: "#",
      emoji: "",
    },
    {
      name: "In-Car E-commerce",
      url: "/car",
      emoji: "",
    }

  ],
  workspaces: [
    {
      name: "Golf Apps Ecosystem",
      emoji: "🏠",
      pages: [
        {
          name: "Club Tournament Platform",
          url: "#",
          emoji: "📔",
        },
        {
          name: "AI Golf Course Finder",
          url: "#",
          emoji: "🍏",
        },
        {
          name: "Golf GPS and AI Caddie",
          url: "#",
          emoji: "🌟",
        },
      ],
    },
    {
      name: "Open AI",
      emoji: "🧳",
      pages: [
        {
          name: "In Vegas",
          url: "#",
          emoji: "🗺️",
        },
        {
          name: "Next Drawing",
          url: "#",
          emoji: "🌎",
        },
      ],
    },
  ],
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <Sidebar className="border-r-0 h-full" {...props}>
      <SidebarHeader>
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div className="flex items-center px-4">
            {mounted ? (
              <img 
                src={resolvedTheme === "dark" ? "/logo-ethan-dark.svg" : "/logo-ethan.svg"} 
                alt="Ethan Logo" 
                className="h-8 w-auto"
              />
            ) : (
              <img 
                src="/logo-ethan.svg" 
                alt="Ethan Logo" 
                className="h-8 w-auto"
              />
            )}
          </div>
          
          <ThemeToggle />

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <NavMain items={data.navMain} />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
