import React from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import  { useState } from 'react'
import '../styles/register.css'

const Register=()=>{
    const [lname, setLName] = useState("")
    const [fname, setFName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user,setUser]=useState("");
   
    const history = useHistory();
    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`https://glacial-castle-08491.herokuapp.com/api/${user}/register/`, { lname, fname,email,password })
          setFName("")
          setLName("")
          setEmail("")
          setPassword("")
          setUser("");
          history.push("/")     

        } catch (error) {
            console.log(error);
        }
    }
   return (
    <main className="form-signin">
    <form onSubmit={(e) => handleSubmit(e)}>
        <div className="registerhead__container">
           
        </div>
        <h1 className="h3 mb-3 fw-normal">Please Register here</h1>
        <div className="form-floating">
            <input type="name" value={fname} onChange={(e) => setFName(e.target.value)} className="form-control" id="fname" placeholder="first name" required />
            <label for="fname">First Name</label>
        </div>
        <div className="form-floating">
            <input type="name" value={lname} onChange={(e) => setLName(e.target.value)} className="form-control" id="lname" placeholder="last name" required />
            <label for="lname">Last Name</label>
        </div>
        <div className="form-floating">
            <input type="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com" required />
            <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating mt-2">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password" required />
            <label for="floatingPassword">Password</label>
        </div>
        <div className="form-floating">
            <input type="name" value={user} onChange={(e) => setUser(e.target.value)} className="form-control" id="user" placeholder="type admin or manager or employee" required />
            <label for="user">admin or manager or employee</label>
        </div>
        
        <input className="w-100 btn btn-lg btn-primary mt-3" type="submit" value="Sign up" />
        
    </form>
</main>
   ) 
}
export default Register