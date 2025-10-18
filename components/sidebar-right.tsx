"use client"

import * as React from "react"
import { ChatKit, useChatKit } from '@openai/chatkit-react';

export function SidebarRight() {
  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        if (existing) {
          // implement session refresh
          return existing;
        }

        // Generate a simple device ID for this session
        const deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
        return client_secret;
      },
    },
    theme: {
      colorScheme: 'light',
      radius: 'pill',
      density: 'spacious',
      typography: {
        baseSize: 16,
        fontFamily: '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
        fontSources: [
          {
            family: 'OpenAI Sans',
            src: 'https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2',
            weight: 400,
            style: 'normal',
            display: 'swap'
          }
        // ...and 7 more font sources
        ]
      }
    },
    composer: {
      attachments: {
        enabled: true,
        maxCount: 5,
        maxSize: 10485760
      },
      tools: [
        {
          id: 'search_docs',
          label: 'Search docs',
          shortLabel: 'Docs',
          placeholderOverride: 'Search documentation',
          icon: 'book-open',
          pinned: false
        }
        // ...and 1 more tool
      ],
      models: [
        {
          id: 'crisp',
          label: 'Crisp',
          description: 'Concise and factual'
        }
        // ...and 2 more models
      ],
    },
    startScreen: {
      greeting: '',
      prompts: [
        {
          icon: 'circle-question',
          label: 'Tell me about Ethan and his skillset',
          prompt: 'Tell me about Ethan and his skillset'
        },
        {
          icon: 'circle-question',
          label: 'Most impactful projects?',
          prompt: 'What are some his most impactful projects?'
        },
        {
          icon: 'circle-question',
          label: 'Schedule a meeting with Ethan',
          prompt: 'Schedule a meeting with Ethan'
        },

        // ...and 4 more prompts
      ],
    },
  });

  return (
    <div className="h-screen w-full border-l bg-background">
      <div className="h-full w-full">
        <ChatKit 
          control={control} 
          className="h-full w-full" 
        />
      </div>
    </div>
  )
}
