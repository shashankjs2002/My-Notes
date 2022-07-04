import React, {useContext, useState} from 'react'
import NoteContext from '../context/Notes/NoteContext'
import {useNavigate, Link} from 'react-router-dom'

const Signup = (props) => {
    
    const context = useContext(NoteContext)
    const {host} = context;
    const [credential, setCredential] = useState({name: "",email: "", password : ""})
    let navigate = useNavigate();

    const onchange = (e) => {
        // e.preventDefault();
        setCredential({...credential, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(host)
        console.log(credential);
        const response = await fetch(`${host}/api/auth/create-user`, {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
              },
            body: JSON.stringify({name: credential.name ,email: credential.email, password: credential.password})
          });
          const json = await response.json();
        //   console.log(json)
          if(json.success){
            localStorage.setItem('token', json.authToken);
            navigate('/')
            props.showalert("success", "Success", "Account Created Successfully")
          } else{
            
            props.showalert("danger", "Error", json.error)
          }
    }

  return (
    <>
        
        <form onSubmit={handleSubmit} className=""  style={{marginTop:'4rem'}}>
          <h1>Create New Account</h1>
            <div className="form-group my-3">
                <label htmlFor="exampleInputPassword1">Name</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Name" onChange={onchange} name='name' value={credential.name}  required/>
            </div>
            <div className="form-group my-3">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} name='email' value={credential.email} required />
            </div>
            <div className="form-group my-3">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={onchange} name='password' value={credential.password} minLength={5} required/>
            </div>
            
            <div className='d-flex flex-wrap  my-3'>

                <button type="submit" className="btn btn-dark mx-3">Sign up</button>
                <span>Already have Account <Link to='/login' style={{WebkitTextStrokeWidth: 'medium', color:'black'}}>Log in</Link> now!</span>
            </div>
        </form>

    </>
  )
}

export default Signup