import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Lobby } from "./views/Lobby/Lobby";
import { Session } from "./views/Session/Session";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Lobby} />
          <Route path="/:id" Component={Session} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
