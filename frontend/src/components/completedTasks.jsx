import { useDispatch,useSelector } from "react-redux";
import { removeCompleted,displayCompleted } from "../features/completedSlice"; 
import { addToDo } from "../features/tasksSlice";
import { addInProgress } from "../features/inProgressSlice";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Completedtasks = () => {
    const completedTasks = useSelector(state=>state.completedTasks.value);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const deleteCompleted = (id) => {
        axios.delete('http://localhost:3001/task/remove/'+id,{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(removeCompleted(id))
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })
    } 
    const moveToInProgress = (id,task) => {        
        axios.patch('http://localhost:3001/task/update/'+ task._id,{status:'pending'},{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(addInProgress(task))
            dispatch(removeCompleted(task._id))
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })
    }
    const moveToToDo = (id,task) => {        
        axios.patch('http://localhost:3001/task/update/'+ task._id,{status:'idle'},{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(addToDo(task))
            dispatch(removeCompleted(task._id))
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })
    }
    
    return (
        <div className="section" id='completed'>
                    {/* <p className="header">Completed</p> */}
                    <div>
                    {completedTasks && completedTasks.map((task,index)=>{
                        return < div key={index} style={{padding:'10px 0px'}}>
                            <div key={task.id} className="task">
                                <p className="priority" style={task.priority === 'High Priority'? {backgroundColor:'crimson'}:task.priority === 'Medium Priority'?{backgroundColor:'#F5CD47'}:{backgroundColor:'#4BCE97'}}>{task.priority}</p> 
                                <p className="taskName">{task.name}</p> 
                                <div className="moreIcon">                                   
                                    <button className="optionsIcon" onClick={()=>dispatch(displayCompleted({id:index}))}>
                                        <HiDotsVertical/>  
                                    </button> 
                                    <div className="options" style={task.options ? {display:'inline-block'} : {display:'none'}}>
                                        <button onClick={()=>{ moveToToDo(task._id,task) }}>move to to do</button>
                                        <button onClick={()=>{               
                                            moveToInProgress(task._id,task)
                                        }}>move to in progress</button>
                                        <button onClick={()=>{
                                            setViewTask(task);
                                            setDisplayViewTask(true)
                                        }}>view</button>
                                        <button onClick={()=>{deleteCompleted(task._id)}}>delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    }                     
                    )}
                    </div>
                </div>
    )
}
export default Completedtasks;