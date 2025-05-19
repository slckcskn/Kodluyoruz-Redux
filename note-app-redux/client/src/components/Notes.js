import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getNotesAsync, removeNoteAsync } from '../redux/notes/notesServices';
import '../styles/notes.css';

import Error from './Error';
import Loading from './Loading';

function Notes() {
  const dispatch = useDispatch();

  const notes = useSelector(state => state.notes.items);
  const filter = useSelector(state => state.notes.filter)
  const isLoading = useSelector(state => state.notes.isLoading);
  const error = useSelector(state => state.notes.error);

  useEffect(() => {
    dispatch(getNotesAsync());
  }, [dispatch]);

  const handleDelete = async (id) => {
    
    if(window.confirm('Are you sure want to delete this note?')) {
      await dispatch(removeNoteAsync(id))
      dispatch(getNotesAsync());
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className='mt-3'>
      <div className='notes-grid'>
        {notes.filter(note => note.text.includes(filter))
        .map((note) => (
          <div key={note.id}>
            <button
              type="button"
              className="btn btn-block note-btn"
              style={{ backgroundColor: note.color, color: "white" }}
              data-bs-toggle="modal"
              data-bs-target={`#noteModal${note.id}`}
            >
              {note.text}
            </button>

            <div 
              className="modal fade" 
              id={`noteModal${note.id}`} 
              tabIndex="-1" 
              aria-labelledby={`noteModalLabel${note.id}`} 
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header border-0">
                    <button type="button" className="btn-close" id="modal-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body py-4" style={{ backgroundColor: note.color, color: "white", margin: "0 1rem", borderRadius: "8px" }}>
                    {note.text}
                  </div>
                  <div className="modal-footer border-0">
                    <button 
                      type="button" 
                      className="btn btn-danger modal-delete-btn" 
                      data-bs-dismiss="modal"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes