import React, { useState }  from "react";
import './App.css';
import trashCanIcon from './trash-can.svg';
import editIcon from './pencil.svg';
import checkIcon from './check.svg';
import xIcon from './x.svg';

function Note(props) {
  const [note, setNote] = useState({
    title: props.title,
    notes: props.notes
  });

  const [isEditing, setIsEditing] = useState(false);


  function deletenote() {
    props.onDelete(props.id);
  }
  function editnote() {
    setIsEditing(true);
  }

function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function editNote(event){
    props.onEdit(props.id, note);
    event.preventDefault();
    setIsEditing(false);
  }

  function cancelEdit(){
    setIsEditing(false)
  }

  return (
      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="singlenote">
          <div className="card">
            <div className="card-header">
              <button onClick={editnote}><img className="icon" src={editIcon} alt="edit" /></button> 
              <button onClick={deletenote}><img className="icon" src={trashCanIcon} alt="delete" /></button>
            </div>
            <div className="card-body">
              {!isEditing && (
              <>    
              <div className="card-title">{props.title}</div>
              <div className="card-text">{props.notes}</div>
              </>
             )}

        {isEditing && (
          <>
        <form>
        <input className="card-title"
        name="title"
        onChange={handleChange}
        value={note.title}       
        />
        
        
        <textarea className="card-text"
        name="notes"
        onChange={handleChange}
        value={note.notes}
        
         rows="3"/>        
        </form>

        <div style={{ textAlign: 'right' }}>
        <button onClick={editNote}><img className="icon" src={checkIcon} alt="edit" /></button>
        <button onClick={cancelEdit}><img className="icon" src={xIcon} alt="canceledit" /></button>
        </div>  
        </>
         )}



            </div>
          </div>
        </div>
      </div>
  );
}

export default Note;
