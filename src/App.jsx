//npx vite --clearScreen=false
import React from "react";
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/connections";
import Requests from "./components/Requests.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route index element={<Feed />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="connections" element={<Connections />} />
        <Route path="request" element={<Requests />} />
      </Route>
    </Routes>
  );
}

export default App;
