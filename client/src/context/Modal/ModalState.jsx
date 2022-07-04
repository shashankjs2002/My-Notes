import { useState } from "react";
import ModalContext from "./ModalContext";

const ModalState= (props) => {

    const [enote, setEnote] = useState({id: "", title : "", description: "", tag : ""})
  
    const editNote = (note) => {
        setEnote(note)  
    };
    
    const addNote = () => {
        setEnote({title : "", description: "", tag : ""})  
    };

    return ( 
        <ModalContext.Provider value = {{editNote, enote, addNote}}>
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalState