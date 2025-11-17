import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {inputText, toggleHelp} from '../../redux/markdownSlice';
import Markdown from 'react-markdown'


function MarkdownPreview() {

  const dispatch = useDispatch();
  const text = useSelector((state) => state.markdown.text)
  const userText = useSelector((state) => state.markdown.userText)
  const isHelp = useSelector((state) => state.markdown.isHelp)

  const handleClick = () => {
    dispatch(toggleHelp())
  }

  const handleChange = (e) => {
    dispatch(inputText(e.target.value))
  }

  return (
    <div className='container-fluid text-center'>
        <div className='row mt-4 text-center'>
          <div className='col-12'>
            <h1>Markdown Previewer</h1>
          </div>
        </div>
        <div className='col-12 mt-3'>
          <button type='button' className='btn btn-light rounded-circle fw-bold' onClick={handleClick}>?</button>
        </div>
        <div className='row mt-4'>
          <div className='col-md-6 mx-auto mb-4'>
              <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold">Input</label>
              <textarea className="form-control px-2 rounded-4" style={{height: '600px', resize: 'vertical'}} value={text} onChange={handleChange} readOnly={isHelp} rows={20}></textarea>
          </div>
          <div className='col-md-6 mx-auto mb-4'>
              <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold">Output</label>
              <div className="form-control px-2 rounded-4" style={{height: '600px', overflow: 'auto'}}><Markdown>{text}</Markdown></div>
          </div>
        </div>

        <footer className="mt-1 flex-wrap align-items-center py-3 my-4">
        
          <a href="https://github.com/slckcskn/Kodluyoruz-Redux" className="nav-link px-2 text-white"><img src='../github-circle-32.png' alt='github logo' width={40} /></a>
        
        </footer>

    </div>
  )
}

export default MarkdownPreview
