import { toast } from "sonner";

export const ShowToastSuccess = (message: string) => {
  toast(message, {
    id: message,
    style: {
      background: "#C8952A",
      color: "#fff",
      border: "1px solid transparent"
    },
  });
};

export const ShowToastInfo = (message: string) => {
  toast(message, {
    id: message,
    style: {
      background: "#fff",
      color: "#C8952A",
      border: "1px solid transparent"
    },
  });
};

export const ShowToastError = (message: string) => {
  toast(message, {
    id: message,
    style: {
      background: "#D14343",
      color: "white",
      whiteSpace: "pre-line",
      border: "1px solid transparent"
    },
  });
};
