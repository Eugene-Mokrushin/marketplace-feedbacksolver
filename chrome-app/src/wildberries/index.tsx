import "../styles/wildberries.css";
import wbLogo from "../assets/wbLogo.png";
import Main from "./Main";
import Signin from "./Signin";
import Signup from "./Signup";
import { useEffect, useRef } from "react";

const Wildberries = () => {
  const elementsRef = useRef<HTMLDivElement>(null);

  const signup = () => {
    if (elementsRef.current) {
      elementsRef.current.style.transform = "translate(-100%, -100%)";
    }
  };

  const goBackToLogin = () => {
    if (elementsRef.current) {
      elementsRef.current.style.transform = "translate(-100%, 0%)";
    }
  };

  const signedup = () => {
    if (elementsRef.current) {
      elementsRef.current.style.transform = "translate(0%, 0%)";
    }
  };
  const login = () => {
    if (elementsRef.current) {
      elementsRef.current.style.transform = "translateX(-100%)";
    }
  };

  const loggedin = () => {
    if (elementsRef.current) {
      elementsRef.current.style.transform = "translateX(0%)";
    }
  };

  useEffect(() => {
    if (elementsRef.current) {
      elementsRef.current.style.transform = "translateX(-100%)";
    }
  }, []);

  return (
    <div className="wildberries">
      <div className="ribbon">
        <div className="title">WB Feedback Solver</div>
        <img
          src={
            chrome.runtime ? chrome.runtime.getURL("assets/wbLogo.png") : wbLogo
          }
          alt="Wildberries Logo"
        />
      </div>
      <div className="elements" ref={elementsRef}>
        <div className="main">
          <Main toLogin={login} />
        </div>
        <div className="authenticate">
          <div className="authenticateSignIn">
            <Signin toLoggedin={loggedin} toSignup={signup} />
          </div>
          <div className="authenticateSignUp">
            <Signup toSignedup={signedup} goBackToLogin={goBackToLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wildberries;
