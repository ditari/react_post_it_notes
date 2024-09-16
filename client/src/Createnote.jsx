import React, { useState }  from "react";
import plusIcon from './plus.svg';
import pinImage from './post-it-notes.png';

function Createnote(props) {
  const [note, setNote] = useState({
    title: "",
    notes: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  // function submitNote(event) {
  //   props.onAdd(note);
  //   setNote({
  //     title: "",
  //     notes: ""
  //   });
  //   event.preventDefault();
  // }

  function submitNote(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Check if both title and notes are not empty
    if (note.title.trim() !== "" && note.notes.trim() !== "") {
      props.onAdd(note); // Call the parent's onAdd function
      setNote({
        title: "",
        notes: ""
      }); // Clear the note state
    } else {
      // Optionally, you can add some user feedback here
      alert("Please fill out both title and notes.");
    }
  }
  
 
  return (
          <>
          <div>
          <img src={pinImage} alt="pin-image" style={{ maxWidth: '100%', height: 'auto' }}  />
          </div>

          <div className="singlenote">
            <div className="card">
              
            <div className="card-header" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>
            ADD NOTES
            </div>
              <div className="card-body">
              <form>
              
              <input className="card-title"
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title here"
              />
              
              
              
              <textarea className="card-text" 
              name="notes"
              onChange={handleChange}
              value={note.notes}
              placeholder="Note here"
               rows="5"
              />
              
              </form>

              <div style={{ textAlign: 'right' }}>
              <button onClick={submitNote}><img className="icon" src={plusIcon} alt="add" /></button>
               </div>


              </div>
              </div>  
          </div>  
          </>
    );


}

export default Createnote;
