import React, {useContext, useState} from "react";
import noteContext from '../context/Notes/NoteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context;

    const [note, setNote] = useState({title : "", description: "", tag : ""})

    const handleClick = (e) => {
        e.preventDefault();
        // console.log("Adding a note")
        addNote(note.title,note.description, note.tag);   
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }
  return (
    <div className="container my-3">
        <h1>Add a Note</h1>

        <form className="container my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea type="text" className="form-control" id="description" name='description'onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-dark" onClick={handleClick}>Add Note</button>
        </form>

     </div>
  )
}

export default AddNote