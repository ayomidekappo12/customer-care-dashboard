"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/app/dashboard/SidebarNav";
import { DashboardHeader } from "@/app/dashboard/Ticket/TopBar";
import { SubBar } from "@/app/dashboard/SubBar";
import { TicketList } from "@/app/dashboard/Ticket/TicketList";
import { ChatInterface } from "@/app/dashboard/ChatPanel";
import { Ticket } from "@/types/ticket";


const allTickets: Ticket[] = [
  {
    id: "PaxfulAgent001",
    agent: "John Doe",
    vendor: "Paxful",
    status: "urgent",
    ticketId: "TXN001",
    date: "May 12, 2025",
    tradeLink: "#",
    openedAgo: "2h ago",
    priority: "urgent",
  },
  {
    id: "SpeedyPay",
    agent: "Jane Smith",
    vendor: "SpeedyPay",
    status: "warning",
    ticketId: "TXN002",
    date: "May 12, 2025",
    tradeLink: "#",
    openedAgo: "1h ago",
    priority: "warning",
  },
];

const Index = () => {
  const [filter, setFilter] = useState<"all" | "urgent" | "warning" | "info">(
    "all"
  );
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const filteredTickets = allTickets.filter((Ticket) => {
    if (filter === "all") return true;
    return Ticket.priority === filter;
  });

  const getFilterCount = (type: string) => {
    if (type === "all") return allTickets.length;
    return allTickets.filter((t) => t.priority === type).length;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col">
          <DashboardHeader />

          {/* ✅ Pass required props */}
          <SubBar
            filter={filter}
            setFilter={setFilter}
            getFilterCount={getFilterCount}
          />

          <div className="flex-1 flex">
            {/* Tickets Panel */}
            <div className="w-80 border-r bg-background">
              <div className="p-2">
                {/* ✅ Pass required props */}
                <TicketList
                  tickets={filteredTickets}
                  onTicketSelect={(ticket) => setSelectedTicket(ticket)}
                  selectedTicketId={selectedTicket?.id}
                />
              </div>
            </div>

            {/* Chat Interface */}
            <div className="flex-1">
              {selectedTicket ? (
                <ChatInterface ticket={selectedTicket} />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      Select a ticket
                    </h3>
                    <p className="text-sm">
                      Choose a ticket from the list to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
