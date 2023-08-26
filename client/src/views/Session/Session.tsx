import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";

import { File } from "../../components/File/File";

interface FileInfo {
  file: any;
  type: string;
  name: string;
}

export const Session = () => {
  const { id } = useParams();

  const [files, setFiles] = useState<FileInfo[]>([]);

  socket.emit("join", id);

  useEffect(() => {
    socket.on("receive", (file: any, type: string, name: string) =>
      setFiles((oldFiles) => [...oldFiles, { file, type, name }])
    );

    return () => {
      socket.off("receive");
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
      {files &&
        files.map((file, index) => (
          <div>
            <File
              key={index}
              name={file.name}
              type={file.type}
              file={file.file}
            ></File>
          </div>
        ))}
    </div>
  );
};
