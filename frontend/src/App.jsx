import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { QuizForm } from "./pages/QuizForm";
import Navbar from "./components/Navbar";
import PlayQuiz from "./pages/PlayQuiz";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectiveRoutes from "./utils/ProtectiveRoutes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizform" element={<QuizForm />} />
          <Route path="/playquiz" element={<PlayQuiz />} />
          <Route
            path="/signup"
            element={
              <ProtectiveRoutes>
                <SignUp />
              </ProtectiveRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectiveRoutes>
                <Login />
              </ProtectiveRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectiveRoutes>
                <AdminDashboard />
              </ProtectiveRoutes>
            }
          />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
