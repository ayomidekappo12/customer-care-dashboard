// src/types/ticket.ts
export type TicketStatus =
  | "urgent"
  | "warning"
  | "info"
  | "escalated"
  | "paid"
  | "dispute";

export interface TimelineEntry {
  event: string;
  time: string;
  status: string;
}

export interface Ticket {
  id: string;
  agent: string;
  vendor: string;
  status: TicketStatus;
  ticketId: string;
  tradeLink: string;
  platform?: string;
  amount?: string;
  messages?: number;
  timeline: TimelineEntry[]; // <-- updated
  date: string;
  openedAgo?: string;
  priority: "urgent" | "warning" | "info";
}