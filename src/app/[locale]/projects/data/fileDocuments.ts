export type FileDocument = {
    id: number;
    fileName: string;
    uploadedBy: string;
    size: string;
    date: string;
    type: "pulvent" | "document";
  };
  
  export const fileDocumentsData: FileDocument[] = [
    {
      id: 1,
      fileName: "Project Proposal.pdf",
      uploadedBy: "Pulvent",
      size: "1.2 MB",
      date: "Jan 15, 2025",
      type: "pulvent",
    },
    {
      id: 2,
      fileName: "Project Proposal.pdf",
      uploadedBy: "Amr Zayed",
      size: "1.2 MB",
      date: "Jan 15, 2025",
      type: "document",
    },
    {
      id: 3,
      fileName: "Project Proposal.pdf",
      uploadedBy: "Pulvent",
      size: "1.2 MB",
      date: "Jan 15, 2025",
      type: "pulvent",
    },
    {
      id: 4,
      fileName: "Project Proposal.pdf",
      uploadedBy: "Amr Zayed",
      size: "1.2 MB",
      date: "Jan 15, 2025",
      type: "document",
    },
  ];