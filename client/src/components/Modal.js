import React, {useContext, useState, useRef, forwardRef, useEffect} from "react";
import ModalContext from "../context/Modal/ModalContext";
import noteContext from '../context/Notes/NoteContext'

const Modal = (props) => {
  
  const context = useContext(noteContext)
  const {addNote, updateNote} = context;
  
  const Modalcontext = useContext(ModalContext);
  const {enote, editNote } = Modalcontext;
  
  const [note, setNote] = useState({ title : "", description: "", tag : ""})
  
    useEffect(() => {
      // console.log("first")
      setNote(enote)
    }, [editNote])
    
    const closeBtn = useRef(null)
    
    const handleAddNote = (e) => {
      e.preventDefault();
      // console.log("Adding a note")
      addNote(note.title,note.description, note.tag);
      closeBtn.current.click()
      props.showalert('success','Done', 'Note Added Successfully')
      
    }

    const handleUpdateNote = (e) => {
      e.preventDefault();
      // console.log(note)
      updateNote(note._id, note.title, note.description, note.tag);
      closeBtn.current.click();
      props.showalert('success','Done', 'Note Updated Successfully')


    }
    
    // const updateNote = (note) => {
    //   title.value = enote.title;
    //   description.value = enote.description;
    //   tag.value = enote.tag
    // };
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }

    const close = () => {
      setNote({title : "", description: "", tag : ""})
      closeBtn.current.click()
    }

  return (
    <>
      <div className={"modal fade"} id={"exampleModal"+props.id} tabIndex="-1" role="dialog"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
                <span aria-hidden="true" data-bs-dismiss="modal">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <form className="container my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' onChange={onChange} value={note.title}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag}/>
                </div>
                {/* <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                {/* <button type="submit" className="btn btn-dark" onClick={eval(props.func)}>Add Note</button> */}

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={closeBtn} data-bs-dismiss="modal" onClick={close}>Close</button>
              {(props.id ==="1") ? 
              <button type="submit" className="btn btn-dark" onClick={eval(props.func)}>Add Note</button>
              :
              <button type="submit" className="btn btn-dark" onClick={eval(props.func)}>Update Note</button>
            }
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal