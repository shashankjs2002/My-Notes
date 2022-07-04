import React, {useContext} from 'react'
import noteContext from '../context/Notes/NoteContext'
import copyToClipboardimg from '../img/clipboard-solid.svg'
import cloneSolid from '../img/clone-solid.svg'
import Edit from '../img/pen-to-square-solid.svg'
import trash from '../img/trash-solid.svg'

const NotesItems = (props) => {
    const context = useContext(noteContext)
    const {deleteNote, cloneNote, copyToClipboard} = context
    const {note, updateNote} = props;
    const iconStyle = {
      width: "15px",
      cursor: "pointer",
      
    }

  return (
    <div className='col-md-12'>
         <div className="card my-3">
              <div className="card-body mx-5">
                <div className="d-flex justify-content-between" style={{flexWrap: 'wrap'}}>

                  <div>
                    <h5 className="card-title ">{note.title}</h5>
                  </div>  
                  <div className=" mx-2" style={{right : '0'}} >
                    <img className='mx-2' style={iconStyle} src={copyToClipboardimg} alt="Copy to Clipboard" data-toggle="tooltip" data-placement="bottom" title="Copy to Clipboard"  onClick={() => {copyToClipboard(note)}}></img>
                    <img className='mx-2' style={iconStyle} src={cloneSolid} alt="Clone"  data-toggle="tooltip" data-placement="bottom" title="Duplicate note"  onClick={() => {cloneNote(note)}} ></img>
                    <img className='mx-2' style={iconStyle} src={Edit} alt="Update" data-toggle="tooltip" data-placement="bottom" title="Edit"  onClick={() => {updateNote(note)}} ></img>
                    <img className='mx-2' style={iconStyle} src={trash} alt="Delete"  data-toggle="tooltip" data-placement="bottom" title="Delete" onClick={()=> {deleteNote(note._id)}} ></img>
                  </div>
                </div>

                <pre style={{whiteSpace: 'pre-wrap', fontSize: '18px'}} className="card-text mt-3">{note.description}</pre>
                <p className="card-text mt-3">#{note.tag}</p>
              </div>
            </div>
    </div>
  )
}

export default NotesItems