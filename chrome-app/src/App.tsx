import Wildberries from "./wildberries/index";
import "./styles/global.css";
import { useEffect } from "react";
import close from "./assets/close.svg";

function App() {
  useEffect(() => {}, []);

  const handleClose = () => {
    const mainPopup = document.querySelector("#feedbackSolver");
    mainPopup && mainPopup.remove();
  };

  return (
    <div className="wrapper">
      <Wildberries />
      <div className="closeFeedbackSolver" onClick={handleClose}>
        <img
          src={chrome.runtime ? chrome.runtime.getURL("assets/close.svg") : close}
          alt="close button"
        />
      </div>
    </div>
  );
}

export default App;
