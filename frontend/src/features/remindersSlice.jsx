import { createSlice } from "@reduxjs/toolkit";

const initialState = {value:[{description:'Doctors appointment',completed:false},
    {description:'Devops meeting at 2pm',completed : false}
],addReminder : false};

export const remindersSlice = createSlice({
    name : 'reminders',
    initialState,
    reducers : {
        setReminders : () => {

        },
        addReminder : (state,action) => {
            state.value=[action.payload,...state.value]
        }, 
        deleteReminder : (state,action) => {
            state.value = state.value.filter(reminder => reminder.id != action.payload)
        },
        completeStatus : (state,action) => {
            console.log(action.payload,'working')
            state.value[action.payload].completed = !state.value[action.payload].completed 
        }, 
        displayAddReminder : (state) => {
            state.addReminder = !state.addReminder
        }
    }
})

export const {setReminders,addReminder,deleteReminder,completeStatus,displayAddReminder} = remindersSlice.actions;

export default remindersSlice.reducer;