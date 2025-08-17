"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/app/dashboard/SidebarNav";
import { DashboardHeader } from "@/app/dashboard/Ticket/TopBar";
import { SubBar } from "@/app/dashboard/SubBar";
import { TicketList } from "@/app/dashboard/Ticket/TicketList";
import { ChatInterface, TradeDetailsContent } from "@/app/dashboard/ChatPanel";
import { Ticket } from "@/types/ticket";
import { useMediaQuery } from "@/lib/useMediaQuery";

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
    timeline: [
      { event: "Trade Created", time: "May 12, 9:00 AM", status: "completed" },
      { event: "Payment Sent", time: "May 12, 9:15 AM", status: "completed" },
      {
        event: "Payment Confirmed",
        time: "May 12, 9:30 AM",
        status: "completed",
      },
      {
        event: "Trade Completed",
        time: "May 12, 10:00 AM",
        status: "completed",
      },
    ],
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
    timeline: [
      { event: "Trade Created", time: "May 12, 10:00 AM", status: "completed" },
    ],
  },
];

const Index = () => {
  const [filter, setFilter] = useState<"all" | "urgent" | "warning" | "info">(
    "all"
  );
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [openTradeDetails, setOpenTradeDetails] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const filteredTickets = allTickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.priority === filter;
  });

  const getFilterCount = (type: string) => {
    if (type === "all") return allTickets.length;
    return allTickets.filter((t) => t.priority === type).length;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Area */}
        <div className="flex-1 flex flex-col">
          <DashboardHeader />

          <SubBar
            filter={filter}
            setFilter={setFilter}
            getFilterCount={getFilterCount}
          />

          {/* Tickets + Chat + Dock */}
          <div className="flex flex-1">
            {/* Tickets Panel */}
            <div className="w-80 border-r bg-background">
              <div className="p-2">
                <TicketList
                  tickets={filteredTickets}
                  onTicketSelect={(ticket) => setSelectedTicket(ticket)}
                  selectedTicketId={selectedTicket?.id}
                />
              </div>
            </div>

            {/* Chat & Dock Wrapper */}
            <div className="flex flex-1">
              {/* Chat Area */}
              <div
                className={`flex-1 ${
                  isDesktop && openTradeDetails
                    ? "lg:w-[calc(100%-300px)]"
                    : "w-full"
                }`}
              >
                {selectedTicket ? (
                  <ChatInterface
                    ticket={selectedTicket}
                    openTradeDetails={openTradeDetails}
                    setOpenTradeDetails={setOpenTradeDetails}
                    isDesktop={isDesktop}
                  />
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

              {/* Docked Trade Details (Desktop only) */}
              {isDesktop && openTradeDetails && selectedTicket && (
                <div className="w-[200px] border-l bg-white shadow-md flex flex-col items-start p-4 overflow-y-auto">
                  <TradeDetailsContent ticket={selectedTicket} />
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
