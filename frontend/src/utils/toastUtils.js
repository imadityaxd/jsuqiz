

import { toast } from "react-hot-toast";


export const showToast = (message, type) => {
  toast.remove(); 
  toast[type](message, {
    duration: 3000,
    style: {
      border: type === "success" ? "2px solid #4CAF50" : "2px solid #F44336",
      background: type === "success" ? "#dff0d8" : "#f2dede",
      color: type === "success" ? "#3c763d" : "#a94442",
      borderRadius: "8px",
      padding: "12px 20px",
      fontSize: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    icon: type === "success" ? "👍" : "❌",
    iconTheme: {
      primary: type === "success" ? "#4CAF50" : "#F44336",
      secondary: "#FFFFFF",
    },
  });
};
