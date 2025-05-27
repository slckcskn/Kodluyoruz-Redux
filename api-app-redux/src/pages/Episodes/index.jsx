import { useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchEpisodes } from '../../redux/episodesSlice'

import Masonry from 'react-masonry-css'
import './styles.css';
import ScrollToTop from 'react-scroll-to-top';
import { ReactComponent as Up } from '../../up-arrow.svg'
import '../../components/ScrollToTop.css'

import Error from '../../components/Error'
import Loading from '../../components/Loading'


function Home() {
  const episodes = useSelector((state) => state.episodes.items)
  const nextPage = useSelector((state) => state.episodes.page)
  const status = useSelector((state) => state.episodes.status)
  const error = useSelector((state) => state.episodes.error)
  const hasNextPage = useSelector((state) => state.episodes.hasNextPage)
  const dispatch = useDispatch()

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && status === 'idle') {
      dispatch(fetchEpisodes(nextPage))
      isFirstRender.current = false;
    }
  }, [dispatch, nextPage, status])

  if (status === 'failed') {
    return <Error message={error} />
  }

  return (
    <div>
      <h1>Episodes</h1>

      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {episodes.map((episode) => (
          <div key={episode.id}>
            

              <h5 className='episode_name'>{episode.name}</h5>
              <div className='episode_name'>Episode: {episode.episode}</div>
              <div className='episode_name'>Air Date: {episode.air_date}</div>
            
          </div>
        ))
        }
      </Masonry>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {status === 'loading' && <Loading />}
        {hasNextPage && status !== 'loading' ? (
          <button onClick={() => {
            dispatch(fetchEpisodes(nextPage));
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