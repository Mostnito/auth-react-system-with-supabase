import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
     const { data: { session } } = await supabase.auth.getSession()
     if (!session) {
        navigate("/login")
    }
    props.setSession(session);
    };
    checkSession();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    props.setSession(null);
    props.setUsername("Guest");
    await supabase.auth.signOut();
    navigate("/login");

  }

  return (
  <div>
    <button onClick={handleLogout}>ออกจากระบบ</button>
  </div>);
}

export default Dashboard;
