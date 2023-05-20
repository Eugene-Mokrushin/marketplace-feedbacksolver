import "../styles/wildberries.css";
import wbLogo from "../assets/wbLogo.png";
import person from "../assets/person.svg";
import excel from "../assets/excel.png";

function index() {
  return (
    <div className="wildberries">
      <div className="ribbon">
        <div className="title">WB Feedback Solver</div>
        <img
          src={chrome.runtime.getURL("assets/wbLogo.png") || wbLogo}
          alt="Wildberries Logo"
        />
      </div>
      <div className="content">
        <div className="header">
          <div className="basic">Basic</div>
          <div className="pro">
            <span className="fill">PRO</span> ✨
          </div>
          <div className="signinWrap">
            <div className="text">Sign in</div>
            <img
              src={chrome.runtime.getURL("assets/person.svg") || person}
              alt="percon_ico"
            />
          </div>
        </div>
        <div className="main">
          <div className="switches">
            <div className="switch">
              <input type="checkbox" id="switch1" checked />
              <label className="btn" htmlFor="switch1"></label>
              <label htmlFor="switch1" className="title">
                Await confirmation
              </label>
            </div>
            <div className="switch">
              <input type="checkbox" id="switch2" />
              <label className="btn" htmlFor="switch2"></label>
              <label htmlFor="switch2" className="title">
                Autofill entire page{" "}
              </label>
            </div>
            <div className="switch">
              <input type="checkbox" id="switch3" />
              <label className="btn" htmlFor="switch3"></label>
              <label htmlFor="switch3" className="title">
                Paginate
              </label>
            </div>
            <div className="switch">
              <input type="checkbox" id="switch4" checked />
              <label className="btn" htmlFor="switch4"></label>
              <label htmlFor="switch4" className="title">
                Only 5-star feedback
              </label>
            </div>
            <div className="help">I need help</div>
          </div>
          <div className="startUpload">
            <input
              className="startButtonChecker"
              type="checkbox"
              id="startButton"
            />
            <label className="buttonStart" htmlFor="startButton">
              <svg
                className="innerStart"
                width="57"
                height="64"
                viewBox="0 0 57 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M54.7727 29.5383C56.7727 30.693 56.7727 33.5797 54.7727 34.7344L5.06818 63.4314C3.06818 64.5861 0.568181 63.1427 0.568181 60.8333L0.568183 3.43943C0.568184 1.13003 3.06818 -0.313348 5.06818 0.841352L54.7727 29.5383Z"
                  fill="#E4DFD9"
                />
              </svg>
              <svg
                className="innerStop"
                width="54"
                height="66"
                viewBox="0 0 54 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="17" height="66" rx="3" fill="#D9D9D9" />
                <rect x="37" width="17" height="66" rx="3" fill="#D9D9D9" />
              </svg>
            </label>
            <div className="upload">
              <div className="text">Upload</div>
              <img
                src={chrome.runtime.getURL("assets/excel.png") || excel}
                alt="Upload with excel"
              />
            </div>
            <div className="template">Download template</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
