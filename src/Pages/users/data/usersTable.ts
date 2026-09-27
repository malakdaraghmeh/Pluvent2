export interface UserTableItem {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Employee";
    status: "Active" | "Disable";
  }
  
  export const usersTableData: UserTableItem[] = [
    {
      id: "1",
      name: "Ahmed Hosam",
      email: "Ahmed Hosam@gmail.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: "2",
      name: "Ahmed Hosam",
      email: "Ahmed Hosam@gmail.com",
      role: "Employee",
      status: "Disable",
    },
    {
      id: "3",
      name: "Ahmed Hosam",
      email: "Ahmed Hosam@gmail.com",
      role: "Employee",
      status: "Active",
    },
    {
      id: "4",
      name: "Ahmed Hosam",
      email: "Ahmed Hosam@gmail.com",
      role: "Employee",
      status: "Disable",
    },
    {
      id: "5",
      name: "Ahmed Hosam",
      email: "Ahmed Hosam@gmail.com",
      role: "Employee",
      status: "Active",
    },
    {
      id: "6",
      name: "Ahmed Hosam",
      email: "Ahmed Hosam@gmail.com",
      role: "Employee",
      status: "Disable",
    },
  ];