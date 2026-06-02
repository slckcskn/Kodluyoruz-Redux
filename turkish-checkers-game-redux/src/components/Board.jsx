import { useSelector, useDispatch } from 'react-redux'
import { selectPiece, movePiece, clearSelection } from '../redux/gameSlice'
import Square from './Square'

export default function Board() {
  const dispatch = useDispatch()
  const {
    board,
    currentTurn,
    selectedPiece,
    validMoves,
    mustContinueCapture,
    capturingPiece,
  } = useSelector(s => s.game)

  const isValidTarget = (r, c) => validMoves.some(m => m.row === r && m.col === c)

  const handleClick = (r, c) => {
    const piece = board[r]?.[c]

    if (mustContinueCapture) {
      if (isValidTarget(r, c)) {
        dispatch(movePiece({ row: r, col: c }))
      }
      return
    }

    if (!selectedPiece) {
      if (piece && piece.color === currentTurn) {
        dispatch(selectPiece({ row: r, col: c }))
      }
      return
    }

    if (isValidTarget(r, c)) {
      dispatch(movePiece({ row: r, col: c }))
      return
    }

    if (piece && piece.color === currentTurn) {
      dispatch(selectPiece({ row: r, col: c }))
      return
    }

    dispatch(clearSelection())
  }

  const bgColor = currentTurn === 'white' ? 'bg-amber-50' : 'bg-stone-900'

  return (
    <div className={`flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] ${bgColor} p-4 transition-colors duration-300`}>
      <div className="grid grid-cols-8 border-2 border-stone-700 rounded overflow-hidden shadow-2xl">
        {board.map((row, r) =>
          row.map((piece, c) => (
            <Square
              key={`${r}-${c}`}
              row={r}
              col={c}
              piece={piece}
              isSelected={selectedPiece?.row === r && selectedPiece?.col === c}
              isValidMove={isValidTarget(r, c)}
              onClick={() => handleClick(r, c)}
            />
          ))
        )}
      </div>

      {mustContinueCapture && (
        <p className="mt-3 text-green-400 text-sm">
          Aynı taşla alıma devam etmelisiniz!
        </p>
      )}
    </div>
  )
}
