"use client"

import * as React from "react"
import { ChatKit, useChatKit } from '@openai/chatkit-react';
import { createRoot, type Root } from "react-dom/client"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

// Move configuration outside component to prevent recreation
const CHATKIT_CONFIG = {
  api: {
    async getClientSecret(currentClientSecret: string | null): Promise<string> {
      // Prefer existing secret provided by SDK if available
      if (currentClientSecret) {
        return currentClientSecret;
      }

      // Reuse a persisted secret if present
      try {
        const storedSecret = window.localStorage.getItem('chatkitClientSecret');
        if (storedSecret) {
          return storedSecret;
        }
      } catch {}

      // Ensure a stable device id across navigations
      let deviceId: string | null = null;
      try {
        deviceId = window.localStorage.getItem('chatkitDeviceId');
        if (!deviceId) {
          deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          window.localStorage.setItem('chatkitDeviceId', deviceId);
        }
      } catch {
        // Fallback if localStorage is unavailable
        deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }

      const res = await fetch('/api/chatkit/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deviceId }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to get ChatKit session');
      }
      
      const { client_secret } = await res.json();

      // Persist for future navigations
      try {
        window.localStorage.setItem('chatkitClientSecret', client_secret);
      } catch {}

      return client_secret;
    },
  },
  theme: {
    colorScheme: 'dark' as const,
    radius: 'round' as const,
    density: 'spacious' as const,
    typography: {
      baseSize: 16 as const,
      fontFamily: '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
      fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
      fontSources: [
        {
          family: 'OpenAI Sans',
          src: 'https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2',
          weight: 400,
          style: 'normal' as const,
          display: 'swap' as const
        }
      // ...and 7 more font sources
      ]
    }
  },

  startScreen: {
    greeting: 'I\'m Ethan. You can ask me anything.',
    prompts: [
      {
        icon: 'circle-question' as const,
        label: 'Schedule a meeting',
        prompt: 'Schedule a meeting'
      },
      {
        icon: 'circle-question' as const,
        label: 'Call me',
        prompt: 'Make a phone call to user'
      },
      {
        icon: 'circle-question' as const,
        label: 'Down resume',
        prompt: 'Provide resume download link'
      }
      // ...and 4 more prompts
    ],
  },
};

let chatkitMounted = false
let chatkitRoot: Root | null = null

function ChatKitApp({ isMobile, onClose }: { isMobile: boolean; isOpen: boolean; onClose: () => void }) {
  const { control } = useChatKit(CHATKIT_CONFIG)
  const [sessionStatus, setSessionStatus] = React.useState<'connecting' | 'connected' | 'error'>('connecting')
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  
  React.useEffect(() => {
    // Monitor session health
    const checkSession = () => {
      try {
        const hasSecret = window.localStorage.getItem('chatkitClientSecret')
        setSessionStatus(hasSecret ? 'connected' : 'connecting')
      } catch {
        setSessionStatus('error')
        setErrorMessage('Failed to check session status')
      }
    }
    
    // Listen for ChatKit errors
    const handleError = (event: Event) => {
      const customEvent = event as CustomEvent
      console.error('ChatKit error:', customEvent.detail)
      setSessionStatus('error')
      setErrorMessage((customEvent.detail as { message?: string })?.message || 'Unknown ChatKit error')
    }
    
    window.addEventListener('chatkit-error', handleError as EventListener)
    checkSession()
    const interval = setInterval(checkSession, 5000)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('chatkit-error', handleError as EventListener)
    }
  }, [])

  return (
    <div className={`relative h-full w-full p-4 ${isMobile ? 'bg-background' : ''}`}>
      {/* Session health indicator */}
      <div className="absolute top-2 right-2 z-10">
        <div 
          className={`w-2 h-2 rounded-full ${
            sessionStatus === 'connected' ? 'bg-green-500' : 
            sessionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          title={`Session: ${sessionStatus}${errorMessage ? ` - ${errorMessage}` : ''}`}
        />
      </div>
      
      {/* Error message display */}
      {errorMessage && (
        <div className="absolute top-8 right-2 left-2 z-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
      
      {/* Mobile close button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 left-2 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <ChatKit control={control} className="h-full w-full rounded-xl overflow-hidden" />
    </div>
  )
}

const SidebarRight = React.memo(function SidebarRight() {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = React.useState(false)
  
  React.useEffect(() => {
    // Skip if already mounted (HMR guard)
    if (chatkitMounted) return
    
    const id = "chatkit-portal-root"
    let container = document.getElementById(id)
    if (!container) {
      container = document.createElement("div")
      container.id = id
      container.className = isMobile 
        ? "fixed inset-0 h-screen w-full bg-background z-50" 
        : "fixed right-0 top-0 h-screen w-[380px] border-l bg-background z-40"
      document.body.appendChild(container)
    }
    
    // Update container classes when mobile state changes
    if (container) {
      container.className = isMobile 
        ? "fixed inset-0 h-screen w-full bg-background z-50" 
        : "fixed right-0 top-0 h-screen w-[380px] border-l bg-background z-40"
    }
    
    chatkitRoot = chatkitRoot ?? createRoot(container)
    chatkitRoot.render(
      <ChatKitApp 
        isMobile={isMobile} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    )
    chatkitMounted = true
  }, [isMobile, isOpen])

  // Handle mobile overlay visibility
  React.useEffect(() => {
    if (isMobile) {
      const container = document.getElementById("chatkit-portal-root")
      if (container) {
        container.style.display = isOpen ? "block" : "none"
      }
    }
  }, [isMobile, isOpen])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  // Mobile floating button
  if (isMobile) {
    return (
      <>
        {/* Floating button */}
        <Button
          onClick={handleToggle}
          className="fixed bottom-4 left-4 z-50 h-14 w-14 rounded-full shadow-lg"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        
        {/* Reserve no space on mobile */}
        <div className="hidden" />
      </>
    )
  }

  // Desktop: Reserve layout space on the right so content doesn't underlap the fixed portal
  return (
    <div className="h-screen w-full border-l bg-background" />
  )
}, () => true)

SidebarRight.displayName = 'SidebarRight';

export { SidebarRight };
