"use client"

import * as React from "react"
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { SendIcon } from "lucide-react"
import Image from 'next/image';

// Function to convert URLs in text to clickable links
const formatMessageWithLinks = (text: string): React.ReactNode => {
  if (!text) return text;
  
  // This regex matches URLs starting with http://, https://, or www.
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;
  
  // Find all URLs and their positions
  const matches: {index: number, url: string}[] = [];
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      url: match[0]
    });
  }
  
  if (matches.length === 0) return text;
  
  // Sort matches by index in reverse order to avoid index shifting when replacing
  matches.sort((a, b) => b.index - a.index);
  
  // Convert the text to an array of React nodes
  let result: (string | JSX.Element)[] = [text];
  
  matches.forEach(({index, url}) => {
    const last = result.pop() as string;
    const before = last.substring(0, index);
    const after = last.substring(index + url.length);
    const link = (
      <a 
        key={`${index}-${url}`}
        href={url.startsWith('http') ? url : `https://${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-all"
        onClick={(e) => e.stopPropagation()}
      >
        {url}
      </a>
    );
    result = [...result, after, link, before];
  });
  
  return result.reverse();
};

interface Message {
  sender: 'user' | 'bot'
  text: string
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [inputValue, setInputValue] = React.useState('')
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const [isLoading, setIsLoading] = React.useState(false);
  const [threadId, setThreadId] = React.useState<string | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('https://chat-t2qdaiq5wq-uc.a.run.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          threadId: threadId || undefined
        }),
      });
      
      if (!res.ok) throw new Error('Failed to get response');
      
      const data = await res.json();
      
      // If this is the first message, store the thread ID for future messages
      if (!threadId && data.threadId) {
        setThreadId(data.threadId);
      }
      
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: data.reply 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Sorry, there was an error processing your message. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <Sidebar variant="inset" {...props} className="flex flex-col h-full">
      <SidebarContent className="flex-1 overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Image
                src="/images/ethan-avatar.png"
                alt="Ethan Avatar"
                width={120}
                height={120}
                className="rounded-full mb-8"
              />

                <p className="mb-2">Hi there, I’m Ethan — a design engineer building AI-powered apps, agents, and automations to help organizations work more efficiently.</p>
                <p className="mb-2">Ask me anything about my work, projects, or thoughts in this 1:1 chat.</p>
                <p className="mb-2">I trained this AI to sound like me, but it&apos;s not me. If you&apos;d like to meet, just type let&apos;s chat to get a link to schedule a time.</p>
                <p className="mb-2">Let&apos;s connect on <a href="https://www.linkedin.com/in/imethan/" target="_blank" rel="noopener noreferrer" style={{color: "purple"}}>LinkedIn</a>.</p>

              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden mb-1">
                      <Image 
                        src="/images/ethan-avatar.png" 
                        alt="Ethan" 
                        width={32} 
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div 
                      className={`rounded-lg ${
                        msg.sender === 'user' 
                          ? 'bg-primary text-primary-foreground px-4 py-2' 
                          : 'bg-transparent px-0 py-2'
                      }`}
                    >
                      <p className="whitespace-pre-wrap bg-transparent">
                        {formatMessageWithLinks(msg.text)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-lg bg-muted">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4">
            <div className="gap-4">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  variant="ghost"
                  disabled={isLoading || !inputValue.trim()}
                  className="shrink-0"
                >
                  {isLoading ? <Skeleton className="h-4 w-4 rounded-full" /> : <SendIcon />} 
                </Button>
              </div>
            </div>
          </form>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
