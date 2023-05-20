import Wildberries from "./wildberries/index";
import "./styles/global.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {}, []);
  return (
    <div className="wrapper">
      <Wildberries />
    </div>
  );
}

export default App;
