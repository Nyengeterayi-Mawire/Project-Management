import Closewidgetbutton from "./closeWidgetButton";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { addToDo, displayAddTask} from "../features/tasksSlice";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
const Addtask = ({projectID}) => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [priority,setPriority] = useState('Low Priority');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const display = useSelector(state=>state.toDoTasks.addTask);

    const handleConfirm = () =>{
        if(name.trim()=== ''){
           return console.log('Name is required')
        }  
        axios.post('http://localhost:3001/task/create',{projectID,name,description,priority,status:'idle',options:false},{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(addToDo(res.data))
            dispatch(displayAddTask(false))
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })     
        
    }
    return (
        <div className="addTask" style={display?{display:'initial'}:{display:'none'}}>
            <div style={{width:'fit-content',margin:'auto',padding:'40px',position:'relative'}}>
                <div className="widget">
                    <div className="labelInput" id='addTaskName'>
                        <label>Name :</label>
                        <input placeholder="enter name..." value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="labelInput" id='addTaskDescription'>
                        <label>Description :</label>
                        <textarea placeholder="enter description..." value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <div style={{paddingBottom:'10px'}}>
                        <label>Priority : </label>
                        <select onChange={(e)=>setPriority(e.target.value)}>                    
                            <option value='Low Priority'>Low</option>                    
                            <option value='Medium Priority'>Medium</option>
                            <option value='High Priority'>High</option>
                        </select>
                    </div>
                    <div style={{width:'fit-content',margin:'auto'}}>
                        <button className="submit" onClick={handleConfirm}>Confirm</button>
                    </div>
                    
                </div>
                <Closewidgetbutton  />
            </div>
        </div>
    )
}
export default Addtask