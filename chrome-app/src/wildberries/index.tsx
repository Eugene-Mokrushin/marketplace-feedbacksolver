import "../styles/wildberries.css";
import wbLogo from "../assets/wbLogo.png";
import Main from "./Main";
import Signin from "./Signin";
import Signup from "./Signup";
import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Account from "./Account";

interface WildberriesProps {
  handleDrawer: (state: boolean | null) => void;
}

const Wildberries = ({ handleDrawer }: WildberriesProps) => {
  const elementsRef = useRef<HTMLDivElement>(null);
  const [action, setAction] = useState("unsigned");
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      setAction("signed");
    } else {
      setAction("unsigned");
    }
  }, [user]);

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
    handleDrawer(false);
  };
  const toAccount = () => {
    if (elementsRef.current) {
      elementsRef.current.style.transform = "translateX(-100%)";
    }
    handleDrawer(null);
  };

  const loggedin = () => {
    if (elementsRef.current) {
      elementsRef.current.style.transform = "translateX(0%)";
    }
    handleDrawer(false);
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
        <div className="main">
          <Main toAccount={toAccount} />
        </div>
        {action === "unsigned" && (
          <div className="authenticate">
            <div className="authenticateSignIn">
              <Signin toLoggedin={loggedin} toSignup={signup} />
            </div>
            <div className="authenticateSignUp">
              <Signup toSignedup={signedup} goBackToLogin={goBackToLogin} />
            </div>
          </div>
        )}
        {action === "signed" && (
          <div className="signed">
            <div className="signedAccount">
              <Account signedup={signedup} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wildberries;
