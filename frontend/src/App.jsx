import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { QuizForm } from "./pages/QuizForm";
import Navbar from "./components/Navbar";
import PlayQuiz from "./pages/PlayQuiz";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizform" element={<QuizForm />} />
          <Route path="/playquiz" element={<PlayQuiz />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
