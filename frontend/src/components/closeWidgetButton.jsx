import { useDispatch } from "react-redux";
import { displayAddTask } from "../features/tasksSlice";
import { IoClose } from "react-icons/io5";
const Closewidgetbutton = ()=> {
    const dispatch = useDispatch();
    return (
        <div className="exitButton">
            <button onClick={()=>dispatch(displayAddTask(false))}><IoClose style={{margin:'auto'}} size={'2.5em'} color="white"/></button>
        </div>
    )
}
export default Closewidgetbutton