import "./sidebar.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiTask, BiSolidDashboard, BiUserCircle } from 'react-icons/bi';
import { FaProjectDiagram } from 'react-icons/fa';

const Sidebar = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const { currentUser } = auth;

    return (
        <div className="sidebar">
            <div className="logo-details">
                <BiUserCircle className='icon' />
                <span className="logo_name">
                    {currentUser.username}</span>
            </div>
            <hr />
            <ul className="nav-links">
                <li>
                    <Link to='/dashboard'>
                    <BiSolidDashboard className='icon' />
                        <span className="links_name">
                            Dashboard
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to='/projectmanager'>
                    <FaProjectDiagram className='icon' />
                        <span className="links_name">
                            Project
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to='/taskmanager'>
                    <BiTask className='icon' />
                        <span className="links_name">
                            Task
                        </span>
                    </Link>
                </li>
                {/* <li>
                    <a href="#">
                        <i classNameName="bx bx-cog"></i>
                        <span classNameName="links_name">Profile</span>
                    </a>
                </li> */}
                {/* <li className="log_out">
                    <a href="#">
                        <i className="bx bx-log-out"></i>
                        <span className="links_name">Log out</span>
                    </a>
                </li> */}
            </ul>
        </div>
    );
};

export default Sidebar;