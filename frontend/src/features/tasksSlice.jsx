import { createSlice } from "@reduxjs/toolkit";

const initialState = {value:[],addTask:false,user:{}}; 

export const toDoTaskSllice = createSlice({
    name : 'toDoTasks',
    initialState,
    reducers : {
        setToDo : (state,action) => {
            state.value = action.payload;
        },
        setUser : (state,action) => {
            state.user = action.payload;
        },
        removeToDo : (state,action) => {
            state.value = state.value.filter(task=>task._id != action.payload)
        },
        addToDo : (state,action) => {
            state.value = [{...action.payload,options:false},...state.value]
        },
        displayToDo : (state,action)=> {
            console.log(action.payload)
            state.value[action.payload.id].options = !state.value[action.payload.id].options
        }, 
        displayAddTask : (state,action) => {
            state.addTask = action.payload
        }
    }
}); 

export const {setToDo,displayToDo,addToDo,removeToDo,displayAddTask,setUser} = toDoTaskSllice.actions ;

export default toDoTaskSllice.reducer;