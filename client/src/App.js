
import './App.css';
import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoPage from './components/NoPage';
import NoteState from './context/Notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import UserState from './context/User/UserState';
import Nav from './components/Nav';
import ModalState from './context/Modal/ModalState';
import Alert from './components/Alert';
import { useState } from 'react';


function App() {
  const [alert, setAlert] = useState(null)
  const showalert = (type, tag, msg) => {
    setAlert({
      msg:msg,
      type: type,
      tag: tag

    })
    setTimeout(() => {
      setAlert(null)
    }, 5000);

  }
  
  return (
    <>
    <NoteState showalert={showalert}>
      <UserState>
        <ModalState>
          <Router>

              {/* Cloud-notes */}
              <Navbar showalert={showalert}/>
              <Alert alert={alert}/>
              {/* <Nav/> */}
              <div className="container">
                <Routes>
                  <Route exact path="/" element ={<> <Home showalert={showalert}/></>}/>
                  {/* <Route exact path="/about" element ={<About/>}/> */}
                  <Route exact path="/login" element ={<Login showalert={showalert}/>}/>
                  <Route exact path="/signup" element ={<Signup showalert={showalert}/>}/>
                  <Route exact path="*" element ={<NoPage/> }/>                
                </Routes>
              </div>

          </Router>    
        </ModalState>
      </UserState>
    </NoteState>
    </>
  )
}

export default App;
