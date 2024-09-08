import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const  Note = ({display,displayFunction,note}) => {
    const navigate = useNavigate();
    return(
        <div className="Note">
            <p className='header'>{note.name}</p>                       
            <p style={{width:'90%',maxWidth:'90%',margin:'5% 0px 0px 5%'}}>{note.description}</p>
            <div style={{display:'flex',width:'fit-content',position:'absolute',top:'7%',right:'5%'}}>
                <button className="addReminder" onClick={()=>displayFunction(false)}>
                    <MdOutlineArrowBackIos color="white" size={'1.5em'}/>
                </button> 
            </div>
        </div>
    )
}
export default Note;