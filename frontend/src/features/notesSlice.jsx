import { createSlice } from "@reduxjs/toolkit";

const initialState = {value:[]}; 

const notesSlice = createSlice({
    name : 'notes',
    initialState,
    reducers : {
        setNotes : (state,action) => {
            state.value = action.payload
        }, 
        removeNote : (state,action) => {
            state.value = state.value.filter(plan=>plan._id != action.payload)
        },
        addNote : (state,action) => {
            state.value = [{...action.payload},...state.value]
        },
        
    }
})

export const {setNotes,removeNote,addNote} = notesSlice.actions; 

export default notesSlice.reducer;