import { useEffect, useState } from "react";
import Addtask from "./addTask";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { setCompleted, displayCompleted,addCompleted, removeCompleted } from "../features/completedSlice";
import { displayToDo,addToDo,removeToDo,displayAddTask,setToDo } from "../features/tasksSlice";
import { addInProgress, displayInProgress,removeInProgress,setInProgress } from "../features/inProgressSlice";
import Viewtask from "./viewTask";
import axios from "axios";
import Todotasks from "./todoTasks";
import Inprogresstasks from "./inProgressTasks";
import Completedtasks from "./completedTasks";
import Loader from "./loader";

const Projecttasks = () => {
    const dispatch = useDispatch();
    
    const [displayAddTask,setDisplayAddTask] = useState(false);  
    const [displayViewTask,setDisplayViewTask] = useState(false);
    const [viewTask,setViewTask] = useState({id:0,name:'',description:'',priority:'',members:[],status:'',options:false})  ;
    const [loading,setLoading] = useState(true);
    const inProgressTasks = useSelector(state=>state.inProgressTasks.value);
    const completedTasks = useSelector(state=>state.completedTasks.value);
    const toDoTasks = useSelector(state=>state.toDoTasks.value);
    const projectID = useSelector(state=>state.projects.projectID);

    useEffect(()=>{        
        axios.get('http://localhost:3001/task/'+projectID,{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            dispatch(setToDo(res.data.idletasks));
            dispatch(setInProgress(res.data.pendingtasks));
            dispatch(setCompleted(res.data.completedtasks));
            // setInterval(()=>setLoading(false),1000)     
            setLoading(false)       
            console.log(res.data)})
        
    },[projectID]);    
    
    const deleteInProgress = (id) => {
        axios.delete('http://localhost:3001/task/remove/'+id,{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(removeInProgress(id))
        })
    }
    const deleteCompleted = (id) => {
        axios.delete('http://localhost:3001/task/remove/'+id,{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(removeCompleted(id))
        })
    } 

    return (
        loading ? <Loader/> : <div className="projectTasks">
            <div  style={{width:'100%',margin:'auto'}}>  
                <div className="headersDiv" style={{display:'flex'}}>
                    <p className="header"> To Do</p> 
                    <p className="header">In Progress</p>
                    <p className="header">Completed</p>
                </div> 
                <div className="taskScroll" style={{width:'100%',margin:'auto',display:'flex'}}>
                    <Todotasks/>                
                    <Inprogresstasks/>                
                    <Completedtasks/>
                </div>              
               
            </div>            
            <Addtask display={displayAddTask} setDisplay={setDisplayAddTask} tasks={toDoTasks} projectID={projectID}/>
            <Viewtask display={displayViewTask} setDisplay={setDisplayViewTask} task={viewTask}/>
        </div>
        
    )
} 
export default Projecttasks