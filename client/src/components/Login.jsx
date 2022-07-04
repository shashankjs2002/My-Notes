import React, {useContext, useState} from 'react'
import NoteContext from '../context/Notes/NoteContext'
import {useNavigate, Link} from 'react-router-dom'

const Login = (props) => {
    const context = useContext(NoteContext)
    const {host} = context;
    const [credential, setCredential] = useState({email: "", password : ""})
    let navigate = useNavigate();

    const onchange = (e) => {
        // e.preventDefault();
        setCredential({...credential, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(host)
        console.log(credential.email+ " " + credential.password);
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
              },
            body: JSON.stringify({email: credential.email, password: credential.password})
          });
          const json = await response.json();
        //   console.log(json)
          if(json.success){
            localStorage.setItem('token', json.authToken);
            // alert('Logged in successfully'); 
            navigate('/');
            props.showalert("success", "Success", "Logged in Successfully")
            
          } else{
            props.showalert("danger", "Error", json.error)
          }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className= "mt-5" >
              <h1>Login to your Account</h1>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={credential.email} name="email" onChange={onchange} required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name= "password" value={credential.password} minLength={5} onChange={onchange} required/>
                </div>
                
                <div className='d-flex flex-wrap  my-3'>

                <button type="submit" className="btn btn-dark mx-3">Log in</button>
                <span>Don't have Account <Link to='/signup' style={{WebkitTextStrokeWidth: 'medium', color:'black'}}>Sign in</Link> now!</span>
                </div>
            </form>
        </>
    )
}

export default Login