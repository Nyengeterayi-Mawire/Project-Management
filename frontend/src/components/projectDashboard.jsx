import { useState,useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { FaCircleCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import {useSelector,useDispatch} from 'react-redux';
import { completeStatus,displayAddReminder } from '../features/remindersSlice';
import {setPlans,completePlan, removePlan} from '../features/plansSlice';
import { displayAddTask } from '../features/tasksSlice';
import Addreminder from './addReminder';
import axios from 'axios';
import Addschedule from './addSchedule';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Note from './note';
import { setNotes } from '../features/notesSlice';
import { useNavigate } from 'react-router-dom';
import Statistics from './statistics';
import Loader from './loader';



const Projectdashboard = () => {
    const [task,setTask] = useState(false);
    const [value, setValue] = useState(dayjs(new Date()));
    const [displaySchedule,setDisplaySchedule] = useState(false);
    const [displayNote,setDisplayNote] = useState(false);
    const [plansLoading,setPlansLoading] = useState(true);
    const [notesLoading,setnotesLoading] = useState(true);
    const [statsLoading,setstatsLoading] = useState(true);
    const [taskStats,setTaskStats] = useState({idletasks:0,pendingtasks:0,completedtasks:0,totalTasks:0})
    const [percentage,setPercentage] = useState(0);
    const [note,setNote] = useState({name : '',description:''});
    const reminders = useSelector(state=>state.notes.value);
    const plans = useSelector(state=>state.plans.value);
    const projectID = useSelector(state=>state.projects.projectID);
    const dispatch = useDispatch();  
    const navigate = useNavigate();
    
    
    useEffect(()=>{        
        axios.post('http://localhost:3001/plan/'+projectID,{date:value.$d},{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{                       
            dispatch(setPlans(res.data));
            setPlansLoading(false)
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }            
        })
        
    },[value,projectID])

    useEffect(()=>{
        axios.get('http://localhost:3001/note/'+projectID,{headers : {Authorization:`${localStorage.getItem('token')}`}},{projectID,date:value.$d}).then(res=>{  
            if(res.data.error){
               console.error(res.data.error)
            }else{
                dispatch(setNotes(res.data));
                setnotesLoading(false);
            }
            
        }).catch((error)=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })

        axios.get('http://localhost:3001/task/stats/'+projectID,{headers:{Authorization:localStorage.getItem('token')}}).then(res=>{
            if(res.data.error){
                return console.error(res.data.error)
            }else{                
                setTaskStats(res.data);
                setPercentage(res.data.totalTasks/res.data.completedtasks);
                setstatsLoading(false);
            }
        })
    },[projectID])

    // const completeReminder = (index) => {
    //     dispatch(completeStatus(index))
    // } 

    const handleCompletePlan = (index,id) => {
        axios.patch('http://localhost:3001/plan/update/'+id,{data:'data'},{headers : {Authorization:`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            dispatch(completePlan(index))
        })
    }

    const handleDisplayNote = (noteData) => {
        setNote(noteData); 
        setDisplayNote(true);
    }

    const handleDeletePlan = (id) => {
        axios.delete('http://localhost:3001/plan/'+id,{headers:{Authorization:localStorage.getItem('token')}}).then(res=>{
            if(res.data.error){
                return console.error(res.data.error);
            }else{
                dispatch(removePlan(id));
            }
        }).catch(error=>{
            if(error.response.data.expired){
                localStorage.clear();
                navigate('/login');
            }
        })
    }
    return (
        <div className="projectDashboard" style={{width : '84%'}}>
            { !plansLoading && !notesLoading && !statsLoading ? <div>                
                <div style={{display:'flex'}}>
                    <div className="widget" id='calendar' >
                    <p className='header'>Calendar</p>
                    <DemoContainer components={['DateCalendar', 'DateCalendar']}>                       
                        <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />                        
                    </DemoContainer>
                        
                    </div>

                    <div className="widget" id='comments' style={{position:'relative'}}>
                        <p className='header'>Schedule</p>
                        <div className='scrollDiv'>
                            {plans && plans.map((plan,index) => {
                                return  <div key={index} className='singlePlan'>
                                            <button onClick={()=>handleCompletePlan(index,plan._id)} ><FaCircleCheck size={'1.5em'} style={plan.complete ? {color:'yellow'} : {color:'black'}}/></button>
                                            <p style={plan.complete ? {textDecoration:'line-through'} : {textDecoration:'none'}}>{plan.name}</p>
                                            <button className="optionsIcon" onClick={()=>handleDeletePlan(plan._id)} style={{marginLeft:'5px'}}>
                                                <MdDelete size={'1.5em'}/>
                                            </button> 
                                        </div>                            
                            }) } 
                        </div>
                        
                        <div style={{display:'flex',width:'fit-content',position:'absolute',top:'7%',right:'5%'}}>
                            <button className='addReminder' onClick={()=>setDisplaySchedule(true)}>
                                <FaPlus size={'1.5em'}></FaPlus> 
                            </button>
                            
                            {/* <div >
                                <button className="optionsIcon">
                                    <HiDotsVertical size={'1.5em'}/>  
                                </button> 
                                <div className="options" style={task.options ? {display:'inline' } : {display:'none'}}>                                        
                                    <button>view</button>                                    
                                </div>
                            </div>           */}
                        </div>
                    </div> 

                    <div className="widget" id='reminder'>
                        
                        {!displayNote ? <><p className='header'>Notes</p>
                            <div className='scrollDiv'>
                            {reminders && reminders.map((reminder,index) => {
                            
                            return  <div key={index} className='singleReminder' onClick={()=>handleDisplayNote(reminder)}>
                                        {/* <button onClick={()=>completeReminder(index)} ><FaCircleCheck size={'1.5em'} style={reminder.completed ? {color:'yellow'} : {color:'black'}}/></button> */}
                                         <p style={{fontWeight:'550',fontSize:'16px'}}>{reminder.name}</p> 
                                         <p>{reminder.description}</p>                                          
                                        <button className='addReminder'><MdOutlineArrowForwardIos size={'1.5em'} color='white'/></button>                                        
                                     </div>                            
                        })} 
                        </div>
                        
                        <div style={{display:'flex',width:'fit-content',position:'absolute',top:'7%',right:'5%'}}>
                            <button className='addReminder' onClick={()=>dispatch(displayAddTask(true))}>
                                <FaPlus size={'1.5em'}></FaPlus> 
                            </button>
                            
                            {/* <div >
                                <button className="optionsIcon">
                                    <HiDotsVertical size={'1.5em'}/>  
                                </button> 
                                <div className="options" style={task.options ? {display:'inline' } : {display:'none'}}>                                        
                                    <button>view</button>                                    
                                </div>
                            </div>           */}
                        </div> </>  :   <Note display={displayNote} displayFunction={setDisplayNote} note={note}/>}
                    </div>                    
                   
                </div> 
                
                <Statistics taskStats={taskStats} projectID={projectID}/>
            </div> :    <Loader/>}
            
            <Addschedule display={displaySchedule} displayFunction={setDisplaySchedule}/>
            <Addreminder/>
        </div>
    )
} 
export default Projectdashboard;