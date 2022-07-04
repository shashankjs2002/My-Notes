import React, {useEffect, useContext} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import UserContext from '../context/User/UserContext';

const Navbar = (props) => {
  const context = useContext(UserContext)
  const {user, getUser} = context
  // const username = user.name
  let location = useLocation();
  useEffect(() => {
    // console.log(location.pathname)
    if(localStorage.getItem('token')){
      getUser()
      

    }

  }, [location]);

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
    
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">My Notes</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <form className='d-flex'>

            {!localStorage.getItem('token') ?
              <>
                {(location.pathname==='/login') ?
                  <Link className="btn btn-secondary mx-2" to="/signup">Signup</Link>
                 :
                  <Link className="btn btn-secondary mx-2" to="/login">Login</Link>
            }
              </> 
              :
              <>
  
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link  className={`nav-link active`} aria-current="page" to="/">{user.name}</Link>
                </li>
                
              </ul>
      
              <button  className="btn btn-secondary mx-2" onClick={handleLogout}>Logout</button> 
              </>
            }
            </form>
          </div>
        </div>

        </nav>
    </>
  )
}

export default Navbar