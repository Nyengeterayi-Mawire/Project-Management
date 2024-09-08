import Closewidgetbutton from "./closeWidgetButton";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { IoClose } from "react-icons/io5";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {addPlan} from '../features/plansSlice';
import { displayAddTask } from "../features/tasksSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Addschedule = ({display,displayFunction}) => {
    const [name,setName] = useState('');
    const [value, setValue] = React.useState(dayjs(new Date()));
    const [description,setDescription] = useState('');    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const projectID = useSelector(state=>state.projects.projectID);
    // const display = useSelector(state=>state.toDoTasks.addTask);

    const handleConfirm = () =>{
        if(name.trim()=== ''){
            return console.log('Description is required')
        }     
        axios.post('http://localhost:3001/plan/create/'+projectID,{name,date : value.$d,complete : false},{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            };
            console.log(res.data) ;
            dispatch(addPlan(res.data)) ;
            displayFunction(false); 
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
            console.log(error)
        });
        
    } 
    // console.log(display)
    return (
        <div className="addTask" style={display?{display:'initial'}:{display:'none'}}>
            <div style={{width:'fit-content',margin:'auto',padding:'40px',position:'relative'}}>
                <div className="widget"> 
                    <div className="labelInput" id='addTaskName'>
                        <label>Name :</label>
                        <input placeholder="enter name..." value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>                   
                    {/* <div className="labelInput" id='addTaskDescription'>
                        <label>Description :</label>
                        <input placeholder="enter description..." value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </div> */}
                    <div style={{width:'fit-content',margin:'auto',paddingBottom:'15px'}}>
                        <DemoContainer components={['DatePicker', 'DatePicker'] }  >
                            {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
                            <DatePicker
                            label="Controlled picker"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            />
                        </DemoContainer>
                    </div>
                   
                    <div style={{width:'fit-content',margin:'auto'}}>
                        <button className="submit" onClick={handleConfirm}>Confirm</button>
                    </div>
                    
                </div>
                <div className="exitButton">
                    <button onClick={()=>displayFunction(false)}><IoClose style={{margin:'auto'}} size={'2.5em'} color="white"/></button>
                </div>
            </div>
        </div>
    )
}
export default Addschedule;