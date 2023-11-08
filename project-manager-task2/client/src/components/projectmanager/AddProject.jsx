import { useState } from 'react';
import './addproject.scss';
import { addProject } from '../../redux/projectSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddProject = () => {

    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({ ...state }));
    const { currentUser } = auth;
    const [state, setState] = useState({
        name: '',
        desc: '',
        department: '',
        startDate: '',
        endDate: '',
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!state.name || !state.desc || !state.department || !state.startDate || !state.endDate) {
            setState({ ...state, error: 'All fields are required' });
            return;
        }
        setState({ ...state, error: '' });

        dispatch(addProject(state.name, state.desc, state.department, state.startDate, state.endDate, currentUser.id));
        setState({
            name: '',
            desc: '',
            department: '',
            startDate: '',
            endDate: '',
        });
    };

    return (
        <div>
            <div className='addtask'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='name'
                        placeholder='Add Project Name'
                        onChange={handleChange}
                        value={state.name}
                    />
                    <input
                        type='text'
                        name='desc'
                        placeholder='Add Project Description'
                        onChange={handleChange}
                        value={state.desc}
                    />
                    <input
                        type='text'
                        name='department'
                        placeholder='Department'
                        onChange={handleChange}
                        value={state.department}
                    />
                    <input
                        type='date'
                        name='startDate'
                        onChange={handleChange}
                        value={state.startDate}
                    />
                    <input
                        type='date'
                        name='endDate'
                        onChange={handleChange}
                        value={state.endDate}
                    />
                    <button className='button' type='submit'>Create Project</button>
                </form>
                {state.error && <div className="error-message">{state.error}</div>}
                <br />
                <br />
            </div>
        </div>
    );
};

export default AddProject;
