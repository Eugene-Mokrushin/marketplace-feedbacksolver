import "../styles/signin.css";
import arrowBack from "../assets/arrowBack.svg";
import google from "../assets/google.svg";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import eyeClosed from "../assets/eyeClosed.svg";
import eyeOpened from "../assets/eyeOpen.svg";
import { UserAuth } from "../context/AuthContext";

interface SigninProps {
  toLoggedin: () => void;
  toSignup: () => void;
}

const Signin = ({ toLoggedin, toSignup }: SigninProps) => {
  const { signIn } = UserAuth();
  const [passwordHidden, setPasswordHidden] = useState(true);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailWarnRef = useRef<HTMLDivElement>(null);
  const wrongCredentialsRef = useRef<HTMLDivElement>(null);

  const handleShowPasswords = () => {
    setPasswordHidden((prev) => !prev);
  };

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      emailWarnRef.current &&
      emailRef.current &&
      wrongCredentialsRef.current
    ) {
      wrongCredentialsRef.current.style.display = "none";
      if (validateEmail(e.target.value)) {
        emailWarnRef.current.style.display = "none";
        emailRef.current.style.borderColor = "#522158";
      } else {
        emailWarnRef.current.style.display = "block";
        emailRef.current.style.borderColor = "#eb6363";
      }
    }
  };

  const dropStyles = () => {
    if (
      emailWarnRef.current &&
      wrongCredentialsRef.current &&
      emailRef.current &&
      passwordRef.current
    ) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      emailWarnRef.current.style.display = "none";
      emailRef.current.style.borderColor = "#522158";
      wrongCredentialsRef.current.style.display = "none";
    }
  };

  const handleCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (passwordRef.current && wrongCredentialsRef.current) {
      wrongCredentialsRef.current.style.display = "none";
      if (e.target.value !== "") {
        passwordRef.current.style.borderColor = "#522158";
      } else {
        passwordRef.current.style.borderColor = "#eb6363";
      }
    }
  };

  const handleSignIn = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (
      emailRef.current &&
      passwordRef.current &&
      wrongCredentialsRef.current &&
      emailWarnRef.current
    ) {
      if (!validateEmail(emailRef.current.value)) {
        emailWarnRef.current.style.display = "block";
        emailRef.current.style.borderColor = "#eb6363";
        return;
      }

      if (passwordRef.current.value === "") {
        passwordRef.current.style.borderColor = "#eb6363";
        return;
      }

      try {
        await signIn(emailRef.current.value, passwordRef.current.value);
        toLoggedin();
        setTimeout(() => {
          dropStyles();
        }, 300);
      } catch (error) {
        wrongCredentialsRef.current.style.display = "block";
        emailRef.current.style.borderColor = "#eb6363";
        passwordRef.current.style.borderColor = "#eb6363";
      }
    }
  };

  return (
    <div className="signin">
      <div className="head">
        <div
          className="goBack"
          onClick={() => {
            toLoggedin();
            dropStyles();
          }}
        >
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
        <div className="signInEmailInput">
          <div className="wrongCredentials" ref={wrongCredentialsRef}>
            Email or password is wrong
          </div>
          <div className="realEmail" ref={emailWarnRef}>
            Enter a valid email
          </div>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            ref={emailRef}
            required={true}
            onChange={(e) => handleEmailInput(e)}
          />
        </div>
        <div className="signInPasswordInput">
          <input
            type={passwordHidden ? "password" : "text"}
            placeholder="Password"
            autoComplete="current-password"
            ref={passwordRef}
            required={true}
            onChange={(e) => handleCheckPassword(e)}
          />
          {passwordHidden ? (
            <img
              src={
                chrome.runtime
                  ? chrome.runtime.getURL("../assets/eyeClosed.svg")
                  : eyeClosed
              }
              alt="Show passwords"
              onClick={() => handleShowPasswords()}
            />
          ) : (
            <img
              src={
                chrome.runtime
                  ? chrome.runtime.getURL("../assets/eyeOpen.svg")
                  : eyeOpened
              }
              alt="Hide passwords"
              onClick={() => handleShowPasswords()}
            />
          )}
        </div>
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
      <div
        className="noAccount"
        onClick={() => {
          toSignup();
          dropStyles();
        }}
      >
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
