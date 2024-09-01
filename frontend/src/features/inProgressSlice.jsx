import { createSlice } from "@reduxjs/toolkit";

// {id:2,name:'Hero section',description:'the hero section should be minimalistic with sheek design',priority:'Medium Priority',members:[],status:'todo',options:false},
// {id:3,name:'Hero section',description:'the hero section should be minimalistic with sheek design',priority:'Low Priority',members:[],status:'inProgress',options:false}
const initialState = {value:[]}; 

export const inProgressTaskSllice = createSlice({
    name : 'inProgressTask',
    initialState,
    reducers : {
        setInProgress : (state,action) => {
            state.value = action.payload;
        },
        removeInProgress : (state,action) => {
            state.value = state.value.filter(task=>task._id != action.payload)
        },
        addInProgress : (state,action) => {
            state.value = [{...action.payload,options:false},...state.value]
        },
        displayInProgress : (state,action)=> {
            console.log(action.payload)
            state.value[action.payload.id].options = !state.value[action.payload.id].options
        }
    }
}); 

export const {setInProgress,displayInProgress,addInProgress,removeInProgress} = inProgressTaskSllice.actions ;

export default inProgressTaskSllice.reducer;