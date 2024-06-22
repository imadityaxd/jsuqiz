import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { QuizForm } from "./pages/QuizForm";
import Navbar from "./components/Navbar";
import PlayQuiz from "./pages/PlayQuiz";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizform" element={<QuizForm />} />
          <Route path="/playquiz" element={<PlayQuiz />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
