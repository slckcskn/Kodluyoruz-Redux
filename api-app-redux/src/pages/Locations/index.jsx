import { useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchLocations } from '../../redux/locationsSlice'

import Masonry from 'react-masonry-css'
import './styles.css';
import ScrollToTop from 'react-scroll-to-top';
import { ReactComponent as Up } from '../../up-arrow.svg'
import '../../components/ScrollToTop.css'

import Error from '../../components/Error'
import Loading from '../../components/Loading'


function Home() {
  const locations = useSelector((state) => state.locations.items)
  const nextPage = useSelector((state) => state.locations.page)
  const status = useSelector((state) => state.locations.status)
  const error = useSelector((state) => state.locations.error)
  const hasNextPage = useSelector((state) => state.locations.hasNextPage)
  const dispatch = useDispatch()

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && status === 'idle') {
      dispatch(fetchLocations(nextPage))
      isFirstRender.current = false;
    }
  }, [dispatch, nextPage, status])

  if (status === 'failed') {
    return <Error message={error} />
  }

  return (
    <div>
      <h1>Locations</h1>

      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {locations.map((location) => (
          <div key={location.id}>
            
            <h5 className='location_name'>{location.name}</h5>
            <div className='location_name'>Type: {location.type}</div>
            <div className='location_name'>Dimension: {location.dimension}</div>
            
          </div>
        ))
        }
      </Masonry>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {status === 'loading' && <Loading />}
        {hasNextPage && status !== 'loading' ? (
          <button onClick={() => {
            dispatch(fetchLocations(nextPage));
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