import AuthForm from "../components/AuthForm";
import authbg from "../assets/authbg.png"
export default function Login() {
  return (
    <div className="text-white h-[100vh] flex items-center justify-center bg-cover" style={{backgroundImage:`url(${authbg})`}}>
    <AuthForm formName="Login" goTo="/signup" navigate="Signup" api="login" />
  </div>
  )
}
