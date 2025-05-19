import {useSelector, useDispatch} from 'react-redux';
import {setFilter} from '../redux/notes/notesSlice';

function Search() {

  const filter = useSelector(state => state.notes.filter)
  const dispatch = useDispatch()

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value))
  }

  return (
    <div className="input-group mb-3">
        <input 
            type="text"
            value={filter} 
            className="form-control" 
            placeholder="Search note..."
            onChange={handleFilterChange}
            />
    </div>
  )
}

export default Search