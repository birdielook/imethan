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
