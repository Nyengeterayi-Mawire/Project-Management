import Projectrightnav from "../components/projectRightnav";
import Projectsidebar from "../components/projectSidebar";
import Projecttasks from "../components/projectTasks";
import Projecttopnav from "../components/projectTopNav";
import { useLocation } from "react-router-dom";
import Search from "../components/search";
const Projecthome = () => {
    const id = useLocation().state
    console.log('this is the id',id)
    return (        

        <div className="projectHome">
            <Projecttopnav/>
            <Projectsidebar/>
            <Projecttasks projectID={id}/>
            <Search/>
        </div>
    )
} 
export default Projecthome