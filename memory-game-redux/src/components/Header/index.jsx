import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetGame } from '../../redux/memorySlice'
import './Header.css'

function Header() {
  const score = useSelector((state) => state.memory.score)
  const cards = useSelector((state) => state.memory.cards)
  const dispatch = useDispatch()

  const isGameComplete = cards.length > 0 && cards.every(card => card.isMatched)

  return (
    <div className='header'>
      <h1 className='game-title'>Memory Card Game</h1>
      <div className='score-display'>
        <span className='score-label'>Score:</span>
        <span className='score-value'>{score}</span>
        {isGameComplete && (
          <button
            className='reset-button'
            onClick={() => dispatch(resetGame())}
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  )
}

export default Header