import { useDispatch,useSelector } from "react-redux";
import { addCompleted } from "../features/completedSlice"; 
import { removeToDo,displayToDo } from "../features/tasksSlice";
import { addInProgress } from "../features/inProgressSlice";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todotasks = () => {
    const toDoTasks = useSelector(state=>state.toDoTasks.value);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const deleteTodo = (id) => {
        axios.delete('http://localhost:3001/task/remove/'+id,{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(removeToDo(id))
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })
    }
    const moveToDo = (id,task) => {        
        axios.patch('http://localhost:3001/task/update/'+ id,{status:'pending'},{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(addInProgress(task))
            dispatch(removeToDo(id))
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
            dispatch(removeToDo(task._id))
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })
    }
    return (
        <div className="section" id='toDo'>
                    {/* <p className="header"> To Do</p>  */}
                    <div >
                    {toDoTasks && toDoTasks.map((task,index)=>{
                        return < div key={task.id} style={{padding:'10px 0px'}}>
                            <div key={task.id} className="task">
                                <p className="priority" style={task.priority === 'High Priority'? {backgroundColor:'crimson'}:task.priority === 'Medium Priority'?{backgroundColor:'#F5CD47'}:{backgroundColor:'#4BCE97'}}>{task.priority}</p> 
                                <p className="taskName">{task.name}</p>   
                                <div className="moreIcon">
                                    <button className="optionsIcon" onClick={()=>dispatch(displayToDo({id:index}))}>
                                        <HiDotsVertical/>  
                                    </button> 
                                    <div className="options" style={task.options ? {display:'inline' } : {display:'none'}}>
                                        <button onClick={()=>{
                                            moveToDo(task._id,task)                                            
                                        }}>move to in progress</button>
                                        <button onClick={()=>{ moveToCompleted(task._id,task)}}>move to completed</button>
                                        <button>view</button>
                                        <button onClick={()=>deleteTodo(task._id)}>delete</button>
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
export default Todotasks;