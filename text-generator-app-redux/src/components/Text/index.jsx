import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchText } from '../../redux/textSlice.jsx'
import '../../../src/App.css';

function Text() {

  const dispatch = useDispatch()
  const { text, status, error } = useSelector(state => state.text)
  const [paraNum, setParaNum] = useState(2)
  const [paraFormat, setParaFormat] = useState('text')

  useEffect(() => {
    dispatch(fetchText(paraNum, paraFormat))
  }, [dispatch, paraNum, paraFormat])

  const loadingElements = (paraNum) => {
    const elements = [];
    for (let i = 0; i < paraNum; i++) {
      elements.push(<div key={i}>
        <span className='placeholder w-100'></span>
        <span className='placeholder col-4'></span>
        <span className='placeholder col-6'></span>
      </div>)
    }
    return elements;
  }

  return (
    <div className="container text-center">
      <div className="row mt-4">
        <div className="col-6 mx-auto inputDiv">
          <h1>Text Generator Redux</h1>
          <a href='https://github.com/slckcskn/Kodluyoruz-Redux'>
            <img className='me-1 icon mt-2 mb-4' src='./public/GitHub-logo.png' alt='github logo' width={24} />
          </a>


          <div className="row mx-auto col-5">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Paragraphs</span>
              <input className="form-control" type="number" value={paraNum} onChange={(e) => setParaNum(e.target.value)}></input>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Text Type</span>
              <select className="form-select" id="inputGroupSelect01" value={paraFormat} onChange={(e) => setParaFormat(e.target.value)}>
                <option value="text">Text</option>
                <option value="html">HTML</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row mx-auto mt-4 textDiv">
        <div className='col-11 mx-auto'>
          {status === 'loading' ? <>{loadingElements(paraNum)}</> :
            status === 'failed' ? <h3 className='text-center'>Error: {error}</h3> :
              text.map((paragraph, index) => (
                <p key={index}>
                  {paraFormat === 'html' ? "<p>" + paragraph + "</p>" : paragraph}
                </p>
              ))}
        </div>
      </div>
    </div>
  )

}

export default Text