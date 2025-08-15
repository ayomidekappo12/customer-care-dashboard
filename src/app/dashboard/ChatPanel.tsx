"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Paperclip,
  Check,
  ArrowRight,
  X,
  UserRoundCheck,
  Clock,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ticket, TicketStatus } from "@/types/ticket";


interface ChatMessage {
  id: string;
  sender: "customer" | "agent";
  message: string;
  timestamp: string;
  senderName?: string;
}


const mockMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "agent",
    message:
      "I understand your concern. Let me check the transaction details. Could you please provide your account email?",
    timestamp: "May 12, 10:45 AM (2h ago)",
    senderName: "Support Agent",
  },
  {
    id: "2",
    sender: "customer",
    message: "My email is user@example.com",
    timestamp: "May 12, 10:45 AM (1h 53m ago)",
    senderName: "Customer",
  },
];

const statusStyles: Record<TicketStatus, string> = {
  urgent: "bg-red-100 text-red-600",
  warning: "bg-yellow-100 text-yellow-600",
  info: "bg-blue-100 text-blue-600",
  escalated: "bg-purple-100 text-purple-600",
  paid: "bg-green-100 text-green-600",
  dispute: "bg-gray-100 text-gray-600",
};

export function ChatInterface({ ticket }: { ticket: Ticket }) {
  const [message, setMessage] = useState("");
  const [messages] = useState<ChatMessage[]>(mockMessages);

  return (
    <div className="flex h-full">
      {/* Left: Chat Section */}
      <div className="flex flex-col flex-1">
        {/* ---------- Chat Header ---------- */}
        <div className="flex items-center justify-between gap-4 border rounded-sm py-5 px-2.5 bg-white">
          {/* Agent Info */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-8">
              <span className="font-medium text-sm">{ticket.agent}</span>
              <Badge
                variant="secondary"
                className={`${
                  statusStyles[ticket.status]
                } font-medium px-2 py-0.5 rounded-full text-xs capitalize`}
              >
                {ticket.status}
              </Badge>
            </div>
            <span className="text-xs text-gray-500">Paid: {ticket.vendor}</span>
          </div>

          {/* Ticket Meta */}
          <div className="flex items-center justify-evenly gap-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-start text-sm text-muted-foreground">
                <div className="flex">
                  <span>Ticket ID:</span>
                  <span>{ticket.ticketId}</span>
                  <span>• {ticket.date}</span>
                </div>
                <div className="items-start text-sm text-muted-foreground">
                  Trade Link: {ticket.tradeLink}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm  text-muted-foreground mb-3.5 pb-1">
                <Clock className="h-4 w-4" />
                <span>Opened {ticket.openedAgo}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Actions
                    <ChevronDown className="h-4 w-4 ml-1.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white">
                  <DropdownMenuItem className="text-[#16a34a]">
                    <Check className="h-4 w-4 mr-2 text-[var(--success)]" />
                    Mark as Resolved
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#f6b10a]">
                    <ArrowRight className="h-4 w-4 mr-2 text-[var(--primary)]" />
                    Forward to Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#fe251a]">
                    <X className="h-4 w-4 mr-2 text-[var(--destructive)]" />
                    Cancel Trade
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserRoundCheck className="h-4 w-4 mr-2" />
                    Reassign Trade
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                variant="default"
                className="cursor-pointer text-xs"
              >
                Trade Details
              </Button>
            </div>
          </div>
        </div>

        {/* ---------- Messages ---------- */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "customer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg flex flex-col ${
                  msg.sender === "customer"
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[#F9FAFB] text-gray-900"
                }`}
              >
                <div
                  className={`text-xs font-semibold mb-1 ${
                    msg.sender === "customer" ? "text-white" : "text-gray-700"
                  }`}
                >
                  {msg.senderName}
                </div>

                <div className="text-sm">{msg.message}</div>

                {/* Timestamp aligned to the right */}
                <div
                  className={`text-xs mt-1 self-end ${
                    msg.sender === "customer"
                      ? "text-white/80"
                      : "text-gray-500"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- Message Input ---------- */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-[80px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && message.trim()) {
                  e.preventDefault(); // prevents new line
                  // handle send
                  setMessage("");
                }
              }}
            />
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4 cursor-pointer" />
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary-hover cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* Right: Trade Details Panel (TODO) */}
    </div>
  );
}
