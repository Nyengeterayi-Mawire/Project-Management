import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store.jsx'
import {Provider} from 'react-redux'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <Provider store={store}> 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
        <App />
        </BrowserRouter>  
      </LocalizationProvider>    
    </Provider>
  </StrictMode>,
)
