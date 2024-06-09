import { useState } from "react";
import "../Styles/Login.css";
import BasicTextFields from "./LoginInputs";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleRegisterOrLogin = () => {
    setIsRegister((prev) => !prev);
  };

  return (
    <div className="Login">
      <h1>{isRegister ? "Sign-up" : "Login"}</h1>
      <p id="err">Error Msg</p>

      <div className="inputs-container">
        <BasicTextFields />
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
