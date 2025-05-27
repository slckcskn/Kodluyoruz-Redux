import { useEffect, useRef } from 'react'
import { Link } from "react-router";

import { useSelector, useDispatch } from 'react-redux'
import { fetchCharacters } from '../../redux/charactersSlice'

import Masonry from 'react-masonry-css'
import './styles.css';
import ScrollToTop from 'react-scroll-to-top';
import { ReactComponent as Up } from '../../up-arrow.svg'
import '../../components/ScrollToTop.css'

import Error from '../../components/Error'
import Loading from '../../components/Loading'


function Home() {
  const characters = useSelector((state) => state.characters.items)
  const nextPage = useSelector((state) => state.characters.page)
  const status = useSelector((state) => state.characters.status)
  const error = useSelector((state) => state.characters.error)
  const hasNextPage = useSelector((state) => state.characters.hasNextPage)
  const dispatch = useDispatch()

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && status === 'idle') {
      dispatch(fetchCharacters(nextPage))
      isFirstRender.current = false;
    }
  }, [dispatch, nextPage, status])

  if (status === 'failed') {
    return <Error message={error} />
  }

  return (
    <div>
      <h1>Characters</h1>

      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {characters.map((character) => (
          <div key={character.id}>
            <Link to={`/character/${character.id}`}>
              <img src={character.image} alt={character.name} className='character' />
              <div className='char_name'>{character.name}</div>
            </Link>
          </div>
        ))
        }
      </Masonry>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {status === 'loading' && <Loading />}
        {hasNextPage && status !== 'loading' ? (
          <button onClick={() => {
            dispatch(fetchCharacters(nextPage));
          }}>Load More {nextPage}</button>
        ) : (status !== 'loading' &&
          <div>There is nothing to be shown.</div>
        )}
      </div>
      <ScrollToTop 
        smooth 
        component={<Up />}
        className="scroll-to-top-button"
      />
    </div>
  )
}

export default Home