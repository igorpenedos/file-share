import React from "react";
import { ReactComponent as Default } from "../../utils/icon/default.svg";
import { ReactComponent as JPG } from "../../utils/icon/jpg.svg";
import { ReactComponent as PDF } from "../../utils/icon/pdf.svg";
import { ReactComponent as PNG } from "../../utils/icon/png.svg";

import "./File.scss";

interface Props {
  name: string;
  type: string;
  file: any;
}

export const File = (props: Props) => {
  const { name, type, file } = props;
  console.log(type)

  const download = () => {
    var blob = new Blob([file], { type });
    var url = URL.createObjectURL(blob);
    window.open(url);
  };

  const icon = () => {
    switch (type) {
      case "image/jpeg":
        return <JPG />;
      case "application/pdf":
        return <PDF />;
      case "image/png":
        return <PNG />;
      default:
        return <Default />;
    }
  };

  return (
    <div className="file" onClick={download}>
      <div className="file--icon">{icon()}</div>
      <div className="file--text">{name}</div>
    </div>
  );
};
