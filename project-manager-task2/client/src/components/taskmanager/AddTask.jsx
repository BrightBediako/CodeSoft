import { useState } from 'react';
import './addtask.scss';
import { addTask } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddTask = () => {

    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({ ...state }));
    const { currentUser } = auth;
    const [state, setState] = useState({
        name: '',
        desc: '',
        deadline: '',
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!state.name || !state.desc || !state.deadline) {
            setState({ ...state, error: 'All fields are required' });
            return;
        }
        setState({ ...state, error: '' });

        dispatch(addTask(state.name, state.desc, state.deadline, currentUser.id));
        setState({
            name: '',
            desc: '',
            deadline: '',
        });
    };

    return (
        <div>
            <div className='addtask'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='name'
                        placeholder='Add Task Name'
                        onChange={handleChange}
                        value={state.name}
                    />
                    <input
                        type='text'
                        name='desc'
                        placeholder='Add Task Description'
                        onChange={handleChange}
                        value={state.desc}
                    />
                    <input
                        type='date'
                        name='deadline'
                        placeholder='Add Deadline'
                        onChange={handleChange}
                        value={state.deadline}
                    />
                    <button className='button' type='submit'>Add Task</button>
                </form>
                {state.error && <div className="error-message">{state.error}</div>}
            </div>
        </div>
    );
};

export default AddTask;
