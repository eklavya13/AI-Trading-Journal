import React, { useState } from "react";
import { Router } from "react-router-dom";

function Login() {
  return (
    <section className="login-page">

      <div className="login-card">

        <h2 className="login-title">Welcome Back</h2>
        <h3  className="login-subtitle">Sign-in to your account</h3>

        <form>

          <input
          className="e1"
            type="email"
            placeholder="Email"
          />

          <input
          className="e1"
            type="password"
            placeholder="Password"
          />

          <button className="bn">
            Login
          </button>

          <p className="para"> New here? <span>Sign-up</span></p>

        </form>

      </div>

    </section>
  );
}
export default Login;