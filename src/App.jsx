import Header from "./components/Header";
import Login from "./components/Login";
import { useState, useEffect, use } from "react";
import { supabase } from "./supabase";
import "./App.css";
function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  //   const register = async () => {
  //     const { data, error } = await supabase.auth.signUp({
  //       email:"tapanawatsunanta@gmail.com",
  //       password:"your_password"
  //     });
  //   if (error){
  //     console.log(error.message);
  //     return;
  //   }

  //   const user = data.user;
  //   console.log(user);
  // }
  // register();

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className={theme}>
      <div className="app">
        <Header theme={theme} setTheme={setTheme} />
        <main>
          <Login />
        </main>
      </div>
    </div>
  );
}

export default App;
