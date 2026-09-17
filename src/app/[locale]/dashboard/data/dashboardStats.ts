export type DashboardStat = {
    id: number;
    title: string;
    value: string;
    description: string;
    descriptionHighlight?: string;
    descriptionHighlightColor?: string;
    icon: "projects" | "paid" | "upcoming" | "absent";
    borderColor: string;
    iconBg: string;
    iconColor: string;
    iconBorderColor: string;
    descriptionColor: string;
  };
  
  export const dashboardStats: DashboardStat[] = [
    {
      id: 1,
      title: "Total Projects",
      value: "4",
      description: "2 Active · 2 Complete",
      icon: "projects",
      borderColor:
        "border-[#3634C7] border-t-[0.5px] border-r-[0.5px] border-b-[0.5px] border-l-[1.5px]",
      iconBg: "bg-[#F4F3FF]",
      iconColor: "text-[#6262F6]",
      iconBorderColor: "border-[#3634C7]",
      descriptionColor: "text-[#64748B]",
    },
  
    {
      id: 2,
      title: "Total Paid",
      value: "EGP 100,000",
      description: "of $150,000",
      icon: "paid",
      borderColor:
        "border-[#39E1D7] border-t-[0.5px] border-r-[0.5px] border-b-[0.5px] border-l-[1.5px]",
      iconBg: "bg-[#E9FBFB]",
      iconColor: "text-[#27BDBD]",
      iconBorderColor: "border-[#39E1D7]",
      descriptionColor: "text-gray-400",
    },
  
    {
      id: 3,
      title: "Upcoming Payment",
      value: "EGP 50,000",
  
      description: "For Puller Project",
  
      descriptionHighlight: "Due in 15 days",
      descriptionHighlightColor: "text-[#3634C7]",
  
      icon: "upcoming",
      borderColor:
        "border-[#FF9500] border-t-[0.5px] border-r-[0.5px] border-b-[0.5px] border-l-[1.5px]",
      iconBg: "bg-[#FFF6E8]",
      iconColor: "text-[#F5A623]",
      iconBorderColor: "border-[#FF9500]",
      descriptionColor: "text-[#64748B]",
    },
  
    {
      id: 4,
      title: "Absent Payment",
      value: "1",
      description: "1 payment · 1 review",
      icon: "absent",
      borderColor:
        "border-[#FF3B30] border-t-[0.5px] border-r-[0.5px] border-b-[0.5px] border-l-[1.5px]",
      iconBg: "bg-[#FFF0F0]",
      iconColor: "text-[#FF5B5B]",
      iconBorderColor: "border-[#FF3B30]",
      descriptionColor: "text-[#64748B]",
    },
  ];