import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <App />
      </CookiesProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            icon: "🎉", // Custom success icon
            duration: 3000,
            style: {
              border: "2px solid #4CAF50",
              background: "#dff0d8",
              color: "#3c763d",
              borderRadius: "8px",
              padding: "12px 20px",
              fontSize: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
          },
          error: {
            icon: "⚠️", // Custom error icon
            duration: 3000,
            style: {
              border: "2px solid #F44336",
              background: "#f2dede",
              color: "#a94442",
              borderRadius: "8px",
              padding: "12px 20px",
              fontSize: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
          },
        }}
      />
    </AuthProvider>
  </>
);
