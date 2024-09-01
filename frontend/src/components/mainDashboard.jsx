import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Addproject from './addProject' 
import { displayProjectOptions,removeProject,set, setProjectID} from '../features/projectSlice';
import { useEffect, useState } from "react";
import axios from 'axios';
import Authorizedelete from "./authorizeDelete";
const Maindashboard = () => {
    const [deleteProject,setDeleleteProject] = useState({});
    const [displayAuthorizeDelete,setDisplayAuthorizeDelete] = useState(false);
    const projects = useSelector(state => state.projects.value);
    const user = useSelector(state => state.toDoTasks.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(user)
        axios.get('http://localhost:3001/project/user/'+user._id,{headers : {Authorization:`${localStorage.getItem('token')}`}}).then((res)=>{
            console.log(res.data)
            if(res.data.expired){
                localStorage.clear();
                navigate('/login');
            }
            dispatch(set(res.data))
        })
    },[user])

    const handleProjectSelect=(id)=>{
        dispatch(setProjectID(id));
    }

    const handleDeleteProject = (project) => {
        setDeleleteProject(project);
        setDisplayAuthorizeDelete(true);
    }
    return(
        <div className="mainDashboard">
            <div className='innerMaindashboard' style={{width:'90%',margin:'auto'}}>
                {projects && projects.map((project,index)=>{ 
                    console.log(project.created)
                    return <div key={project._id} style={{position:'relative',margin:'20px 0px 0px 20px'}}>
                                <Link to='/project/dashboard' className="link" onClick={()=>{handleProjectSelect(project._id)}} state={project._id}><div key={project.id} className="project">
                                        <p style={{marginTop:'40px'}}>{project.name}</p>   
                                                                                        
                                    </div>
                                </Link>
                                <div className="moreIcon" style={{display:'flex'}}>                                    
                                    <button className="optionsIcon" onClick={()=>handleDeleteProject(project)} >
                                        <MdDelete size={'1.5em'}/>
                                    </button> 
                                    {/* <button className="optionsIcon" onClick={()=>dispatch(displayProjectOptions({id:index}))}>
                                        <HiDotsVertical size={'1.5em'}/>  
                                    </button> 
                                    <div className="options" style={project.options ? {display:'initial' } : {display:'none'}}>                                        
                                        <button>view</button>
                                        <button onClick={()=>dispatch(removeProject(project._id))}>delete</button>
                                    </div>  */}
                                </div> 

                            </div>
                })}
            </div>
            <Addproject /> 
            <Authorizedelete project={deleteProject} display={displayAuthorizeDelete} displayFunction={setDisplayAuthorizeDelete}/>
        </div> 
        
    )
}
export default Maindashboard