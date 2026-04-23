import { supabase } from "../supabase";
import { use, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"
import { FaUser } from "react-icons/fa";




import "./Register.css";
function Register(){
    const navigate = useNavigate()
    const [validEmail, setValidEmail] = useState(false);
    const [validUsername, setValidUsername] = useState(false);

    const [validPasswordLength, setValidPasswordLength] = useState(false);
    const [validPasswordUpper, setValidPasswordUpper] = useState(false);
    const [validPasswordSpecial, setValidPasswordSpecial] = useState(false);
    const [validPasswordMatching, setValidPasswordMatching] = useState(false);

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function emailvalid(e){
        const ver = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
        if (ver){
            setValidEmail(true);
        } else{
            setValidEmail(false);
        }
        setEmail(e);
    }

    function usernamevalid(e){
        if (e.trim() === "" || /^[a-z0-9_A-Z]{5,20}$/.test(e) === false){
            setValidUsername(false);
        } else{
            setValidUsername(true);
        }
        setUsername(e);
    }

    function passwordvalid(e) {
        if (e.length < 8){
            setValidPasswordLength(false);
        } else {
            setValidPasswordLength(true);
        }

        if (e.match(/[A-Z]/)) {
            setValidPasswordUpper(true);
        } else {
            setValidPasswordUpper(false);
        }

        if (e.match(/[!@#$%^&*(),.?":{}|<>]/)) {
            setValidPasswordSpecial(true);
        } else {
            setValidPasswordSpecial(false);
        }
        setPassword(e);
    }

    function passwordMatch(e){
        if (e === password){
            setValidPasswordMatching(true);
        } else {
            setValidPasswordMatching(false);
        }
    }

    function submit(e){
        e.preventDefault();
        console.log("Click")
        if (validEmail && validUsername && validPasswordLength && validPasswordUpper && validPasswordSpecial && validPasswordMatching) {
            
            const handleRegister = async () => {
                console.log("Registering...")
                setLoading(true)
                const { data, error: signUpError  } = await supabase.auth.signUp({
                    email: email,
                    password: password,
                });

                if (signUpError) {
                    setLoading(false);
                             Swal.fire({
                        title: 'ข้อผิดพลาดกากๆ',
                        text: signUpError.message,
                        icon: 'error',
                        confirmButtonText: 'ตกลง'
                    });
                    return;
                }
                console.log("User registered:", data.user);
                console.log("Username:", username);
                const {error: profileError} = await supabase.from("profiles").upsert({
                    id: data.user.id,
                    username: username,
                });

                if (profileError){
                setLoading(false)
                        Swal.fire({
                        title: 'ข้อผิดพลาดแมวๆ',
                        text: profileError.message,
                        icon: 'error',
                        confirmButtonText: 'ตกลง'
                    });
                return
                }

                setLoading(false)
                navigate("/login")
                Swal.fire({
                title: 'สมัครสมาชิกสำเร็จ',
                icon: 'success',
                confirmButtonText: 'ตกลง'
            });

            }

            handleRegister();

            
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
                <p><FaUser size={20}/> ชื่อผู้ใช้</p>
                <input className="inbtn" onChange={(e)=>{usernamevalid(e.target.value)}} placeholder="ชื่อผู้ใช้" />
                <span className={validUsername ? "valid" : "invalid"}>กรุณากรอกชื่อผู้ใช้ให้ถูกต้อง (5-20 ตัวอักษร)</span>
                <p><MdEmail size={20}/> อีเมล</p>
                <input className="inbtn" onChange={(e)=>{emailvalid(e.target.value)}} placeholder="example@gmail.com" />
                <span className={validEmail ? "valid" : "invalid"}>กรุณากรอกอีเมลให้ถูกต้อง</span>
                <p><FaLock size={20}/> รหัสผ่าน</p>
                <div className="password-confirm">
                    <input className="inbtn" type="password" onChange={(e)=>{passwordvalid(e.target.value)}}  placeholder="รหัสผ่าน" />
                    <input className="inbtn" type="password" onChange={(e)=>{passwordMatch(e.target.value)}} placeholder="ยืนยันรหัสผ่าน" />
                    <div className="password-section">
                        <span className={validPasswordLength ? "correct" : "incorrect"}>รหัสผ่านอย่างน้อย 8 ตัวอักษร</span>
                        <span className={validPasswordUpper ? "correct" : "incorrect"}>รหัสผ่านต้องมีทั้งตัวพิมพ์ใหญ่และตัวพิมพ์เล็ก</span>
                        <span className={validPasswordSpecial ? "correct" : "incorrect"}>รหัสผ่านต้องมีสัญลักษณ์พิเศษ</span>
                        <span className={validPasswordMatching ? "correct" : "incorrect"}>รหัสผ่านต้องตรงกัน</span>
                    </div>
                </div>
                <button className={validPasswordMatching && validPasswordLength && validPasswordUpper && validPasswordSpecial && validUsername && validEmail ? "enabled" : "disabled"} type="submit" onClick={(e)=>{submit(e)}}>สมัครสมาชิก</button>
                <div className="register-link">
                    <span>มีบัญชีอยู่แล้ว? <span className="btn-reg" onClick={()=> navigate("/login")}>เข้าสู่ระบบ</span></span>
                </div>
                
            </form>
        </div>
    )
}

export default Register;