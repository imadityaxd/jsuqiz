import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";
import { QuizForm } from "./pages/QuizForm";
import { Navbar } from "./components/navbar";
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/quizform" element = {<QuizForm/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App
