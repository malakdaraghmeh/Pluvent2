export type Payment = {
    id: number;
    label: string;
    amount: string;
    status: "due" | "upcoming";
    days: number;
  };
  
  export const paymentsData: Payment[] = [
    {
      id: 1,
      label: "Final Payment",
      amount: "$2,000",
      status: "due",
      days: 1,
    },
    {
      id: 2,
      label: "Final Payment",
      amount: "$2,000",
      status: "upcoming",
      days: 20,
    },
    {
      id: 3,
      label: "Final Payment",
      amount: "$2,000",
      status: "upcoming",
      days:20,
    },
  ];