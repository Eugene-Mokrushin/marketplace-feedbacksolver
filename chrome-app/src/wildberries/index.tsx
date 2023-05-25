import "../styles/wildberries.css";
import wbLogo from "../assets/wbLogo.png";
import Main from "./Main";
import Signin from "./Signin";
import { useRef } from "react";
import Signup from "./Signup";

const Wildberries = () => {
  const elementsRef = useRef<HTMLDivElement>(null);

  const signup = () => {
    if (elementsRef.current) {
      elementsRef.current.style.transform = "translate(-100%, -100%)";
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
        {/* <Main toLogin={login} /> */}
        <Signin toLoggedin={loggedin} toSignup={signup} />
        {/* <Signup toSignedup={signedup} /> */}
      </div>
    </div>
  );
};

export default Wildberries;
