import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './App.css';
import Note from "./Note";
import Createnote from './Createnote';

function App() {
  const [allNotes, setNotes] = useState([]); // Changed variable name to camelCase

  useEffect(() => {
    axios.get('http://localhost:5174/notes')
      .then(response => {
        setNotes(response.data); // axios automatically parses JSON
      })
      .catch(err => {
        console.error('Error fetching notes:', err);
        // Handle error (e.g., show an error message to the user)
      });
  }, []); 

  function deleteNote(id) {
  axios.get(`http://localhost:5174/deletenote/${id}`)
   .then(response => {
      console.log('Note deleted:', response.data);
      // After deletion, update the UI by removing the deleted note from state
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    })
    .catch(err => {
      console.error('Error deleting note:', err);
      // Handle error (e.g., show an error message to the user)
    });
  }

  function addNote(newNote) {
    axios.post('http://localhost:5174/addnote', newNote)
      .then(response => {
        // Assuming the API returns the created note with an id
        const createdNote = response.data;
  
        // Add the new note to the state
        setNotes(prevNotes => {
          return [...prevNotes, createdNote];
        });
      })
      .catch(err => {
        console.error('Error adding note:', err);
        // Handle error (e.g., show an error message to the user)
      });
  }
  
  function editNote(id, newNote){
    axios.post(`http://localhost:5174/editnote/${id}`, newNote)
      .then(response => {
        const editedNote = response.data;

        setNotes(prevNotes => {
          // Remove the old note and add the updated note
          const updatedNotes = prevNotes.filter(note => note.id !== id);
          updatedNotes.push(editedNote);

          // Sort the notes by id
          return updatedNotes.sort((a, b) => a.id - b.id);
        });

      })
      .catch(err => {
        console.error('Error adding note:', err);
        // Handle error (e.g., show an error message to the user)
      });

  }

  return (
    <div className="App">
      <div className="container-fluid">
      
        <div className="row">

        <div className="col-3 addnote">
        <Createnote onAdd={addNote}/>
        </div>

        <div className="col-9">
        <div className="row">
          {allNotes.map(note => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              notes={note.notes} // Use `notes` prop to match Note component
              onDelete={deleteNote}
              onEdit={editNote}
            />  
          ))}
        </div>
        </div>   
        </div>

      </div>
    </div>
  );
}


export default App;
