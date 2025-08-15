// src/types/ticket.ts
export type TicketStatus =
  | "urgent"
  | "warning"
  | "info"
  | "escalated"
  | "paid"
  | "dispute";

export interface Ticket {
  id: string;
  agent: string;
  vendor: string;
  status: TicketStatus;
  ticketId: string;
  tradeLink: string,
  date: string;
  openedAgo: string;
  priority: "urgent" | "warning" | "info";
}
