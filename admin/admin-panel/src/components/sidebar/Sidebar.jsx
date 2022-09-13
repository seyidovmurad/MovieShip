import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import MovieIcon from '@mui/icons-material/Movie';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch:ds } = useContext(AuthContext);

  return (
    <div className='sidebar'>
        <div className="top">
            <Link to="/" style={{textDecoration: "none"}}>
                <span className="logo">Anex</span>
            </Link>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">Main</p>
                <Link to="/" style={{textDecoration: "none"}}>
                    <li>
                        <DashboardIcon className="icon" />
                        <span>Dashboard</span>
                    </li>
                </Link >
                <p className="title">List</p>
                <Link to="/user" style={{textDecoration: "none"}}>
                    <li>
                        <PersonIcon className="icon" />
                        <span>Users</span>
                    </li>
                </Link>
                <Link to="/movie" style={{textDecoration: "none"}}>
                    <li>
                        <MovieIcon className="icon" />
                        <span>Movies</span>
                    </li>
                </Link>
                <Link to="/genre" style={{textDecoration: "none"}}>
                    <li>
                        <CategoryIcon className="icon" />
                        <span>Genres</span>
                    </li>
                </Link>
                {/* <li>
                    <span>Orders</span>
                </li>
                <li>
                    <span>Delivery</span>
                </li>
                <li>
                    <span>Stats</span>
                </li> */}
                <p className="title">Services</p>
                <Link to="/" style={{textDecoration: "none"}}>
                    <li>
                        <NotificationsOutlinedIcon className="icon" />
                        <span>Notifaction</span>
                    </li>
                </Link>
                <Link to="/" style={{textDecoration: "none"}}>
                    <li>
                        <HealthAndSafetyOutlinedIcon className="icon" />
                        <span>System Health</span>
                    </li>
                </Link>
                {/* <li>
                    <span>Logs</span>
                </li> */}
                <Link to="/" style={{textDecoration: "none"}}>
                    <li>
                        <ManageAccountsOutlinedIcon className="icon" />
                        <span>Settings</span>
                    </li>
                </Link>
                <p className="title">User</p>
                <Link to="/" style={{textDecoration: "none"}}>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Profile</span>
                    </li>
                </Link>
                <Link to="/" style={{textDecoration: "none"}}>
                    <li>
                        <LoginOutlinedIcon className="icon" />
                        <span onClick={() => ds({type: "LOGOUT"})}>Log out</span>
                    </li>
                </Link>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption" onClick={() => dispatch({type: "LIGHT"})}></div>
            <div className="colorOption" onClick={() => dispatch({type: "DARK"})}></div>
        </div>
    </div>
  )
}

export default Sidebar