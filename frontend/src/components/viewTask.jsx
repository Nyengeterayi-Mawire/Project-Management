import Closewidgetbutton from "./closeWidgetButton"
const Viewtask = ({display,setDisplay,task}) => {    
    return (
        <div className="addTask" style={display?{display:'initial'}:{display:'none'}}>
            <div style={{width:'fit-content',margin:'auto',padding:'40px',position:'relative'}}>
            <div className="widget">
                <div id='addTaskName' style={{display:'flex'}}>
                    <label>Name :</label>
                    {/* <input placeholder="enter name..." value={name} onChange={(e)=>setName(e.target.value)} /> */}
                    <p style={{padding:'5px 0px'}}>{task.name}</p>
                </div>
                <div className="labelInput" id='addTaskDescription'>
                    <label>Description :</label>
                    {/* <input placeholder="enter description..." value={description} onChange={(e)=>setDescription(e.target.value)}/> */}
                    <p style={{padding:'0px 8px'}}>{task.description}</p>
                </div>
                <div style={{paddingBottom:'10px',display:'flex'}}>
                    <label>Priority : </label>
                    {/* <select onChange={(e)=>setPriority(e.target.value)}>                    
                        <option value='Low Priority'>Low</option>                    
                        <option value='Medium Priority'>Medium</option>
                        <option value='High Priority'>High</option>
                    </select> */}
                    <p style={{padding:'5px 0px',margin:'0px'}}>{task.priority}</p>
                </div>
                {/* <div style={{width:'fit-content',margin:'auto'}}>
                    <button className="submit" onClick={handleConfirm}>Confirm</button>
                </div> */}
                
            </div>
            <Closewidgetbutton  setDisplay={setDisplay}/>
            </div>
        </div>
    )
}
export default Viewtask