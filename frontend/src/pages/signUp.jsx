import { Link, useNavigate } from "react-router-dom"; 
import { useState } from "react";
import axios from "axios";

const Signup = ()=> {
    const [form,setForm] = useState({firstname:'',surname:'',username:'',email:'',password:''});
    const [confirmPassword,setConfirmPassword] = useState('');
    const navigate = useNavigate

    const handleInput = (e)=> {
        setForm(state=>state={...state,[e.target.name]:e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(form.firstname.trim()==='' || form.surname.trim()==='' || form.username.trim()==='' || form.email.trim()==='' || form.password.trim()===''  ){
            return console.log('All fields must be entered')
        }
        if(form.password != confirmPassword){
            return console.log('Incorrect password')
        }
        axios.post('http://localhost:3001/user/register',form,{headers : {'Authorization':`${localStorage.getItem('token')}`}}).then(res=>{
            if(res.data.error){
                return console.log(res.data.error)
            }
            navigate('/login');
        })
    }
    return (
        <div className="register">            
            <form class="form" onSubmit={handleSubmit}>
                <p class="title">Register </p>
                <p class="message">Signup now and get full access to our app. </p>
                    <div class="flex">
                    <label>
                        <input required="" placeholder="" name='firstname' onChange={handleInput} type="text" className="input"/>
                        <span>Firstname</span>
                    </label>

                    <label>
                        <input required="" placeholder="" name='surname' onChange={handleInput} type="text" className="input"/>
                        <span>Surname</span>
                    </label>
                </div>  
                <label>
                    <input required="" placeholder="" name='username' onChange={handleInput} type="text" className="input"/>
                    <span>Username</span>
                </label>
                        
                <label>
                    <input required="" placeholder="" name='email' onChange={handleInput} type="email" className="input"/>
                    <span>Email</span>
                </label> 
                    
                <label>
                    <input required="" placeholder="" name='password' onChange={handleInput} type="password" className="input"/>
                    <span>Password</span>
                </label>
                <label>
                    <input required="" placeholder=""  onChange={(e)=>setConfirmPassword(e.target.value)} type="password" className="input"/>
                    <span>Confirm password</span>
                </label>
                <button class="submit" type='submit'>Submit</button>
                <p class="signin">Already have an acount ? <Link to='/login'><p>LogIn</p></Link> </p>
            </form>
        </div>
    )
}
export default Signup