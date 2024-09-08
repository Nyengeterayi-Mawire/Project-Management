import { useDispatch,useSelector } from "react-redux";
import { addCompleted } from "../features/completedSlice"; 
import { addToDo } from "../features/tasksSlice";
import { removeInProgress,displayInProgress } from "../features/inProgressSlice";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Inprogresstasks = () => {
    const inProgressTasks = useSelector(state=>state.inProgressTasks.value);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const deleteInProgress = (id) => {
        axios.delete('http://localhost:3001/task/remove/'+id,{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(removeInProgress(id))
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
            dispatch(removeInProgress(task._id))
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })
        
    }
    const moveToCompleted = (id,task) => {        
        axios.patch('http://localhost:3001/task/update/'+ task._id,{status:'completed'},{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(addCompleted(task))
            dispatch(removeInProgress(task._id))
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })
    }
    
    return (
        <div className="section" id='inProgress'>
                    {/* <p className="header">In Progress</p> */}
                    <div>
                    {inProgressTasks && inProgressTasks.map((task,index)=>{
                        return < div key={task.id} style={{padding:'10px 0px'}}>
                            <div key={task.id} className="task">
                                <p className="priority" style={task.priority === 'High Priority'? {backgroundColor:'crimson'}:task.priority === 'Medium Priority'?{backgroundColor:'#F5CD47'}:{backgroundColor:'#4BCE97'}}>{task.priority}</p> 
                                <p className="taskName">{task.name}</p> 
                                <div className="moreIcon">
                                    <button className="optionsIcon" onClick={()=>dispatch(displayInProgress({id:index}))}>
                                        <HiDotsVertical/>  
                                    </button> 
                                    <div className="options" style={task.options ? {display:'initial' } : {display:'none'}}>
                                        <button onClick={()=>{
                                            moveToToDo(task._id,task)
                                        }}>move to to do</button>
                                        <button onClick={()=>{
                                            moveToCompleted(task._id,task)
                                            }}>move to completed</button>
                                        <button>view</button>
                                        <button onClick={()=>deleteInProgress(task._id)}>delete</button>
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
export default Inprogresstasks;