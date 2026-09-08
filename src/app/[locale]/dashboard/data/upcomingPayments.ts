export type UpcomingPayment = {
    id: number;
    projectName: string;
    amount: string;
    dueText: string;
    dueType: "danger" | "warning";
  };
  
  export const upcomingPayments: UpcomingPayment[] = [
    {
      id: 1,
      projectName: "ABC Website Redesign",
      amount: "$2,000",
      dueText: "Due in 1 days",
      dueType: "danger",
    },
    {
      id: 2,
      projectName: "ABC Website Redesign",
      amount: "$2,000",
      dueText: "Due in 15 days",
      dueType: "warning",
    },
  ];