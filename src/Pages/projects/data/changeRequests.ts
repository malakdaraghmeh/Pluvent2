export type ChangeRequestStatus =
  | "InReview"
  | "Waiting User Input"
  | "Pending Payment"
  | "Inprogress"
  | "Completed";

export type ChangeRequest = {
  id: string;
  title: string;
  addBy: string;
  status: ChangeRequestStatus;
  startDate: string;
  dueDate: string;
};

export const changeRequestsData: ChangeRequest[] = [
  {
    id: "CR-001",
    title: "Company Website Redesign",
    addBy: "Maryam Hosam",
    status: "InReview",
    startDate: "May 30, 2026",
    dueDate: "Jan 3, 2026",
  },
  {
    id: "CR-002",
    title: "Company Website Redesign",
    addBy: "Maryam Hosam",
    status: "Waiting User Input",
    startDate: "May 30, 2026",
    dueDate: "Jan 3, 2026",
  },
  {
    id: "CR-003",
    title: "Company Website Redesign",
    addBy: "Maryam Hosam",
    status: "Pending Payment",
    startDate: "May 30, 2026",
    dueDate: "Jan 3, 2026",
  },
  {
    id: "CR-004",
    title: "Company Website Redesign",
    addBy: "Maryam Hosam",
    status: "Pending Payment",
    startDate: "May 30, 2026",
    dueDate: "Jan 3, 2026",
  },
  {
    id: "CR-005",
    title: "Company Website Redesign",
    addBy: "Maryam Hosam",
    status: "Inprogress",
    startDate: "May 30, 2026",
    dueDate: "Jan 3, 2026",
  },
  {
    id: "CR-006",
    title: "Company Website Redesign",
    addBy: "Maryam Hosam",
    status: "Pending Payment",
    startDate: "May 30, 2026",
    dueDate: "Jan 3, 2026",
  },
  {
    id: "CR-007",
    title: "Company Website Redesign",
    addBy: "Maryam Hosam",
    status: "Completed",
    startDate: "May 30, 2026",
    dueDate: "Jan 3, 2026",
  },
];