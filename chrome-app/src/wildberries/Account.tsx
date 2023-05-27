import React from "react";
import "../styles/account.css";
import arrowBack from "../assets/arrowBack.svg";
import { UserAuth } from "../context/AuthContext";

interface AccountProps {
  signedup: () => void;
}

function Account({ signedup }: AccountProps) {
  const { logout, user } = UserAuth();

  const handleSignOut = () => {
    logout();
    signedup();
  };

  return (
    <div className="accountDataWrap">
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
      <div className="title">Account</div>
      <div className="currentEmail">Email: {user?.email}</div>
      <div className="signOut" onClick={() => handleSignOut()}>
        Sign out
      </div>
    </div>
  );
}

export default Account;
