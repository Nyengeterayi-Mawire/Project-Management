import { configureStore } from '@reduxjs/toolkit'
import toDoTasksReducer from './features/tasksSlice'
import inProgressReducer from './features/inProgressSlice'
import completedTasksReducer from './features/completedSlice'
import projectReducer from './features/projectSlice'
import reminderReducer from './features/remindersSlice'
import notesReducer from './features/notesSlice'
import plansReducer from './features/plansSlice'

export const store = configureStore({
  reducer: {
    toDoTasks : toDoTasksReducer,
    inProgressTasks : inProgressReducer,
    completedTasks : completedTasksReducer,
    projects : projectReducer,
    reminders : reminderReducer,
    plans : plansReducer,
    notes : notesReducer
  },
})
