"use client";

import { useState } from "react";
import { SubBar } from "./SubBar";
import { TicketList } from "./TicketList";

// Import the Ticket type if not already imported
// import type { Ticket } from "./TicketList";

const allTickets: {
  id: string;
  platform: string;
  amount: string;
  status: string;
  messages: number;
  priority: "urgent" | "warning" | "info";
}[] = [
  {
    id: "PaxfulAgent001",
    platform: "Paxful",
    amount: "₦1,850,000",
    status: "urgent",
    messages: 5,
    priority: "urgent",
  },
  {
    id: "SpeedyPay",
    platform: "Paxful",
    amount: "₦750,000",
    status: "warning",
    messages: 5,
    priority: "warning",
  },
  {
    id: "CryptoExchange",
    platform: "CryptoEx",
    amount: "₦2,500,000",
    status: "info",
    messages: 3,
    priority: "info",
  },
  {
    id: "QuickTrade",
    platform: "QuickTrade",
    amount: "₦920,000",
    status: "warning",
    messages: 1,
    priority: "warning",
  },
  {
    id: "PaxfulAgent001",
    platform: "Paxful",
    amount: "₦3,200,000",
    status: "urgent",
    messages: 8,
    priority: "urgent",
  },
  {
    id: "Binance",
    platform: "Binance",
    amount: "₦5,850,000",
    status: "urgent",
    messages: 6,
    priority: "urgent",
  },
];

export default function TicketsPage() {
  const [filter, setFilter] = useState<"all" | "urgent" | "warning" | "info">(
    "all"
  );
  const [selectedTicketId, setSelectedTicketId] = useState<string>();

  const filteredTickets = allTickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.priority === filter;
  });

  const getFilterCount = (type: string) => {
    if (type === "all") return allTickets.length;
    return allTickets.filter((t) => t.priority === type).length;
  };

  return (
    <div className="flex flex-col gap-4">
      <SubBar
        filter={filter}
        setFilter={setFilter}
        getFilterCount={getFilterCount}
      />
      <TicketList
        tickets={filteredTickets}
        onTicketSelect={(ticket) => setSelectedTicketId(ticket.id)}
        selectedTicketId={selectedTicketId}
      />
    </div>
  );
}
