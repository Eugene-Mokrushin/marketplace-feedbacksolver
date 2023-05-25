import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import "../styles/signin.css";
import arrowBack from "../assets/arrowBack.svg";
import google from "../assets/google.svg";

interface SigninProps {
  toLoggedin: () => void;
  toSignup: () => void;
}

const Signin = ({ toLoggedin, toSignup }: SigninProps) => {
  return (
    <div className="signin">
      <div className="head">
        <div className="goBack">
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
          <button className="signinBtn">Sign in</button>
        </div>
      </form>
      <div className="noAccount">Don’t have an account? Sign up</div>
    </div>
  );
};

export default Signin;
