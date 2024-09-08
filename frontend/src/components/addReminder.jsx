import Closewidgetbutton from "./closeWidgetButton";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { displayAddReminder,addReminder } from "../features/remindersSlice";
import { displayAddTask } from "../features/tasksSlice";
import { addPlan } from "../features/plansSlice";
import { addNote } from "../features/notesSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addreminder = () => {    
    const [description,setDescription] = useState('');    
    const [name,setName] = useState('');    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const display = useSelector(state=>state.toDoTasks.addTask);
    const projectID = useSelector(state=>state.projects.projectID);

    const handleConfirm = () =>{
        if(description.trim()=== '' && name.trim()===''){
            return console.log('Description or Name is required')
        } 
        axios.post('http://localhost:3001/note/create',{name,description,completed:false,projectID},{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(addNote({name,description,completed:false,projectID}))
            dispatch(displayAddTask(false))
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })     
        
    } 
    // console.log(display)
    return (
        <div className="addTask" style={display?{display:'initial'}:{display:'none'}}>
            <div style={{width:'fit-content',height:'fit-content',margin:'auto',padding:'30px',position:'relative'}}>
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
export default Addreminder;