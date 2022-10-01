import "./navbar.scss"
import { ArrowDropDown, Menu, Notifications, Person, Search } from "@mui/icons-material"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from "../../features/menu/menuSlice";
import { Link } from "react-router-dom";
import { selectCurrentUser, logOut } from "../../features/auth/authSlice";

const Navbar = () => {
    const user = useSelector(selectCurrentUser);
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
                        user ? 
                        <>
                            <Notifications className="icon" />
                            <div className="profile">
                                <img src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg" alt="profile" />
                                <ArrowDropDown  />
                                <div className="options">
                                    <span>Settings</span>
                                    <span onClick={() => dispatch(logOut())}>Logout</span>
                                </div>
                            </div>
                        </>
                        :
                        <Link className="link loginItem" to="/login">
                            <Person />
                            Login
                        </Link>
                    }
                   
                </div>
            </div>
        </div>
    )
}

export default Navbar