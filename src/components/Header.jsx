import "./Header.css"
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { use, useEffect } from "react";
import { supabase } from "../supabase";

function Header(props){

    useEffect(() =>{
        if (props.session) {
            console.log("Session in Header:", props.session.user);
            const fetchProfile = async () => {
                const {data} = await supabase.from("profiles").select("username").eq("id", props.session.user.id).single();
                console.log("Fetched profile data:", data);
                props.setUsername(data.username);
            }
            fetchProfile();
            
        }  
    },[props.session])

    function toggleTheme(){
        props.setTheme(props.theme === "light" ? "dark" : "light");
    };

    

    return(
        <div className="header">
            <h2>Authorization App</h2>
            <div className="headerright">
                <span onClick={toggleTheme}>{props.theme === "light" ? <IoMoon size={25} /> : <IoSunny size={25}/>}</span>
                <h2>Hi, {props.username}</h2>
            
            </div>
            

        </div>
    )
}

export default Header;