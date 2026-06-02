import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPlayers } from '../redux/gameSlice'

export default function PlayerSetup() {
  const dispatch = useDispatch()
  const [white, setWhite] = useState('Beyaz')
  const [black, setBlack] = useState('Siyah')

  const handleStart = () => {
    dispatch(
      setPlayers({
        whiteName: white.trim() || 'Beyaz',
        blackName: black.trim() || 'Siyah',
      })
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-stone-900 text-white p-4">
      
      <div className="bg-stone-800 rounded-lg p-8 w-full max-w-sm space-y-6 shadow-xl">
        <div>
          <label className="block text-sm text-stone-400 mb-1">Beyaz (ilk hamle)</label>
          <input
            className="w-full px-3 py-2 rounded bg-stone-700 border border-stone-600 focus:border-amber-500 focus:outline-none text-white"
            value={white}
            onChange={e => setWhite(e.target.value)}
            placeholder="Beyaz oyuncu adı"
          />
        </div>
        <div>
          <label className="block text-sm text-stone-400 mb-1">Siyah</label>
          <input
            className="w-full px-3 py-2 rounded bg-stone-700 border border-stone-600 focus:border-amber-500 focus:outline-none text-white"
            value={black}
            onChange={e => setBlack(e.target.value)}
            placeholder="Siyah oyuncu adı"
          />
        </div>
        <button
          className="w-full py-3 rounded font-semibold bg-amber-600 hover:bg-amber-500 transition-colors"
          onClick={handleStart}
        >
          Oyuna Başla
        </button>
      </div>
    </div>
  )
}
