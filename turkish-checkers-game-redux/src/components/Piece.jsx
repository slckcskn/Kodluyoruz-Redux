export default function Piece({ color, isKing }) {
  const grad =
    color === 'white'
      ? 'bg-gradient-to-br from-white to-stone-200'
      : 'bg-gradient-to-br from-stone-700 to-black'

  return (
    <div
      className={`w-10 h-10 rounded-full ${grad} shadow-lg border-2 ${
        color === 'white' ? 'border-stone-300' : 'border-stone-500'
      } flex items-center justify-center select-none`}
    >
      {isKing && (
        <span className="text-sm" style={{ color: color === 'white' ? '#b45309' : '#fcd34d' }}>
          ★
        </span>
      )}
    </div>
  )
}
