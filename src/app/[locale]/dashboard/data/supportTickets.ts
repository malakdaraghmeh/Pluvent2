export type SupportTicket = {
    id: number;
    ticketNumber: string;
    title: string;
    status: "In Progress" | "In Review";
  };
  
  export const supportTickets: SupportTicket[] = [
    {
      id: 1,
      ticketNumber: "TKT-0042",
      title: "Logo file format not ...",
      status: "In Progress",
    },
    {
      id: 2,
      ticketNumber: "TKT-0041",
      title: "Login issue on stage...",
      status: "In Review",
    },
  ];