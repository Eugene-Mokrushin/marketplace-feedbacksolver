import Wildberries from "./wildberries/index";
import "./styles/global.css";
import { useEffect } from "react";
import close from "./assets/close.svg";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  useEffect(() => {}, []);

  const handleClose = () => {
    const mainPopup = document.querySelector("#feedbackSolver");
    mainPopup && mainPopup.remove();
  };

  return (
    <div className="wrapper">
      <AuthContextProvider>
        <div className="closeFeedbackSolver" onClick={handleClose}>
          <img
            src={
              chrome.runtime ? chrome.runtime.getURL("assets/close.svg") : close
            }
            alt="close button"
          />
        </div>
        <Wildberries />
      </AuthContextProvider>
    </div>
  );
}

export default App;
