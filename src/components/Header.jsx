import "./Header.css"
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

function Header(props){

    function toggleTheme(){
        props.setTheme(props.theme === "light" ? "dark" : "light");
    };

    return(
        <div className="header">
            <h2>Authorization App</h2>
            <div className="headerright">
                <span onClick={toggleTheme}>{props.theme === "light" ? <IoMoon size={25} /> : <IoSunny size={25}/>}</span>
                <h2>Hi, Guest</h2>
            
            </div>
            

        </div>
    )
}

export default Header;