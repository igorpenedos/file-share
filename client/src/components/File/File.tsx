import React from "react";

interface Props {
  name: string;
  type: string;
  file: any;
}

export const File = (props: Props) => {
  const { name, type, file } = props;

  const download = () => {
    var blob = new Blob([file], { type });
    var url = URL.createObjectURL(blob);
    window.open(url);
  };

  return <div onClick={download}>{name}</div>;
};
