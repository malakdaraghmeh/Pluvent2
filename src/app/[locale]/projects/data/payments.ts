export type Payment = {
    id: number;
    label: string;
    amount: string;
    status: "due" | "upcoming";
    days: string;
  };
  
  export const paymentsData: Payment[] = [
    {
      id: 1,
      label: "Final Payment",
      amount: "$2,000",
      status: "due",
      days: "Due in 1 days",
    },
    {
      id: 2,
      label: "Final Payment",
      amount: "$2,000",
      status: "upcoming",
      days: "After 20 days",
    },
    {
      id: 3,
      label: "Final Payment",
      amount: "$2,000",
      status: "upcoming",
      days: "After 20 days",
    },
  ];