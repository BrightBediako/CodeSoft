import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initalTask = localStorage.getItem('task')
    ? JSON.parse(localStorage.getItem('task'))
    : null;

const initialState = {
    TaskData: initalTask,
    AllTasks: {},
};

export const taskSlice = createSlice({
    name: 'Task',
    initialState,

    reducers: {
        taskAddedSuccessfully: (state, action) => {
            state.TaskData = action.payload;
        },
        taskAddFailure: (state) => {
            return state;
        },
        getAllTaskSuccess: (state, action) => {
            state.AllTasks = action.payload;
        },
        getAllTaskFailure: (state) => {
            return state;
        },

        editTaskSuccess: (state, action) => {
            state.TaskData = action.payload;
        },

        deleteSuccess: (state, action) => {
            state.TaskData = action.payload;
        },
        deletefail: (state) => {
            return state;
        },
    },
});

export const {
    taskAddFailure,
    taskAddedSuccessfully,
    getAllTaskFailure,
    getAllTaskSuccess,
    deleteSuccess,
    deletefail,
    editTaskSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;

export const addTask = (name, desc, deadline, id) => async (dispatch) => {
    const taskData = {
        name,
        desc,
        deadline,
        id,
    };

    const response = await axios.post('https://project-server-naci.onrender.com/task/add', taskData);

    if (response.status === 200) {
        // Handle success
        localStorage.setItem('task', JSON.stringify(response.data));
        dispatch(taskAddedSuccessfully(response.data));
        toast.success('Task added successfully');
        window.location.reload();
    } else {
        // Handle the error
        dispatch(taskAddFailure());
        toast.error('Failed to add task');
    }
};



export const getAllTasks = (token, id) => async (dispatch) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            id,
        },
    };

    try {
        const response = await axios.get(
            'https://project-server-naci.onrender.com/task/tasks',
            config
        );

        if (response) {
            dispatch(getAllTaskSuccess(response.data));
        }
    } catch (error) {
        if (error.response.status === 400) {
            dispatch(getAllTaskFailure());
        }
    }
};

export const arrowClick = (item, string) => async () => {
    let taskData = {
        id: item._id,
        status: item.status,
        string,
    };

    try {
        let response = await axios.put(
            `https://project-server-naci.onrender.com/task/${taskData.id}`,
            taskData
        );

        if (response) {
            window.location.reload();
        }
    } catch (error) {
        console.log(error);
    }
};


export const editTask = (taskData) => async (dispatch) => {
    try {
        // Make an Axios PUT request to update the task data
        const response = await axios.put(
            `https://project-server-naci.onrender.com/task/${taskData.id}`,
            taskData
        );

        if (response.status === 200) {
            // Handle success
            dispatch(editTaskSuccess(response.data)); // Update the task in the store
            toast.success('Task updated successfully');
        } else {
            // Handle the error
            toast.error('Failed to update task');
        }
    } catch (error) {
        console.log(error);
        // Handle other errors if needed
        toast.error('Failed to update task');
    }
};

export const deleteItem = (id) => async (dispatch) => {
    let res = await axios.delete(`https://project-server-naci.onrender.com/task/${id}`);

    if (res) {
        dispatch(deleteSuccess());
        toast.success('Task deleted successfully');

        window.location.reload();
    } else {
        dispatch(deletefail());
    }
};
