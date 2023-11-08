import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initalProject = localStorage.getItem('project')
    ? JSON.parse(localStorage.getItem('project'))
    : null;

const initialState = {
    ProjectData: initalProject,
    AllProjects: {},
};

export const projectSlice = createSlice({
    name: 'Project',
    initialState,

    reducers: {
        projectAddedSuccessfully: (state, action) => {
            state.ProjectData = action.payload;
        },
        projectAddFailure: (state) => {
            return state;
        },
        getAllProjectSuccess: (state, action) => {
            state.AllProjects = action.payload;
        },
        getAllProjectFailure: (state) => {
            return state;
        },

        editProjectSuccess: (state, action) => {
            state.ProjectData = action.payload;
        },

        deleteSuccess: (state, action) => {
            state.ProjectData = action.payload;
        },
        deletefail: (state) => {
            return state;
        },
    },
});

export const {
    projectAddFailure,
    projectAddedSuccessfully,
    getAllProjectFailure,
    getAllProjectSuccess,
    deleteSuccess,
    deletefail,
    editProjectSuccess,
} = projectSlice.actions;

export default projectSlice.reducer;

export const addProject = (name, desc, department, startDate, endDate, id) => async (dispatch) => {
    const projectData = {
        name,
        desc,
        department,
        startDate,
        endDate,
        id,
    };

    const response = await axios.post('https://project-server-naci.onrender.com/project/add', projectData);

    if (response.status === 200) {
        // Handle success
        localStorage.setItem('project', JSON.stringify(response.data));
        dispatch(projectAddedSuccessfully(response.data));
        toast.success('Project added successfully');
        window.location.reload();
    } else {
        // Handle the error
        dispatch(projectAddFailure());
        toast.error('Failed to add project');
    }
};



export const getAllProjects = (token, id) => async (dispatch) => {
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
            'https://project-server-naci.onrender.com/project/projects',
            config
        );

        if (response) {
            dispatch(getAllProjectSuccess(response.data));
        }
    } catch (error) {
        if (error.response.status === 400) {
            dispatch(getAllProjectFailure());
        }
    }
};

export const arrowClick = (item, string) => async () => {
    let projectData = {
        id: item._id,
        status: item.status,
        string,
    };

    try {
        let response = await axios.put(
            `https://project-server-naci.onrender.com/project/${projectData.id}`,
            projectData
        );

        if (response) {
            window.location.reload();
        }
    } catch (error) {
        console.log(error);
    }
};


export const editProject = (projectData) => async (dispatch) => {
    try {
        // Make an Axios PUT request to update the project data
        const response = await axios.put(
            `https://project-server-naci.onrender.com/project/${projectData.id}`,
            projectData
        );

        if (response.status === 200) {
            // Handle success
            dispatch(editProjectSuccess(response.data)); // Update the Project in the store
            toast.success('Project updated successfully');
        } else {
            // Handle the error
            toast.error('Failed to update project');
        }
    } catch (error) {
        console.log(error);
        // Handle other errors if needed
        toast.error('Failed to update project');
    }
};

export const deleteItem = (id) => async (dispatch) => {
    let res = await axios.delete(`https://project-server-naci.onrender.com/project/${id}`);

    if (res) {
        dispatch(deleteSuccess());
        toast.success('Project deleted successfully');

        window.location.reload();
    } else {
        dispatch(deletefail());
    }
};
