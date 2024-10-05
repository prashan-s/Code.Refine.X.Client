import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
    projectID: number;
    projectName: string;
    description: string;
    createdDate: string;
}

interface ProjectsState {
    projectsList: Project[];
}

const initialState: ProjectsState = {
    projectsList: [], // Initially, the projects list is empty
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.projectsList = action.payload;
        },
        clearProjects: (state) => {
            state.projectsList = [];
        },
    },
});

export const { setProjects, clearProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
