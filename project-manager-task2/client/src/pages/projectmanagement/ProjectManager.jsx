import Sidebar from '../../components/sidebar/Sidebar';
import AddProject from '../../components/projectmanager/AddProject';
import ProjectList from '../../components/projectmanager/ProjectList';
import './taskmanager.scss';

const ProjectManager = () => {
    return (
        <div>
            <div className='taskmanager'>
                <div className='taskmanager__left'>
                    <Sidebar />
                </div>
                <div className='taskmanager__right'>
                    <div className='taskmanager__addtask'>
                        <AddProject />
                    </div>
                    <div className='taskmanager__tasklist'>
                        <ProjectList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectManager;