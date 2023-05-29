import React, { useRef, useState } from "react";
import "../styles/account.css";
import arrowBack from "../assets/arrowBack.svg";
import { UserAuth } from "../context/AuthContext";
import { UserDB } from "../context/DBContext";
import edit from "../assets/edit.svg";
import plus from "../assets/plus.svg";
import star from "../assets/star.png";
import { User } from "firebase/auth";

interface AccountProps {
  signedup: () => void;
}

function Account({ signedup }: AccountProps) {
  const { logout, user, changeUsername } = UserAuth();
  const { initalUserData } = UserDB();
  const userNameRef = useRef<HTMLDivElement>(null);
  const penRef = useRef<HTMLImageElement>(null);
  const [username, setUsername] = useState<string>("");
  const [prevUsername, setPrevUsername] = useState<string>("");

  const handleSignOut = () => {
    logout();
    signedup();
  };

  const handleTypeName = (e: React.FormEvent<HTMLDivElement>) => {
    const enterKeyCode = 13;
    if (
      e.nativeEvent instanceof KeyboardEvent &&
      (e.nativeEvent.key === "Enter" || e.nativeEvent.keyCode === enterKeyCode)
    ) {
      e.preventDefault();
      (e.target as HTMLDivElement).blur();
    }
    if ((e.target as HTMLDivElement).innerText.length > 18) {
      (e.target as HTMLDivElement).innerText = username;
    } else {
      setUsername((e.target as HTMLDivElement).innerText);
    }
  };

  const handleChangeName = () => {
    if (userNameRef.current && penRef.current) {
      setPrevUsername(userNameRef.current.innerText);
      userNameRef.current.contentEditable = "true";
      penRef.current.style.opacity = "1";

      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(userNameRef.current);
      range.collapse(false);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        userNameRef.current.focus();
      }
    }
  };

  const handleSaveChangeName = (
    e: React.FocusEvent<HTMLDivElement, Element>
  ) => {
    if (userNameRef.current && userNameRef.current.innerText.length === 0) {
      userNameRef.current.innerText = prevUsername;
    }
    if (userNameRef.current && penRef.current) {
      userNameRef.current.contentEditable = "false";
      penRef.current.style.opacity = "0.5";
      if (user?.uid && user?.email) {
        changeUsername(userNameRef.current.innerText);
      }
    }
  };

  const getUserName = (user: User | null) => {
    if (user) {
      if (user.displayName) {
        return user.displayName;
      } else if (user.email) {
        return user.email.split("@")[0];
      }
    }
    return "";
  };

  return (
    <div className="accountDataWrap">
      <div className="head">
        <div
          className="goBack"
          onClick={() => {
            signedup();
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
        <div className="userName">
          <div
            className="name"
            onBlur={(e) => handleSaveChangeName(e)}
            onKeyDown={(e) => handleTypeName(e)}
            ref={userNameRef}
            contentEditable={false}
          >
            {getUserName(user)}
          </div>
          <img
            onClick={() => handleChangeName()}
            ref={penRef}
            src={
              chrome.runtime ? chrome.runtime.getURL("assets/edit.svg") : edit
            }
            alt="Edit name"
          />
        </div>
        <div className="logout" onClick={() => handleSignOut()}>
          Log out
        </div>
      </div>
      <div className="main">
        <div className="stats">
          <div className="plan">
            <span className="accountBold">Plan:</span> {initalUserData.plan}
          </div>
          <div className="tokenB">
            <span className="accountBold">Tokens Basic:</span>
            <div className="enumWrap">
              <img
                src={
                  chrome.runtime
                    ? chrome.runtime.getURL("assets/plus.svg")
                    : plus
                }
                alt="Add more basic tokens"
              />
              <div className="tokenCount">{initalUserData.tokenB}</div>
              <div className="symbol">🪨</div>
            </div>
          </div>
          <div className="tokenP">
            <span className="accountBold">Tokens PRO:</span>
            <div className="enumWrap">
              <img
                src={
                  chrome.runtime
                    ? chrome.runtime.getURL("assets/plus.svg")
                    : plus
                }
                alt="Add more basic tokens"
              />
              <div className="tokenCount">{initalUserData.tokenP}</div>
              <div className="symbol">💎</div>
            </div>
          </div>
          <div className="explain">1 Token = 1 Response</div>
        </div>
        <div className="plans">
          <div className="basicAndMore">
            <div className="basic">
              <div className="title">Basic</div>
              <ul className="perksList">
                <li className="perk">
                  <div className="marker"></div>
                  <div className="text">100 Basic replies per day</div>
                </li>
                <li className="perk">
                  <div className="marker"></div>
                  <div className="text">1 Excel template max</div>
                </li>
                <li className="perk">
                  <div className="marker"></div>
                  <div className="text">50 free PRO replies</div>
                </li>
              </ul>
              <div className="current">Current</div>
            </div>
            <div className="more">More plans...</div>
          </div>
          <div className="pro">
            <div className="title">
              <span className="text">PRO✨</span>
            </div>
            <ul className="perksList">
              <li className="perk">
                <img
                  src={
                    chrome.runtime
                      ? chrome.runtime.getURL("assets/arrowBack.svg")
                      : star
                  }
                  alt="Go back"
                />
                <div className="text">
                  <span className="fancy">Unlimited</span> PRO and Basic replies
                </div>
              </li>
              <li className="perk">
                <img
                  src={
                    chrome.runtime
                      ? chrome.runtime.getURL("assets/star.png")
                      : star
                  }
                  alt="Go back"
                />
                <div className="text">
                  <span className="fancy">Unlimited</span> and advanced
                  templates
                </div>
              </li>
              <li className="perk">
                <img
                  src={
                    chrome.runtime
                      ? chrome.runtime.getURL("assets/star.png")
                      : star
                  }
                  alt="Go back"
                />
                <div className="text">
                  <span className="fancy">Unique and personalized</span> replies
                </div>
              </li>
              <li className="perk">
                <img
                  src={
                    chrome.runtime
                      ? chrome.runtime.getURL("assets/star.png")
                      : star
                  }
                  alt="Go back"
                />
                <div className="text">
                  <span className="fancy">ChatGPT-4</span> powered
                </div>
              </li>
              <li className="perk">
                <img
                  src={
                    chrome.runtime
                      ? chrome.runtime.getURL("assets/star.png")
                      : star
                  }
                  alt="Go back"
                />
                <div className="text">
                  <span className="fancy">... more!</span>
                </div>
              </li>
            </ul>
            <div className="ctaPro">Go to PRO</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
