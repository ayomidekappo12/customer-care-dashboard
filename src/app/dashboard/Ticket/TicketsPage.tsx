"use client";

import { useState } from "react";
import { SubBar } from "@/app/dashboard/SubBar";
import { TicketList } from "./TicketList";
import type { Ticket } from "@/types/ticket"; // Adjust path if needed

const allTickets: Ticket[] = [
  {
    id: "PaxfulAgent001",
    platform: "Paxful",
    amount: "₦1,850,000",
    status: "urgent",
    messages: 5,
    priority: "urgent",
    agent: "John Doe",
    vendor: "Vendor X",
    ticketId: "TCK-1001",
    tradeLink: "https://example.com/trade/1001",
    date: "2025-08-15",
    timeline: [
      { event: "Order created", time: "", status: "pending" },
      { event: "Payment received", time: "", status: "pending" },
      { event: "Trade in progress", time: "", status: "pending" },
      { event: "Awaiting confirmation", time: "", status: "pending" },
    ],
  },
  {
    id: "SpeedyPay",
    platform: "Paxful",
    amount: "₦750,000",
    status: "warning",
    messages: 5,
    priority: "warning",
    agent: "Jane Smith",
    vendor: "Vendor Y",
    ticketId: "TCK-1002",
    tradeLink: "https://example.com/trade/1002",
    date: "2025-08-14",
    timeline: [
      { event: "Order created", time: "", status: "Awaiting payment" },
    ],
  },
  {
    id: "CryptoExchange",
    platform: "CryptoEx",
    amount: "₦2,500,000",
    status: "info",
    messages: 3,
    priority: "info",
    agent: "Alex Johnson",
    vendor: "Vendor Z",
    ticketId: "TCK-1003",
    tradeLink: "https://example.com/trade/1003",
    date: "2025-08-13",
    timeline: [{ event: "Order created", time: "", status: "Trade completed" }],
  },
  {
    id: "QuickTrade",
    platform: "QuickTrade",
    amount: "₦920,000",
    status: "warning",
    messages: 1,
    priority: "warning",
    agent: "Maria Lopez",
    vendor: "Vendor W",
    ticketId: "TCK-1004",
    tradeLink: "https://example.com/trade/1004",
    date: "2025-08-12",
    timeline: [{ event: "Order created", time: "", status: "Trade completed" }],
  },
  {
    id: "PaxfulAgent001",
    platform: "Paxful",
    amount: "₦3,200,000",
    status: "urgent",
    messages: 8,
    priority: "urgent",
    agent: "John Doe",
    vendor: "Vendor X",
    ticketId: "TCK-1005",
    tradeLink: "https://example.com/trade/1005",
    date: "2025-08-11",
    timeline: [{ event: "Order created", time: "", status: "received" }],
  },
  {
    id: "Binance",
    platform: "Binance",
    amount: "₦5,850,000",
    status: "urgent",
    messages: 6,
    priority: "urgent",
    agent: "Chris Evans",
    vendor: "Vendor B",
    ticketId: "TCK-1006",
    tradeLink: "https://example.com/trade/1006",
    date: "2025-08-10",
    timeline: [{ event: "Order created", time: "", status: "Cancelled" }],
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
