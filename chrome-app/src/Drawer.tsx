import "./styles/drawer.css";
import excel from "./assets/excel.png";
import download from "./assets/download.svg";
import edit from "./assets/edit.svg";
import bin from "./assets/bin.svg";
import arrowBackRevers from "./assets/arrowBackRevers.svg";
import { uid } from "uid";

interface DrawerProps {
  drawerOpen: boolean | null;
  handleDrawer: (state: boolean | null) => void;
}

function Drawer({ drawerOpen, handleDrawer }: DrawerProps) {
  const testFiles = [
    { name: "Clothes fall", date: 1701616953000 },
    { name: "Winter collection", date: 1642260153000 },
    { name: "Super mega summer collection", date: 1685287353000 },
    { name: "Clothes fall 2", date: 1646148153000 },
    { name: "Clothes fall 4", date: 1626103353000 },
  ];

  let drawerState: string;

  if (drawerOpen === null) {
    drawerState = "absHidden";
  } else if (drawerOpen) {
    drawerState = "drawerOpen";
  } else {
    drawerState = "drawerClosed";
  }

  const sortFilesByDate = (
    files: { name: string; date: number }[]
  ): { name: string; date: number }[] => {
    return files.sort((a, b) => a.date - b.date);
  };

  const files = sortFilesByDate(testFiles)
    .reverse()
    .map((file, index) => {
      return (
        <div className="file" key={uid(10)}>
          <img
            src={
              chrome.runtime
                ? chrome.runtime.getURL("assets/download.svg")
                : download
            }
            alt="Download File"
            className="downloadFile"
          />
          <input
            className="fileSelector"
            type="radio"
            name="fileSelect"
            id={file.name + index}
          />
          <label className="name" htmlFor={file.name + index}>
            <img
              src={
                chrome.runtime
                  ? chrome.runtime.getURL("assets/excel.png")
                  : excel
              }
              alt="Excel file"
              className="fileExcel"
            />
            <div className="text">{file.name}</div>
          </label>
          <img
            src={
              chrome.runtime ? chrome.runtime.getURL("assets/edit.svg") : edit
            }
            alt="edit"
            className="editFilename"
          />
          <div className="date">{convertDate(file.date)}</div>
          <img
            src={chrome.runtime ? chrome.runtime.getURL("assets/bin.svg") : bin}
            alt="delete file"
            className="deleteFile"
          />
        </div>
      );
    });

  return (
    <div className={`drawerWrapper ${drawerState}`}>
      <div className="files">{files}</div>
      <div className="drawerRibon" onClick={() => handleDrawer(!drawerOpen)}>
        <img
          src={
            chrome.runtime
              ? chrome.runtime.getURL("assets/arrowBackRevers.svg")
              : arrowBackRevers
          }
          alt="delete file"
          className="deleteFile"
        />
      </div>
    </div>
  );
}

function convertDate(timestamp: number) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
}

export default Drawer;
