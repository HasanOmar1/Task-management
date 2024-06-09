import { useState } from "react";
import "../Styles/Login.css";
import LoginInputs from "./LoginInputs";
import RegisterInputs from "./RegisterInputs";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleRegisterOrLogin = () => {
    setIsRegister((prev) => !prev);
  };

  return (
    <div className="Login">
      <h1>{isRegister ? "Sign-up" : "Login"}</h1>

      <div className="inputs-container">
        {isRegister ? <RegisterInputs /> : <LoginInputs />}
      </div>

      <p id="reg-login">
        {isRegister ? "Already have an account?" : "Not a member?"}
        <span id="register-span" onClick={handleRegisterOrLogin}>
          {isRegister ? "Login" : "Sign-up"}
        </span>
      </p>
    </div>
  );
};

export default Login;
