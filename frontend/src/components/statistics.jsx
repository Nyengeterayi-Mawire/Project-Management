const Statistics = ({taskStats,projectID}) => {   
    return (
        <div className='widget' style={{height:'120px',width:'90%',margin:'5% 0px 0px 5%',borderRadius:'20px',display:'flex'}}>
            <div className="stat" id="totalTasksStat" style={{borderRight:'2px solid grey'}}>
                <p className="name">Total Tasks</p>
                <p className="number">{taskStats.totalTasks}</p>
            </div>
            <div className="stat" id="totalTasksStat" style={{borderRight:'2px solid grey'}}>
                <p className="name">To-Do Tasks</p>
                <p className="number" >{taskStats.idletasks}</p>
            </div>
            <div className="stat" id="totalTasksStat" style={{borderRight:'2px solid grey'}}>
                <p className="name">In Progress Tasks</p>
                <p className="number">{taskStats.pendingtasks}</p>
            </div>
            <div className="stat" id="totalTasksStat" style={{borderRight:'2px solid grey'}}>
                <p className="name">Completed Tasks</p>
                <p className="number">{taskStats.completedtasks}</p>
            </div>
            <div className="stat" id="totalTasksStat" >
                <p className="name">Completion %</p>
                {taskStats.totalTasks !== 0 ? <p className="number">{(taskStats.completedtasks*100)/taskStats.totalTasks}</p> : <p className="number">0</p>}
            </div>
        </div>
    )
}
export default Statistics;