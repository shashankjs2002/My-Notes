import React, { useContext, useEffect, useRef } from "react";
import noteContext from "../context/Notes/NoteContext";
import AddNote from "./AddNote";
import NotesItems from "./NotesItems";
import { useNavigate, useLocation } from 'react-router-dom'
import Modal from "./Modal";
import addNoteSolid from '../img/add-note-solid.svg'
import ModalContext from "../context/Modal/ModalContext";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, setNotes, getNotes } = context;

  const Modalcontext = useContext(ModalContext);
  const { editNote, addNote } = Modalcontext;
  const navigate = useNavigate()

  let location = useLocation()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
      
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [localStorage.getItem('token')]);

  const reftoAddNode = useRef(null);
  const ref = useRef(null);

  const displayUpdateNote = (note) => {
    ref.current.click()
    editNote(note)
  };

  const displayAddNote = () => {
    reftoAddNode.current.click()
    addNote()
  }

  return (
    <> 
      {/* <AddNote /> */}

      <div>
        <button type="button" ref={reftoAddNode} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target={"#exampleModal"+1}>
              Add note Modal
        </button>
        <Modal title = "Add a note" id="1" func={"handleAddNote"} showalert={props.showalert}/>
      </div>
      <div>
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target={"#exampleModal"+2}>
              Modal 2
        </button>
        <Modal func={"handleUpdateNote"} title = "Update a note" id="2"  showalert={props.showalert}/>
      </div>


      <div className="my-3 row">
        <div className="d-flex">
        <h1>Your Notes</h1>
        <img className="mx-4" src={addNoteSolid} alt="" style={{width: "35px", cursor: "pointer"}} data-toggle="tooltip" data-placement="bottom" title="Add a new Note" onClick={displayAddNote}/>
        </div>
        {notes.map((note) => {
          return <NotesItems key={note._id} updateNote={displayUpdateNote} note={note}  showalert={props.showalert}/>;
        })}
      </div>
    </>
  );
};

export default Notes;
