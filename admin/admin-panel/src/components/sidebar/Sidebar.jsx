import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import MovieIcon from '@mui/icons-material/Movie';
import CategoryIcon from '@mui/icons-material/Category';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {Link} from 'react-router-dom';
import { changeMode } from '../../features/darkMode/darkModeSlice';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';

const Sidebar = () => {
  
  const dispatch = useDispatch();

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
                <Link to="/" onClick={() => dispatch(logOut())} style={{textDecoration: "none"}}>
                    <li>
                        <LoginOutlinedIcon className="icon" />
                        <span >Log out</span>
                    </li>
                </Link>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption" onClick={() => dispatch(changeMode(false))}></div>
            <div className="colorOption" onClick={() => dispatch(changeMode(true))}></div>
        </div>
    </div>
  )
}

export default Sidebar