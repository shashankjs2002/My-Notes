import { useState } from 'react';
import noteContext from './NoteContext';

const NoteState = (props) => {

    const host = "https://my-enotes.herokuapp.com"
    const notesInitial =[]

    const [notes, setNotes] = useState(notesInitial)
  

  // Get all notes
  const getNotes = async () =>  {

    //API Call
    const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'auth-token' :localStorage.getItem('token'),
        
      },
    });
    const json = await response.json();
    // console.log(json)

    // Showing on frontend
    setNotes(json)

  }  
      
  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/add-notes`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'auth-token' :localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    // const json = response.json();


    // Frontend logic

    // Logic 1
    // const note ={
      //     "title": title,
      //     "description": description,
      //     "tag": tag,
      //   }
      // setNotes(notes.concat(note))
      
    // Logic 2
    getNotes()
  }
      
  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/delete-note/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'auth-token' :localStorage.getItem('token')
      },
      // body: JSON.stringify({title, description, tag})
    });
    const json = response.json();
    


    // Frontend logic
    // console.log("Deleting Note with id: " +id)
    const newNotes = notes.filter((note) => {return note._id !== id})
    setNotes(newNotes)
    props.showalert('success','Done', 'Note Deleted Successfully')

  }

  // Edit a Note
  const updateNote = async (id, title, description, tag) =>  {
    // API Call
    const response = await fetch(`${host}/api/notes/update-note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'auth-token' :localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = response.json();


    // Frontend logic
    getNotes()
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if(element._id == id){
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //     console.log(element)
    //   }
    // }
    // console.log("updated")
    props.showalert('success','Done', 'Note Updated Successfully')

  }

  // Cloane a note
  const cloneNote = async (note) => {
    // console.log("cloning note with id "+ note._id)
    let {title, description, tag} = note
    title = title + " Cloned"
    addNote(title, description, tag)
    props.showalert('success','Done', 'Note Cloned Successfully')
  }

  // Copy To Clipboard 
  const copyToClipboard = (note) => {
      /* Get the text field */
      var copyText = note.description;
      // console.log(copyText)
    
      /* Select the text field */
      // copyText.select();
      // copyText.setSelectionRange(0, 99999); /* For mobile devices */
    
       /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText);
    
      /* Alert the copied text */
      // alert("Copied the text: " + copyText);
      props.showalert('success','Done', "Note's Description Copied Successfully")
  }
  

  return ( 
      <noteContext.Provider value = {{notes,setNotes, addNote, deleteNote, updateNote, cloneNote, getNotes, copyToClipboard, host}}>
          {props.children}
      </noteContext.Provider> 
  )
}

export default NoteState