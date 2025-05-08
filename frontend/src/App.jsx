import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LogIn from "./pages/LogIn.jsx"
import Profile from "./pages/Profile.jsx"
import Settings from "./pages/Settings.jsx"
import SignUp from "./pages/SignUp.jsx";

export default function App() {
  return (
   <div>
    <Navbar />  
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/signUp" element={<SignUp />}/>
      <Route path="/login" element={<LogIn />}/>
      <Route path="/settings" element={<Settings />}/>
      <Route path="/profile" element={<Profile />}/>

    </Routes>
      
  </div>
  );
}
