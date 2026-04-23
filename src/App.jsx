import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { useState, useEffect, use } from "react";
import { supabase } from "./supabase";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className={theme}>
      <div className="app">
        <Header theme={theme} setTheme={setTheme} session={session} setSession={setSession} username={username} setUsername={setUsername}/>
        <main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard session={session} setSession={setSession} username={username} setUsername={setUsername}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
