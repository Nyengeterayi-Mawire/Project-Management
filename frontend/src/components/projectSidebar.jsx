import { AiFillHome } from "react-icons/ai";
import { FaTasks } from "react-icons/fa"; 
import { TbLogout2 } from "react-icons/tb";
import { GrProjects } from "react-icons/gr";
import {Link, useNavigate} from 'react-router-dom';
import { setPlans } from "../features/plansSlice";
import { useDispatch } from "react-redux";
import { setNotes } from "../features/notesSlice";
import { setInProgress } from "../features/inProgressSlice";
import { setCompleted } from "../features/completedSlice";
import { setToDo } from "../features/tasksSlice";
import { useState } from "react";
const Projectsidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [display,setDisplay] = useState(false);
    const logout = ()=> {
        dispatch(setPlans([]));
        dispatch(setNotes([]));
        dispatch(setInProgress([]));
        dispatch(setCompleted([]));
        dispatch(setToDo([]));
        
    }
    return (
        <div className="projectSidebar">
            <ul> 
                <Link className="link" to='/project' >
                    <li>
                        <div style={{padding: '10px'}}>
                            <GrProjects style={{color:'white'}} size={'1.5em'}/>
                            
                        </div>                    
                        <p>Projects</p>
                    </li>
                </Link>
                <div>
                    <Link className="link" to='/project/dashboard'>
                        <li>
                            <div style={{padding: '10px'}}>
                                <AiFillHome style={{color:'white'}} size={'1.5em'}/> 
                            </div>                    
                            <p>Dashboard</p>
                        </li>
                    </Link>
                    <Link className="link" to='/project/tasks'>
                        <li>
                            <div style={{padding: '10px'}}>
                                <FaTasks style={{color:'white'}} size={'1.5em'}/> 
                            </div>                    
                            <p>Tasks</p>
                        </li>
                    </Link>
                </div>
                
                
                <div style={{marginTop:'60vh'}}>                
                <Link className="link" to='/login' onClick={logout} >
                    <li>
                        <div style={{padding: '10px'}}>
                            {/* <FaTasks style={{color:'white'}} size={'1.5em'}/> */}
                            <TbLogout2 style={{color:'white'}} size={'1.5em'}/> 
                        </div>                    
                        <p>Logout</p>
                    </li>
                </Link>
                </div>
                
            </ul>
        </div>
    )
} 
export default Projectsidebar;