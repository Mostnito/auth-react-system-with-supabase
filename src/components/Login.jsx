import { supabase } from "../supabase";
import { use, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";



import "./Login.css";
function Login(){
    const [validEmail, setValidEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function emailvalid(e){
        const ver = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
        if (ver){
            setValidEmail(true);
        } else{
            setValidEmail(false);
        }
    }

    function passwordvalid(e){
        if (e.trim() === ""){
            setPassword("");
        } else{
            setPassword(e);
        }
    }

    function submit(e){
        e.preventDefault();
    }

    return(
        <div className="login-container">
            <h2>เข้าสู่ระบบ</h2>
            <form>
                <p><MdEmail size={20}/> อีเมล</p>
                <input className="inbtn" onChange={(e)=>{emailvalid(e.target.value)}} placeholder="example@gmail.com" />
                <span className={validEmail ? "valid" : "invalid"}>กรุณากรอกอีเมลให้ถูกต้อง</span>
                <p><FaLock size={20}/> รหัสผ่าน</p>
                <input className="inbtn" type="password" onChange={(e)=>{passwordvalid(e.target.value)}}  placeholder="รหัสผ่าน" />
                <div className="password-section">
                    <span className={password !== "" ? "valid" : "invalid"}>กรุณากรอกรหัสผ่านของคุณ</span>
                    <span className="forgot-password">ลืมรหัสผ่าน</span>
                </div>
                
                <button className={password==="" ? "disabled" : validEmail === false ? "disabled" : "enabled"} type="submit" onClick={(e)=>{submit(e)}}>เข้าสู่ระบบ</button>
            </form>
        </div>
    )
}

export default Login;