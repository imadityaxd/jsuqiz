import { NavLink } from "react-router-dom";
import "./navbar.css";
export const Navbar = ()=>{
    return(
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">Web Developers</NavLink>
                    </div>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/quizform">QuizForm</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
};