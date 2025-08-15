"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ticket } from "@/types/ticket";

interface TicketListProps {
  tickets: Ticket[]; // ✅ should be an array
  onTicketSelect: (ticket: Ticket) => void;
  selectedTicketId?: string;
}

export function TicketList({
  tickets,
  onTicketSelect,
  selectedTicketId,
}: TicketListProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "urgent":
        return <Badge variant="urgent">Urgent</Badge>;
      case "warning":
        return <Badge variant="warning">Warning</Badge>;
      case "info":
        return <Badge variant="info">Info</Badge>;
      case "paid":
        return <Badge variant="paid">Paid</Badge>;
      case "escalated":
        return <Badge variant="destructive">Escalated</Badge>;
      case "dispute":
        return <Badge variant="outline">Dispute</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3 overflow-y-auto h-[calc(100vh-220px)] md:h-[calc(100vh-240px)]">
        {tickets.map(
          (
            ticket // ✅ ticket is now typed
          ) => (
            <Card
              key={`${ticket.id}-${ticket.ticketId}`} // adjusted key
              className={`p-2 cursor-pointer transition-all hover:shadow-md ${
                selectedTicketId === ticket.id
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:bg-muted/50"
              }`}
              onClick={() => onTicketSelect(ticket)} // ✅ correct variable
            >
              <ScrollArea className="h-full p-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{ticket.id}</h3>
                      {getStatusBadge(ticket.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="font-medium">{ticket.vendor}</span>
                      <span className="font-bold text-foreground">
                        {ticket.tradeLink}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{ticket.openedAgo} ago</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
