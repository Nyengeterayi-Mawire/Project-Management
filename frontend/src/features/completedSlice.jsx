import { createSlice } from "@reduxjs/toolkit";
// {id:1,name:'Hero section',description:'the hero section should be minimalistic with sheek design',priority:'Low Priority',members:[],status:'inProgress',options:false}
const initialState = {value:[]}; 

export const completedTaskSllice = createSlice({
    name : 'completedTask',
    initialState,
    reducers : {
        setCompleted : (state,action) => {
            state.value = action.payload;
        },
        removeCompleted : (state,action) => {
            state.value = state.value.filter(task=>task._id != action.payload)
        },
        addCompleted : (state,action) => {
            state.value = [{...action.payload,options:false},...state.value]
        },
        displayCompleted : (state,action)=> {
            console.log(action.payload)
            state.value[action.payload.id].options = !state.value[action.payload.id].options
        }
    }
}); 

export const {setCompleted,displayCompleted,addCompleted,removeCompleted} = completedTaskSllice.actions ;

export default completedTaskSllice.reducer;