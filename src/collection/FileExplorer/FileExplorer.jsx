import { useState } from "react";
import json from "./data.json";
import "./fileExplorer.css";

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="#f5a623"
  >
    <path d="M10 4H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-10l-2-2z" />
  </svg>
);

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="#aaa"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
  </svg>
);

const AddFolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="#4caf50"
  >
    <path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z" />
  </svg>
);

const FileExplorer = () => {
  const [data, setData] = useState(json);

  const List = ({ list }) => {
    const [isExpanded, setIsExpanded] = useState({
      // profile : true,
      // dashboard: false
      // ...
    });

    return (
      <div className="container">
        {list.map((node) => {
          const { id, name, isFolder, children } = node;

          return (
            <div key={id}>
              <div className="row">
                {isFolder && (
                  <span
                    className="expand-collapse"
                    onClick={() =>
                      setIsExpanded((prev) => ({
                        ...prev,
                        [name]: !prev[name],
                      }))
                    }
                  >
                    {isExpanded[name] ? "-" : "+"}
                  </span>
                )}
                {isFolder ? <FolderIcon /> : <FileIcon />}
                <div>{name}</div>
                {isFolder && <AddFolderIcon />}
              </div>
              {isExpanded[name] && children && children.length > 0 && (
                <List list={children} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>FileExplorer</div>
      <List list={data} />
    </>
  );
};

export default FileExplorer;
