import { useState } from "react";
import { removeProject } from "../features/projectSlice";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
const Authorizedelete = ({project,display,displayFunction})=> {
    const [deleteName,setDeleteName] = useState(''); 
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleDelete = () =>{
        if(deleteName.trim() !== project.name.trim()){
            return console.error('incorrect project name entered')
        }else{
            axios.delete('http://localhost:3001/project/'+project._id,{headers:{Authorization:localStorage.getItem('token')}}).then(res=>{
                if(res.data.error){
                    return console.log(res.data.error)
                }else{
                    dispatch(removeProject(project._id)); 
                    displayFunction(false)
                }
            }).catch(error=>{
                if(error.response.data.expired){
                    localStorage.clear();
                    navigate('login');
                }
            })

        }
    }
    return(
        <div className="authorizeDelete" style={display?{display:'initial'}:{display:'none'}}>
            <div style={{width:'fit-content',margin:'auto',position:'relative',padding:'40px'}}>
                <div className="widget">
                    <p style={{width:'fit-content',maxWidth:'100%',margin:'auto',padding:'10px'}}>Enter <b>'{project.name}'</b> to delete project</p> 
                    <input className="projectDeleteInput" placeholder="enter project name" onChange={(e)=>setDeleteName(e.target.value)}></input>
                    <div style={{width:'fit-content',margin:'auto',padding:'10px'}}>
                            <button className="submit" onClick={handleDelete} >Delete</button>
                    </div>
                </div>
                <div className="exitButton">
                    <button onClick={()=>displayFunction(false)}><IoClose style={{margin:'auto'}} size={'2.5em'} color="white"/></button>
                </div>
            </div>
        </div>
    )
}
export default Authorizedelete