import "../styles/signin.css";
import arrowBack from "../assets/arrowBack.svg";
import google from "../assets/google.svg";
import { MouseEvent, useRef } from "react";

interface SigninProps {
  toLoggedin: () => void;
  toSignup: () => void;
}

const Signin = ({ toLoggedin, toSignup }: SigninProps) => {

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSignIn = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <div className="signin">
      <div className="head">
        <div className="goBack" onClick={() => toLoggedin()}>
          <img
            src={
              chrome.runtime
                ? chrome.runtime.getURL("assets/arrowBack.svg")
                : arrowBack
            }
            alt="Go back"
          />
        </div>
        <div className="signinTitle">Sign in</div>
      </div>
      <form className="signinForm">
        <input type="email" placeholder="Email" required={true} />
        <input type="password" placeholder="Password" required={true} />
        <div className="signinMethods">
          <div className="viaGoogle">
            <img
              src={
                chrome.runtime
                  ? chrome.runtime.getURL("assets/google.svg")
                  : google
              }
              alt="Sign in with Google"
            />
            <span className="text">Via Google</span>
          </div>
          <button className="signinBtn" onClick={(e) => handleSignIn(e)}>
            Sign in
          </button>
        </div>
      </form>
      <div className="noAccount" onClick={() => toSignup()}>
        Don’t have an account? Sign up
      </div>
    </div>
  );
};

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default Signin;
