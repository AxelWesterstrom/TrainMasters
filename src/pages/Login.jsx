import Header from "../components/Header";
import React from "react";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <>
      <div className="login-body">
        <div className="header">
          <Header />
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;
