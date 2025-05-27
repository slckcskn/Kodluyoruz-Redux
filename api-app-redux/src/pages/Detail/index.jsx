import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import Loading from '../../components/Loading'

function Detail() {
    const [char, setChar] = useState(null)
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    console.log(id)

    useEffect(() => {
        axios(`${import.meta.env.VITE_BASE_URL}/character/${id}`).then((res) => { setChar(res.data) }).finally(() => setLoading(false))
    }, [id])

    return (

        <div>
            {loading && <Loading />}
            {char && (
                <div>
                    <h1>{char.name}</h1>
                    <img src={char.image} alt={char.name} />
                </div>)}
            {
                char && <pre>
                    {JSON.stringify(char, null, 2)}
                </pre>
            }

        </div>
    )
}

export default Detail