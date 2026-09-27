export type UpcomingPayment = {
  id: number;
  projectName: string;
  amount: string;
  dueDays: number;
  dueType: "danger" | "warning";
};

export const upcomingPayments: UpcomingPayment[] = [
  {
    id: 1,
    projectName: "ABC Website Redesign",
    amount: "$2,000",
    dueDays: 1,
    dueType: "danger",
  },
  {
    id: 2,
    projectName: "ABC Website Redesign",
    amount: "$2,000",
    dueDays: 15,
    dueType: "warning",
  },
];