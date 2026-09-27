export interface UpcomingPayment {
    id: string;
    project: string;
    installment: string;
    amount: string;
    dueDate: string;
    daysLeft: number;
    daysLeftText: string;
  }
  
  export const upcomingPaymentsList: UpcomingPayment[] = [
    {
      id: "1",
      project: "Company Website Redesign",
      installment: "Installment 2 of 4",
      amount: "EGP 10,000.00",
      dueDate: "May 30, 2026",
      daysLeft: 2,
      daysLeftText: "2 days",
    },
    {
      id: "2",
      project: "Company Website Redesign",
      installment: "Installment 2 of 4",
      amount: "EGP 10,000.00",
      dueDate: "May 30, 2026",
      daysLeft: 10,
      daysLeftText: "10 days",
    },
    {
      id: "3",
      project: "Company Website Redesign",
      installment: "Installment 2 of 4",
      amount: "EGP 10,000.00",
      dueDate: "May 30, 2026",
      daysLeft: 20,
      daysLeftText: "20 days",
    },
  ];