"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TradeActionDialog } from "@/components/TradeActionDialog";
import { cancelReasons, reassignReasons } from "@/types/tradeOptions";
import { toast } from "sonner";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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

export function ChatInterface({
  ticket,
  openTradeDetails,
  setOpenTradeDetails,
  isDesktop,
}: {
  ticket: Ticket;
  openTradeDetails: boolean;
  setOpenTradeDetails: (open: boolean) => void;
  isDesktop: boolean;
}) {
  const [message, setMessage] = useState("");
  const messages = mockMessages;
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [reassignDialogOpen, setReassignDialogOpen] = useState(false);
  const normalizedStatus = ticket.status.toLowerCase() as TicketStatus;

  const handleCancelTrade = (reason: string, note: string) => {
    setTimeout(() => {
      toast.success("Trade Cancelled", {
        description: (
          <span style={{ color: "#1e2740" }}>
            Trade cancelled. Reason: {reason}
            {note && `. Note: ${note}`}
          </span>
        ),
      });
    }, 1000);
  };

  const handleReassignTrade = (reason: string, note: string) => {
    setTimeout(() => {
      toast.success("Trade Reassigned", {
        description: `Trade reassigned. Reason: ${reason}${
          note ? `. Note: ${note}` : ""
        }`,
      });
    }, 0);
  };

  return (
    <div className="flex h-full">
      {/* Chat Section */}
      <div className="flex flex-col flex-1">
        {/* Chat Header */}
        <div className="flex items-center justify-between gap-4 border rounded-sm py-5 px-2.5 bg-white">
          {/* Agent Info */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-8">
              <span className="font-medium text-sm">{ticket.agent}</span>
              <Badge
                variant="secondary"
                className={`${statusStyles[normalizedStatus]} font-medium px-2 py-0.5 rounded-full text-xs capitalize`}
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
                <div className="flex gap-1">
                  <span>Ticket ID:</span>
                  <span>{ticket.ticketId}</span>
                  <span>• {ticket.date}</span>
                </div>
                <div className="items-start text-sm text-muted-foreground">
                  Trade Link: {ticket.tradeLink}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3.5 pb-1">
                <Clock className="h-4 w-4" />
                <span>Opened {ticket.openedAgo}</span>
              </div>
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
                <DropdownMenuItem
                  className="text-[#fe251a]"
                  onClick={() => setCancelDialogOpen(true)}
                >
                  <X className="h-4 w-4 mr-2 text-[var(--destructive)]" />
                  Cancel Trade
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReassignDialogOpen(true)}>
                  <UserRoundCheck className="h-4 w-4 mr-2" />
                  Reassign Trade
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* One unified Trade Details button */}
            <Button
              size="sm"
              variant="default"
              onClick={() =>
                setOpenTradeDetails(isDesktop ? !openTradeDetails : true)
              }
            >
              Trade Details
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
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

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm h-[80px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && message.trim()) {
                  e.preventDefault();
                  // handle send here
                  setMessage("");
                }
              }}
            />
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4 cursor-pointer" />
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary-hover">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* Mobile Sheet */}
      {!isDesktop && (
        <Sheet open={openTradeDetails} onOpenChange={setOpenTradeDetails}>
          <SheetContent
            side="left"
            className="!max-w-sm w-full pt-4 flex flex-col items-start"
          >
            <SheetHeader className="w-full">
              <SheetTitle className="text-lg font-semibold">
                Trade Details
              </SheetTitle>
            </SheetHeader>
            <TradeDetailsContent ticket={ticket} />
          </SheetContent>
        </Sheet>
      )}
      {/* Cancel Trade Dialog */}
      <TradeActionDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        title="Cancel Trade"
        options={cancelReasons}
        confirmLabel="Confirm Cancel"
        onConfirm={handleCancelTrade}
      />

      {/* Reassign Trade Dialog */}
      <TradeActionDialog
        open={reassignDialogOpen}
        onOpenChange={setReassignDialogOpen}
        title="Reassign Trade"
        options={reassignReasons}
        confirmLabel="Confirm Reassign"
        onConfirm={handleReassignTrade}
      />
    </div>
  );
}

export function TradeDetailsContent({ ticket }: { ticket: Ticket }) {
  return (
    <>
      <div className="mt-4 flex flex-col items-start space-y-3 text-sm w-full">
        <div className="flex justify-between items-center w-full">
          <span className="text-muted-foreground">Ticket ID</span>
          <span className="font-medium">{ticket.ticketId}</span>
        </div>
        <div className="flex justify-between items-center w-full">
          <span className="text-muted-foreground">Vendor</span>
          <span className="font-medium">{ticket.vendor}</span>
        </div>
      </div>

      <Separator className="my-4 w-full" />

      <div className="flex flex-col items-start w-full">
        <h4 className="font-medium mb-3">Timeline</h4>
        <div className="relative border-l border-border pl-4 space-y-4 w-full">
          {ticket.timeline?.map((event, index) => (
            <div key={index} className="relative">
              <div
                className={`absolute -left-6 w-3 h-3 rounded-full ${
                  event.status === "completed" ? "bg-success" : "bg-primary"
                }`}
              />
              <div>
                <p className="text-sm font-medium">{event.event}</p>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
