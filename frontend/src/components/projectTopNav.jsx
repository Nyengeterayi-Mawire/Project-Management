import { useDispatch, useSelector } from "react-redux";
import { displayAddTask } from "../features/tasksSlice";
import { useState } from "react";
import { displaySearch, search } from "../features/projectSlice";
const Projecttopnav = () => {    
    const dispatch = useDispatch();      
    const [searchValue,setSearchValue] = useState('');
    const [isButtonDisabled,setisButtonDisabled] = useState(false);    

    const handleSearch=(e)=>{        
        setSearchValue(e.target.value);
        dispatch(search(e.target.value));        
    }
    return (
        <div className="projectTopnav">
            <div className="profile">

            </div>
            <div className="search">                
                <input placeholder="enter search..." value={searchValue} onClick={()=>{
                    dispatch(displaySearch())
                    setisButtonDisabled(!isButtonDisabled)
                    } }  onChange={handleSearch}/>      
                                
                <button onClick={()=>{dispatch(displayAddTask(true))}} disabled={isButtonDisabled}>Add task</button>
            </div> 
            
        </div>
    )
} 
export default Projecttopnav