
export type ChangeRequestPayment = {
    id: number;
    title: string;
    amount: string;
  };
  
  export const changeRequestPaymentsData: ChangeRequestPayment[] = [
    {
      id: 1,
      title: "First Payment",
      amount: "$2,000",
    },
    {
      id: 2,
      title: "Second Payment",
      amount: "$2,000",
    },
    {
      id: 3,
      title: "Third Payment",
      amount: "$2,000",
    },
    {
      id: 4,
      title: "CR Payment",
      amount: "$2,000",
    },
    {
      id: 5,
      title: "Final Payment",
      amount: "$2,000",
    },
  ];