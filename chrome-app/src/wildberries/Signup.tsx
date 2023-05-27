import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  useRef,
  useState,
} from "react";
import arrowBack from "../assets/arrowBack.svg";
import google from "../assets/google.svg";
import eyeClosed from "../assets/eyeClosed.svg";
import eyeOpened from "../assets/eyeOpen.svg";
import infoWarn from "../assets/info.svg";
import { UserAuth } from "../context/AuthContext";
import "../styles/signup.css";

interface SignupProps {
  toSignedup: () => void;
  goBackToLogin: () => void;
}

const Signup = ({ toSignedup, goBackToLogin }: SignupProps) => {
  const [sentEmail, setSentEmail] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const passwordsMatchRef = useRef<HTMLDivElement>(null);
  const emailCorrectRef = useRef<HTMLDivElement>(null);
  const passwordsWarnRef = useRef<HTMLDivElement>(null);

  const { createUser } = UserAuth();

  const handleShowPasswords = () => {
    setPasswordHidden((prev) => !prev);
  };

  const handleNextInput = (
    e: KeyboardEvent<HTMLInputElement>,
    toElement: RefObject<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      if (toElement.current) {
        toElement.current.focus();
      }
    }
  };

  const dropStyles = () => {
    if (
      passwordRef.current &&
      passwordRepeatRef.current &&
      passwordsMatchRef.current &&
      passwordsWarnRef.current &&
      emailCorrectRef.current &&
      emailRef.current
    ) {
      emailRef.current.value = "";
      emailRef.current.style.borderColor = "#522158";
      emailCorrectRef.current.style.display = "none";
      passwordRef.current.value = "";
      passwordsMatchRef.current.style.display = "none";
      passwordsWarnRef.current.style.display = "none";
      passwordRef.current.style.borderColor = "#522158";
      passwordRepeatRef.current.value = "";
      passwordRepeatRef.current.style.borderColor = "#522158";
    }
  };

  const handleCorrelatePasswords = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      passwordRef.current &&
      passwordRepeatRef.current &&
      passwordsMatchRef.current &&
      passwordsWarnRef.current &&
      emailCorrectRef.current &&
      emailRef.current
    ) {
      if (e.target.id === "signUpEmail") {
        if (!validateEmail(emailRef.current.value)) {
          emailRef.current.style.borderColor = "#eb6363";
          emailCorrectRef.current.style.display = "block";
        } else {
          emailRef.current.style.borderColor = "#522158";
          emailCorrectRef.current.style.display = "none";
        }
      }

      if (e.target.id === "mainPwd") {
        if (passwordRepeatRef.current.value === "") {
          passwordsMatchRef.current.style.display = "none";
          passwordRepeatRef.current.style.borderColor = "#522158";
        }

        if (!checkPassword(passwordRef.current.value)) {
          passwordsWarnRef.current.style.display = "block";
          passwordRef.current.style.borderColor = "#eb6363";
        } else {
          passwordsWarnRef.current.style.display = "none";
          passwordRef.current.style.borderColor = "#522158";
        }
      }

      if (e.target.id === "repeatPwd") {
        if (passwordRef.current.value !== passwordRepeatRef.current.value) {
          passwordsMatchRef.current.style.display = "block";
          passwordRepeatRef.current.style.borderColor = "#eb6363";
        } else {
          passwordsMatchRef.current.style.display = "none";
          passwordRepeatRef.current.style.borderColor = "#522158";
        }
      }
    }
  };

  const handleSignup = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null = null
  ) => {
    if (e) e.preventDefault();
    if (passwordRepeatRef.current && passwordRef.current && emailRef.current) {
      if (
        passwordRef.current.value !== passwordRepeatRef.current.value ||
        !validateEmail(emailRef.current.value) ||
        !checkPassword(passwordRef.current.value)
      ) {
        return;
      } else {
        try {
          await createUser(emailRef.current.value, passwordRef.current.value);
          setSentEmail(true);
        } catch (error: any) {
          console.log(error.message);
        }
      }
    }
  };

  return (
    <div className="signup">
      {!sentEmail ? (
        <>
          <div className="signupHead">
            <div
              className="goBack"
              onClick={() => {
                goBackToLogin();
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
            <div className="signupTitle">Sign up</div>
          </div>
          <form className="signupForm">
            <div className="mainEmail">
              <div className="realEmail" ref={emailCorrectRef}>
                Enter a valid email
              </div>
              <input
                type="email"
                ref={emailRef}
                id="signUpEmail"
                placeholder="Email"
                autoComplete="email"
                required={true}
                onChange={(e) => handleCorrelatePasswords(e)}
                onKeyDown={(e) => handleNextInput(e, passwordRef)}
              />
            </div>
            <div className="mainPassword">
              <div className="warn" ref={passwordsWarnRef}>
                <img
                  src={
                    chrome.runtime
                      ? chrome.runtime.getURL("assets/info.svg")
                      : infoWarn
                  }
                  alt="Password info"
                />
                <div className="warnDcr">
                  <div className="title">Password must have:</div>
                  <ul>
                    <li>Uppercase letters</li>
                    <li>Lowercase letters</li>
                    <li>Digits</li>
                    <li>Symbols: +_%@!$*~</li>
                  </ul>
                </div>
              </div>
              <input
                type={passwordHidden ? "password" : "text"}
                placeholder="Password"
                id="mainPwd"
                autoComplete="new-password"
                ref={passwordRef}
                required={true}
                onChange={(e) => handleCorrelatePasswords(e)}
                onKeyDown={(e) => handleNextInput(e, passwordRepeatRef)}
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
              <div className="match" ref={passwordsMatchRef}>
                Passwords don't match
              </div>
            </div>
            <input
              type={passwordHidden ? "password" : "text"}
              placeholder="Repeat password"
              autoComplete="new-password"
              id="repeatPwd"
              required={true}
              ref={passwordRepeatRef}
              onChange={(e) => handleCorrelatePasswords(e)}
            />
            <div className="signupMethods">
              <div className="viaGoogle">
                <img
                  src={
                    chrome.runtime
                      ? chrome.runtime.getURL("assets/google.svg")
                      : google
                  }
                  alt="Sign up with Google"
                />
                <span className="text">Via Google</span>
              </div>
              <button className="signupBtn" onClick={(e) => handleSignup(e)}>
                Sign up
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="emailVerificationSent">
          <div className="text">
            Please, check your inbox to confirm your email
          </div>
          <div
            className="button"
            onClick={() => {
              goBackToLogin();
              // setTimeout(() => {
              //   setSentEmail(false);
              // }, 1000);
            }}
          >
            To sign in
          </div>
        </div>
      )}
    </div>
  );
};

function checkPassword(pwd: string): boolean {
  // eslint-disable-next-line no-useless-escape
  const symbolRegex = /[+\_%@!$*~,-]/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /\d/;

  const minLength = 6;
  const maxLength = 256;

  const hasRequiredSymbols =
    symbolRegex.test(pwd) &&
    uppercaseRegex.test(pwd) &&
    lowercaseRegex.test(pwd) &&
    digitRegex.test(pwd);

  const hasValidLength = pwd.length >= minLength && pwd.length < maxLength;

  return hasRequiredSymbols && hasValidLength;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default Signup;
