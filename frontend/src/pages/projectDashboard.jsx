import Projecttopnav from '../components/projectTopNav';
import Projectsidebar from '../components/projectSidebar';
import Projectdashboard from '../components/projectDashboard';
import Search from '../components/search';
const ProjectDashboard = () => {
    return(
        <div className='ProjectDashboard'>
            <Projecttopnav/>
            <Projectsidebar/>
            <Projectdashboard/>
            <Search/>
        </div>
    )
}
export default ProjectDashboard