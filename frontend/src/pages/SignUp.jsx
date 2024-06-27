import AuthForm from "../components/AuthForm";

export default function SignUp() {
  return (
    <div className="text-white h-[100vh] flex items-center justify-center bg-cover" style={{backgroundImage:"url('../src/assets/authbg.png')"}}>
      <AuthForm formName="Signup" goTo="/login" navigate="Login" />
    </div>
  );
}
