import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";

import { File } from "../../components/File/File";

import "./Session.scss";

interface FileInfo {
  file: any;
  type: string;
  name: string;
}

export const Session = () => {
  const { id } = useParams();

  const [files, setFiles] = useState<FileInfo[]>([]);
  const [sentFiles, setSentFiles] = useState<string[]>([]);

  socket.emit("join", id);

  useEffect(() => {
    socket.on("receive", (file: any, type: string, name: string) =>
      setFiles((oldFiles) => [...oldFiles, { file, type, name }])
    );
    socket.on("sender", (name: string) => {
      setSentFiles((oldNames) => [...oldNames, name]);
    });

    return () => {
      socket.off("receive");
      socket.off("sender");
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files &&
      socket.emit(
        "send",
        id,
        e.target.files,
        e.target.files!["0"].type,
        e.target.files!["0"].name
      );
  };

  return (
    <div className="session">
      <input className="session--input" type="file" onChange={handleChange} />
      <h3>Files Sent:</h3>
      {sentFiles && sentFiles.map((fileName) => <div>{fileName}</div>)}
      <h3>Files Recieved:</h3>
      {files &&
        files.map((file, index) => (
          <File
            key={index}
            name={file.name}
            type={file.type}
            file={file.file}
          ></File>
        ))}
    </div>
  );
};
