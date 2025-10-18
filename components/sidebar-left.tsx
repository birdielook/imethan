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

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavWorkspaces } from "@/components/nav-workspaces"
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
      name: "Visual Studio Copilot AI",
      url: "#",
      emoji: "",
    },
    {
      name: "Cyberights Enterprise VPN",
      url: "#",
      emoji: "",
    },
    {
        name: "FinTech Mobile App",
        url: "#",
        emoji: "",
      },
      {
        name: "First In-Vehicle E-commerce Platform",
        url: "/car",
        emoji: "",
      }

  ],
  workspaces: [
    {
      name: "Golf Ecosystem Application",
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
      name: "Open AI Agent Builder",
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
  return (
    <Sidebar className="border-r-0 h-full" {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
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
