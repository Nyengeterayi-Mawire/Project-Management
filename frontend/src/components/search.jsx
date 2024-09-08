import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { displaySearch, setProjectID } from "../features/projectSlice";

const Search = () => {
    const projects = useSelector(state=>state.projects.searchList);
    const display = useSelector(state=>state.projects.displaySearch);
    const dispatch = useDispatch();

    const handleClick = (id)=>{
        dispatch(setProjectID(id));
        dispatch(displaySearch());
    }
    return (
        <div className='searchDiv' style={display?{display:'initial'}:{display:'none'}}>
            <div style={{margin:'auto',width:'fit-content'}}>
            {projects&&projects.map(project=>{
                            return <Link className="link" key={project._id} onClick={()=>handleClick(project._id)} ><p >{project.name}</p></Link>
                        })}
            </div>
        </div>
    )
}
export default Search;