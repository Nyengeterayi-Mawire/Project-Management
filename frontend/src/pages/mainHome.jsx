import Maindashboard from "../components/mainDashboard";
import Mainsidebar from "../components/mainSidebar";
import Maintopnav from "../components/mainTopNav";
import Projectsidebar from "../components/projectSidebar";
import Search from "../components/search";
const Mainhome = () => {
    return (
        <div className="mainHome"> 
            <Maintopnav/>
            <Mainsidebar/>
            <Maindashboard/>
            <Search/>
        </div>
    )
}
export default Mainhome;