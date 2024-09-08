import Closewidgetbutton from "./closeWidgetButton";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { addProject } from "../features/projectSlice";
import { displayAddTask } from "../features/tasksSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Addproject = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const navigate = useNavigate();
    // const [priority,setPriority] = useState('Low Priority');
    const dispatch = useDispatch();
    const display = useSelector(state=>state.toDoTasks.addTask);
    const userID = useSelector(state=>state.toDoTasks.user._id);

    const handleConfirm = () =>{
        if(name.trim()=== ''){
           return console.log('Name is required')
        } 
        axios.post('http://localhost:3001/project/create',{name,description,options:false,userID},{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(addProject(res.data))
            dispatch(displayAddTask(false))
        }).catch(error=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })      
        
    } 
    // console.log(display)
    return (
        <div className="addTask" style={display?{display:'initial'}:{display:'none'}}>
            <div style={{width:'fit-content',margin:'auto',padding:'40px',position:'relative',border:'1px solid red'}}>
                <div className="widget">
                    <div className="labelInput" id='addTaskName'>
                        <label>Name :</label>
                        <input placeholder="enter name..." value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="labelInput" id='addTaskDescription'>
                        <label>Description :</label>
                        <textarea placeholder="enter description..." value={description} onChange={(e)=>setDescription(e.target.value)}/>
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
export default Addproject