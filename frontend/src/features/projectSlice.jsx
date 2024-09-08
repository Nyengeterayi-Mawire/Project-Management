import { createSlice } from "@reduxjs/toolkit";

// {id: 1, name : 'To-Do', description : 'A to do list project created in react js',options:false},
//     {id: 2, name : 'Veterinary UI', description : 'UI design for the Vet Orc system',options:false},
//     {id: 3, name : 'Bank System', description : 'Bank system planning and design',options:false}

const initialState = {value:[],addProject:false,projectID:'',searchList:[],displaySearch:false}; 

export const projectsSllice = createSlice({
    name : 'projects',
    initialState,
    reducers : {
        set : (state,action) => {
            state.value = action.payload;
            state.searchList = action.payload;
        },
        setProjectID : (state,action) => {
            state.projectID = action.payload;
        },
        removeProject : (state,action) => {
            state.value = state.value.filter(task=>task._id != action.payload)
        },
        addProject : (state,action) => {
            state.value = [{...action.payload,options:false},...state.value]
        },
        displayProjectOptions : (state,action)=> {
            console.log(action.payload)
            state.value[action.payload.id].options = !state.value[action.payload.id].options
        }, 
        displayAddProject : (state,action) => {
            console.log('entering')
            state.addProject = action.payload
        },
        displaySearch : (state)=>{
            state.displaySearch = !state.displaySearch
        },
        search : (state,action)=>{
            state.searchList= state.value.filter(project=>project.name.includes(action.payload))
        }
    }
}); 

export const {set,displayProjectOptions,addProject,removeProject,displayAddProject,setProjectID,search,displaySearch} = projectsSllice.actions ;

export default projectsSllice.reducer;