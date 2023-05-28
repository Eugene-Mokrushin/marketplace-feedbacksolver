import Wildberries from "./wildberries/index";
import "./styles/global.css";
import { useEffect, useState } from "react";
import close from "./assets/close.svg";
import { AuthContextProvider } from "./context/AuthContext";
import { DBContextProvider } from "./context/DBContext";
import Drawer from "./Drawer";

function App() {
  useEffect(() => {}, []);

  const [drawrOpen, setDrawOpen] = useState<boolean | null>(false);

  const handleClose = () => {
    const mainPopup = document.querySelector("#feedbackSolver");
    if (mainPopup) {
      mainPopup.remove();
    }
  };

  const handleDrawer = (state: boolean | null) => {
    setDrawOpen(state);
  };



  return (
    <div className="wrapper">
      <AuthContextProvider>
        <DBContextProvider>
          <div className="closeFeedbackSolver" onClick={handleClose}>
            <img
              src={
                chrome.runtime
                  ? chrome.runtime.getURL("assets/close.svg")
                  : close
              }
              alt="close button"
            />
          </div>
          <Wildberries handleDrawer={handleDrawer}/>
          <Drawer drawerOpen={drawrOpen} handleDrawer={handleDrawer} />
        </DBContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
