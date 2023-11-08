import './homepage.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const { currentUser } = auth;
    return (
        <div className="landing-page">
            <div className="background-image">
                {/* <img src="../../images/team.png" alt="img" /> */}
            </div>
            <div className="content">
                <h1>Welcome to Your Project Management Tool</h1>
                <p>Effortlessly manage your projects, tasks, deadlines, and progress.</p>
                {
                    currentUser && currentUser.token ? (
                        <Link to='/dashboard' className='get-started-button'>
                            <button className="get-started-button">Get Started</button>
                        </Link>
                    ) : (
                            <Link to='/signin' className='get-started-button'>
                                <button className="get-started-button">Get Started</button>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};


export default Homepage;