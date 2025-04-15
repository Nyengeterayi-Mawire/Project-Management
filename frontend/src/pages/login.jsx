import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/tasksSlice';
import { esES } from '@mui/x-date-pickers/locales';
// import {NotificationManager} from 'react-notifications';

const Login = ()=> {
    const [form,setForm] = useState({username:'',password:''});  
    const [error,setError] = useState('');
    const dispatch = useDispatch();  
    const navigate = useNavigate();

    const handleInput = (e)=> {
        setForm(state=>state={...state,[e.target.name]:e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(form.username.trim()==='' || form.password.trim()===''  ){
            return console.log('All fields must be entered')
        }
        axios.post('http://13.60.163.227/user/login',form).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }else{
                dispatch(setUser(res.data.user));
            localStorage.setItem('token',res.data.token);            
            navigate('/project')            
            }           
            
        }).catch(error=>{
            if(error.response.data){
                setError(error.response.data.error)
            }
        })
        
        
    }
    return (
        <div className="login" >
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Log In </p>
                <p className="message">Login now and get started on your projects </p>
                    
                <label>
                    <input placeholder="" name='username' onChange={handleInput} type="text" className="input"/>
                    <span>Username</span>
                </label> 
                    
                <label>
                    <input required="" placeholder="" name='password' onChange={handleInput} type="password" className="input"/>
                    <span>Password</span>
                </label>
                
                <p style={{color:'red',textAlign:'center',padding:'0px',margin:'0px'}}>{error}</p>
                <button className="submit" type='submit'>Submit</button>
                <p className="signin">Dont have an account ? <Link to='/register'><p>Register</p></Link></p>
            </form>
        </div>
    )
}
export default Login