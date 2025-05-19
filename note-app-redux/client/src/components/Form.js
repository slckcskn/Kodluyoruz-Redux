import { useState } from 'react'
import { useDispatch } from 'react-redux';
import '../styles/form.css'
import { addNoteAsync } from '../redux/notes/notesServices';

function Form() {

  const [form, setForm] = useState({
    id: "",
    color: "",
    text: "",
  })

  const dispatch = useDispatch()

  const handleText = (e) => {
    setForm({ ...form, text: e.target.value })
  }

  const handleColor = (e) => {
    setForm({ ...form, color: e.target.value })
  }

  const handleForm = async (e) => {
    e.preventDefault()
    if (checkValues(form)) {
      await dispatch(addNoteAsync({ ...form }))
      setForm({ id: "", color: "", text: "" });
    }
  }

  const checkValues = (form) => {
    return form.text !== "" && form.color !== "" ? true : false
  }

  return (
    <form onSubmit={handleForm} className="col-12 align-self-center">
      <div>
        <div className='form-group'>
          <textarea className="form-control" placeholder="Enter your note here..." rows="3" value={form.text} onChange={handleText}></textarea>
        </div>
        
        <div className='d-flex justify-content-between mt-2 align-items-center'>
          <div className="custom-radios d-flex justify-content-start align-item-center">

            <div className='form-check'>
              <input onChange={handleColor} className="form-check-input" type="radio" id="color-1" name="color" value="#2ecc71" />
              <label className="color-check-label" id="color-label-1" htmlFor="color-1" >
              
                  <img src="icons8-check.svg" alt="Checked Icon" />
                
              </label>
            </div>

            <div className='form-check'>
              <input onChange={handleColor} className="form-check-input" type="radio" id="color-2" name="color" value="#3498db" />
              <label className="color-check-label" id="color-label-2" htmlFor="color-2">
              
                  <img src="icons8-check.svg" alt="Checked Icon" />
                
              </label>
            </div>

            <div className='form-check'>
              <input onChange={handleColor} className="form-check-input" type="radio" id="color-3" name="color" value="#f1c40f" />
              <label className="color-check-label" id="color-label-3" htmlFor="color-3">
              
                  <img src="icons8-check.svg" alt="Checked Icon" />
                
              </label>
            </div>

            <div className='form-check'>
              <input onChange={handleColor} className="form-check-input" type="radio" id="color-4" name="color" value="#e74c3c" />
              <label className="color-check-label" id="color-label-4" htmlFor="color-4" >
              
                  <img src="icons8-check.svg" alt="Checked Icon" />
                
              </label>
            </div>

          </div>

          <div>
            <button type="submit" className="btn btn-outline-danger px-3">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Form