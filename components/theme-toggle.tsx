"use client"

import * as React from "react"
import { Moon, Sun, Palette, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <ToggleGroup 
        type="single" 
        variant="default" 
        size="sm" 
        className="justify-start bg-muted/50 rounded-md p-2"
        value="system"
        onValueChange={() => {}}
      >
        <ToggleGroupItem value="system" aria-label="System theme">
          <Monitor className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="light" aria-label="Light theme">
          <Sun className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark theme">
          <Moon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="navy" aria-label="Navy theme">
          <Palette className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    )
  }

  return (
    <ToggleGroup 
      type="single" 
      variant="default" 
      size="sm" 
      className="justify-start bg-muted/50 rounded-md p-2"
      value={theme || "system"}
      onValueChange={(value) => setTheme(value)}
    >
            <ToggleGroupItem value="system" aria-label="System theme">
        <Monitor className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="light" aria-label="Light theme">
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark theme">
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="navy" aria-label="Navy theme">
        <Palette className="h-4 w-4" />
      </ToggleGroupItem>

    </ToggleGroup>
  )
}
