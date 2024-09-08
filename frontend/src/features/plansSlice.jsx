import { createSlice } from "@reduxjs/toolkit";

const initialState = {value:[]}; 

const plansSlice = createSlice({
    name : 'plans',
    initialState,
    reducers : {
        setPlans : (state,action) => {
            state.value = action.payload
        }, 
        removePlan : (state,action) => {
            state.value = state.value.filter(plan=>plan._id != action.payload)
        },
        addPlan : (state,action) => {
            state.value = [{...action.payload},...state.value]
        },
        completePlan : (state,action) => {
            state.value[action.payload].complete = !state.value[action.payload].complete
        }
        // displayCompleted : (state,action)=> {
        //     console.log(action.payload)
        //     state.value[action.payload.id].options = !state.value[action.payload.id].options
        // }
    }
})

export const {setPlans,removePlan,addPlan,completePlan} = plansSlice.actions; 

export default plansSlice.reducer;