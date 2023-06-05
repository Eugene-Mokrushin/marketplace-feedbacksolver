import "./styles/drawer.css";
import excel from "./assets/excel.png";
import download from "./assets/download.svg";
import edit from "./assets/edit.svg";
import bin from "./assets/bin.svg";
import arrowBackRevers from "./assets/arrowBackRevers.svg";
import { uid } from "uid";
import { UserDB } from "./context/DBContext";
import { UserAuth } from "./context/AuthContext";
import { FileRef } from "./types";
import { FocusEvent, MouseEvent, useState } from "react";

interface DrawerProps {
  drawerOpen: boolean | null;
  handleDrawer: (state: boolean | null) => void;
  handleSelectFile: (fileId: string) => void;
  selectedFile: string;
}

function Drawer({
  drawerOpen,
  handleDrawer,
  handleSelectFile,
  selectedFile,
}: DrawerProps) {
  const { initalUserData, changeFileName } = UserDB();
  const { user } = UserAuth();
  const [prevFileName, setPrevFileName] = useState("");

  let drawerState: string;

  if (drawerOpen === null) {
    drawerState = "absHidden";
  } else if (drawerOpen) {
    drawerState = "drawerOpen";
  } else {
    drawerState = "drawerClosed";
  }

  // const sortFilesByDate = (files: FileRef[]) => {
  //   return files.sort((a, b) => new Date(b.date) - new Date(a.date));
  // };

  const handleEditName = (
    e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>
  ) => {
    const filename = e.currentTarget.parentElement?.querySelector(
      ".text"
    ) as HTMLElement;
    if (filename) {
      setPrevFileName(filename.innerText);
      filename.contentEditable = "true";
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(filename);
      range.collapse(false);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        filename.focus();
      }
    }
  };
  const handleChengeFileName = (
    e: FocusEvent<HTMLDivElement, Element>,
    file: FileRef
  ) => {
    e.target.contentEditable = "false";
    if (e.target.innerText.length === 0) {
      e.target.innerText = prevFileName;
    } else {
      if (user?.uid) {
        changeFileName(user.uid, file.fileId, e.target.innerText);
      }
    }
  };
  const handlePreventEnter = (
    e: React.FormEvent<HTMLDivElement>,
    file: FileRef
  ) => {
    const enterKeyCode = 13;
    if (
      e.nativeEvent instanceof KeyboardEvent &&
      (e.nativeEvent.key === "Enter" || e.nativeEvent.keyCode === enterKeyCode)
    ) {
      e.preventDefault();
      (e.target as HTMLDivElement).contentEditable = "false";
      (e.target as HTMLDivElement).blur();
      if ((e.target as HTMLDivElement).innerText.length === 0) {
        (e.target as HTMLDivElement).innerText = prevFileName;
      } else {
        if (user?.uid) {
          changeFileName(
            user.uid,
            file.fileId,
            (e.target as HTMLDivElement).innerText
          );
        }
      }
    }
  };

  const handleRadio = (id: string) => {
    handleSelectFile(id);
  };

  const files = initalUserData?.files
    ? [...initalUserData.files].reverse().map((file, index) => {
        return (
          <div
            className="file"
            key={uid(10)}
            onChange={() => handleRadio(file.fileId)}
          >
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
              defaultChecked={selectedFile === file.fileId ? true : false}
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
              <div
                className="text"
                onBlur={(e) => handleChengeFileName(e, file)}
                onKeyDown={(e) => handlePreventEnter(e, file)}
              >
                {file.name}
              </div>
            </label>
            <img
              src={
                chrome.runtime ? chrome.runtime.getURL("assets/edit.svg") : edit
              }
              alt="edit"
              className="editFilename"
              onClick={(e) => handleEditName(e)}
            />
            <div className="date">{convertDate(file.date)}</div>
            <img
              src={
                chrome.runtime ? chrome.runtime.getURL("assets/bin.svg") : bin
              }
              alt="delete file"
              className="deleteFile"
            />
          </div>
        );
      })
    : [];

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

function convertDate(timestamp: string) {
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
