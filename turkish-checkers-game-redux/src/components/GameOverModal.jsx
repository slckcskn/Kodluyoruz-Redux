import { useSelector, useDispatch } from 'react-redux'
import { resetGame } from '../redux/gameSlice'

export default function GameOverModal() {
  const dispatch = useDispatch()
  const { winner, players } = useSelector(s => s.game)

  if (!winner) return null

  const getMessage = () => {
    if (winner === 'draw') {
      return {
        title: 'Gayyım (Beraberlik)',
        desc: 'Her iki tarafta da birer taş kaldı. Oyun berabere bitti!',
        icon: '🤝',
      }
    }
    return {
      title: `${players[winner].name} Kazandı!`,
      desc: `Tebrikler ${players[winner].name}! Oyunu kazandınız.`,
      icon: '👑',
    }
  }

  const msg = getMessage()

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-800 rounded-xl p-8 max-w-sm w-full text-center shadow-2xl border border-stone-600">
        <div className="text-5xl mb-4">{msg.icon}</div>
        <h2 className="text-2xl font-bold text-white mb-2">{msg.title}</h2>
        <p className="text-stone-400 mb-6">{msg.desc}</p>
        <button
          className="px-6 py-3 rounded-lg font-semibold bg-amber-600 hover:bg-amber-500 transition-colors text-white"
          onClick={() => dispatch(resetGame())}
        >
          Tekrar Oyna
        </button>
      </div>
    </div>
  )
}
