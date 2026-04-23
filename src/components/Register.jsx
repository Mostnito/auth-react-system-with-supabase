import { supabase } from "../supabase";
import { use, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"



import "./Register.css";
function Register(){
    const navigate = useNavigate()
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
        if (validEmail && password !== "") {
            Swal.fire({
                title: 'เข้าสู่ระบบสำเร็จ',
                icon: 'success',
                confirmButtonText: 'ตกลง'
            });
        } else {
            Swal.fire({
                title: 'ข้อผิดพลาด',
                text: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                icon: 'error',
                confirmButtonText: 'ตกลง'
            });
        }
    }

    return(
        <div className="register-container">
            <h2>สมัครสมาชิก</h2>
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
                <div className="register-link">
                    <span>ยังไม่มีบัญชี? <span className="btn-reg" onClick={()=> navigate("/")}>สมัครสมาชิก</span></span>
                </div>
                
            </form>
        </div>
    )
}

export default Register;