import "./navbar.scss"
import { ArrowDropDown, Menu, Notifications, Person, Search } from "@mui/icons-material"
import { useState } from "react"
import { useDispatch } from 'react-redux';
import { toggle } from "../../features/menu/menuSlice";


const Navbar = () => {
    const [login, setLogin] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="navbar">
            <div className="container">
                <div className="left">
                    <Menu className="menu" onClick={() => {dispatch(toggle())}}/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix_Logo" />
                </div>
                <div className="right">
                    <div className="search">
                        <input type="text" placeholder="Search" />
                        <Search className="icon" />
                    </div>
                    {
                        login ? 
                        <>
                            <Notifications className="icon" />
                            <div className="profile">
                                <img src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg" alt="profile" />
                                <ArrowDropDown  />
                                <div className="options">
                                    <span>Settings</span>
                                    <span>Logout</span>
                                </div>
                            </div>
                        </>
                        :
                        <div className="login">
                            <Person />
                            Login
                        </div>
                    }
                   
                </div>
            </div>
        </div>
    )
}

export default Navbar