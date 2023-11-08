import { useEffect } from 'react';
import './dashboard.scss';
import Sidebar from '../../components/sidebar/Sidebar';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProjects } from '../../redux/projectSlice';
import { getAllTasks } from '../../redux/taskSlice';

const Dashboard = () => {
    const projectlist = useSelector((state) => state.project);
    const { AllProjects } = projectlist;

    const tasklist = useSelector((state) => state.task);
    const { AllTasks } = tasklist;

    const user = useSelector((state) => state.auth);
    const { currentUser } = user;

    let pendingProject = [];
    let completedProject = [];
    for (let i = 0; i < AllProjects.length; i++) {
        if (AllProjects[i].status === 'Todo') {
            pendingProject.push(AllProjects[i]);
        } else if (AllProjects[i].status === 'Completed') {
            completedProject.push(AllProjects[i]);
        }
    }

    let pendingTask = [];
    let completedTask = [];
    for (let i = 0; i < AllTasks.length; i++) {
        if (AllTasks[i].status === 'Todo') {
            pendingTask.push(AllTasks[i]);
        } else if (AllTasks[i].status === 'Completed') {
            completedTask.push(AllTasks[i]);
        }
    }
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProjects(currentUser.token, currentUser.id));
        dispatch(getAllTasks(currentUser.token, currentUser.id));
    }, [dispatch, currentUser.token, currentUser.id]);


    return (
        <div>
            <div className='dashboard'>
                <div className='dashboard__left'>
                    <Sidebar />
                </div>
                <div className='dashboard__right'>
                    <div className='dashboard__rightContent'>
                        <h2>Project Status</h2>
                        <div className='taskcount'>
                            <div className='todo box'>Todo Project- {pendingProject.length}</div>
                            <div className='done box'>Completed Project - {completedProject.length}</div>
                            <div className='todo box'>Todo Task - {pendingTask.length}</div>
                            <div className='done box'>Completed Task - {completedTask.length}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
