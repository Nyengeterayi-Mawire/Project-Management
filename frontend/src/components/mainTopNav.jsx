import { useDispatch } from "react-redux";
import { useState } from "react";
import Addproject from "./addProject";
import { displayAddTask } from "../features/tasksSlice";
import { displaySearch, search } from "../features/projectSlice";
const Maintopnav = () => {
    const dispatch = useDispatch();      
    const [searchValue,setSearchValue] = useState('');
    const [isButtonDisabled,setisButtonDisabled] = useState(false);    

    const handleSearch=(e)=>{        
        setSearchValue(e.target.value);
        dispatch(search(e.target.value));        
    }
    return(
        <div className="mainTopnav">
            <div className="profile">

            </div>
            <div className="search">
            <input placeholder="enter search..." value={searchValue} onClick={()=>{
                    dispatch(displaySearch())
                    setisButtonDisabled(!isButtonDisabled)
                    } }  onChange={handleSearch}/> 
                <button onClick={()=>dispatch(displayAddTask(true))} disabled={isButtonDisabled}>Add Project</button>
            </div> 
            <Addproject/>
        </div>
    )
}
export default Maintopnav;