export type Project = {
    id: number;
    title: string;
    status: "In Progress" | "Completed";
    progress: number;
    description: string;
    dateLabel: "Due" | "Expired";
    dueDate: string;
    paidAmount: string;
    totalAmount: string;
    statusLabel: "Project Status" | "Warranty";
    warranty: "Active" | "Valid" | "On Hold" | "Suspended";
  };
  
  
  export const projectsData: Project[] = [
    {
      id: 1,
      title: "XYZ Mobile App",
      status: "In Progress",
      progress: 63,
      description:
        "Mobile Development, Create and Implement a comprehensive design system for the product to",
      dateLabel: "Due",
      dueDate: "Jan 15, 2026",
      paidAmount: "$12,000",
      totalAmount: "$28,000",
       statusLabel: "Project Status",
      warranty: "Active",
    },
    {
      id: 2,
      title: "XYZ Mobile App",
      status: "In Progress",
      progress: 63,
      description:
        "Mobile Development, Create and Implement a comprehensive design system for the product to",
      dateLabel: "Due",
      dueDate: "Jan 15, 2026",
      paidAmount: "$12,000",
      totalAmount: "$28,000",
      statusLabel: "Project Status",
      warranty: "On Hold",
    },
    {
      id: 3,
      title: "XYZ Mobile App",
      status: "Completed",
      progress: 63,
      description:
        "Mobile Development, Create and Implement a comprehensive design system for the product to",
      dateLabel: "Expired",
      dueDate: "Jan 15, 2026",
      paidAmount: "$28,000",
      totalAmount: "$28,000",
      statusLabel: "Warranty",
      warranty: "Valid",
    },
    {
        id: 4,
        title: "XYZ Mobile App",
        status: "Completed",
        progress: 63,
        description:
          "Mobile Development, Create and Implement a comprehensive design system for the product to",
        dateLabel: "Expired",
        dueDate: "Jan 15, 2026",
        paidAmount: "$28,000",
        totalAmount: "$28,000",
        statusLabel: "Warranty",
        warranty: "Suspended",
      },
  ];