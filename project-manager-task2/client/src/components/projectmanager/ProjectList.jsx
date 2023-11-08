import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from './ListCard';
import './tasklist.scss';
import { getAllProjects } from '../../redux/projectSlice';

const ProjectList = () => {
    const auth = useSelector((state) => state.auth);
    const projects = useSelector((state) => state.project);

    const { currentUser } = auth;
    const { AllProjects } = projects;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProjects(currentUser.token, currentUser.id));
    }, [dispatch, currentUser.token, currentUser.id]);

    return (
        <div>
            <ul className='list-header'>
                {/* <li>
                    <h5>Id</h5>
                </li> */}
                <li>
                    <h5> Name</h5>
                </li>
                <li>
                    <h5>Description</h5>
                </li>
                <li>
                    <h5>Department</h5>
                </li>
                <li>
                    <h5>Start Date</h5>
                </li>
                <li>
                    <h5>End Date</h5>
                </li>
                <li>
                    <h5>Status</h5>
                </li>
                <li>
                    <h5>Action</h5>
                </li>
            </ul>
            {Object.values(AllProjects).map((item) => {
                return <ListCard key={item._id} item={item} />;
            })}
        </div>
    );
};

export default ProjectList;
