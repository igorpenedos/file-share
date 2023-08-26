import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../socket";

export const Lobby = () => {
  const [room, setRoom] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRoom(value);
  };

//   const handleJoin = () => {
//     console.log(room);
//   };

  const handleCreate = () => {
    socket.emit("join", { room, name: "Igor" });
  };

  return (
    <div>
      <input type="text" onChange={handleChange}></input>
      <button>
        <Link to={`/${room}`}>Join</Link>
      </button>
      <br />
      <button onClick={handleCreate}>Create Room</button>
    </div>
  );
};
