import Piece from './Piece'

export default function Square({ row, col, piece, isSelected, isValidMove, onClick }) {
  const baseColor = (row + col) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'

  return (
    <button
      className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center relative transition-colors
        ${baseColor}
        ${isSelected ? 'ring-3 ring-amber-400 ring-inset' : ''}
        ${isValidMove ? 'cursor-pointer' : 'cursor-default'}
      `}
      onClick={onClick}
    >
      {piece && <Piece color={piece.color} isKing={piece.isKing} />}
      {isValidMove && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            piece ? 'bg-green-500/30' : ''
          }`}
        >
          {!piece && <div className="w-4 h-4 rounded-full bg-green-400/70" />}
        </div>
      )}
    </button>
  )
}
