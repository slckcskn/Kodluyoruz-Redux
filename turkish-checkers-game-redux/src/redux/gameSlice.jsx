import { createSlice } from '@reduxjs/toolkit'

function createEmptyBoard() {
  const board = Array.from({ length: 8 }, () => Array(8).fill(null))
  for (let c = 0; c < 8; c++) {
    board[1][c] = { color: 'black', isKing: false }
    board[2][c] = { color: 'black', isKing: false }
    board[5][c] = { color: 'white', isKing: false }
    board[6][c] = { color: 'white', isKing: false }
  }
  return board
}

function isValid(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8
}

function getForwardDirs(color) {
  return color === 'white'
    ? [[-1, 0], [0, -1], [0, 1]]
    : [[1, 0], [0, -1], [0, 1]]
}

function cloneBoard(board) {
  return board.map(row => row.map(cell => (cell ? { ...cell } : null)))
}

function getCaptures(board, row, col, color, isKing) {
  const dirs = isKing
    ? [[-1, 0], [1, 0], [0, -1], [0, 1]]
    : getForwardDirs(color)
  const results = []

  for (const [dr, dc] of dirs) {
    if (isKing) {
      let captured = []
      let step = 1
      while (true) {
        const cr = row + step * dr
        const cc = col + step * dc
        if (!isValid(cr, cc)) break

        const cell = board[cr][cc]
        if (cell === null) {
          step++
          continue
        }
        if (cell.color === color) break

        const br = cr + dr
        const bc = cc + dc
        if (!isValid(br, bc) || board[br][bc] !== null) break

        captured.push({ row: cr, col: cc })

        const nb = cloneBoard(board)
        nb[row][col] = null
        nb[cr][cc] = null
        nb[br][bc] = { color, isKing: true }

        const more = getCaptures(nb, br, bc, color, true)
        if (more.length > 0) {
          for (const m of more) {
            results.push({
              row: m.row,
              col: m.col,
              captures: [...captured, ...m.captures],
            })
          }
        } else {
          results.push({ row: br, col: bc, captures: [...captured] })
        }

        break
      }
    } else {
      const jr = row + dr
      const jc = col + dc
      const lr = row + 2 * dr
      const lc = col + 2 * dc
      if (!isValid(jr, jc) || !isValid(lr, lc)) continue
      const jumped = board[jr][jc]
      if (!jumped || jumped.color === color) continue
      if (board[lr][lc] !== null) continue

      const nb = cloneBoard(board)
      nb[row][col] = null
      nb[jr][jc] = null
      nb[lr][lc] = { color, isKing }

      const next = getCaptures(nb, lr, lc, color, isKing)
      if (next.length > 0) {
        for (const n of next) {
          results.push({
            row: n.row,
            col: n.col,
            captures: [{ row: jr, col: jc }, ...n.captures],
          })
        }
      } else {
        results.push({ row: lr, col: lc, captures: [{ row: jr, col: jc }] })
      }
    }
  }
  return results
}

function getSimpleMoves(board, row, col, color, isKing) {
  const dirs = isKing
    ? [[-1, 0], [1, 0], [0, -1], [0, 1]]
    : getForwardDirs(color)
  const moves = []

  for (const [dr, dc] of dirs) {
    if (isKing) {
      let step = 1
      while (true) {
        const nr = row + step * dr
        const nc = col + step * dc
        if (!isValid(nr, nc)) break
        if (board[nr][nc] !== null) break
        moves.push({ row: nr, col: nc, captures: [] })
        step++
      }
    } else {
      const nr = row + dr
      const nc = col + dc
      if (isValid(nr, nc) && board[nr][nc] === null) {
        moves.push({ row: nr, col: nc, captures: [] })
      }
    }
  }
  return moves
}

function findAllCaptures(board, color) {
  const byPiece = {}
  let globalMax = 0

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c]
      if (!p || p.color !== color) continue
      const caps = getCaptures(board, r, c, p.color, p.isKing)
      if (caps.length === 0) continue
      const pieceMax = Math.max(...caps.map(cap => cap.captures.length))
      byPiece[`${r},${c}`] = { caps, max: pieceMax }
      if (pieceMax > globalMax) globalMax = pieceMax
    }
  }

  if (globalMax === 0) return { anyCapture: false }

  const filtered = {}
  for (const [key, val] of Object.entries(byPiece)) {
    if (val.max === globalMax) {
      filtered[key] = val.caps.filter(c => c.captures.length === globalMax)
    }
  }
  return { anyCapture: true, maxLen: globalMax, byPiece: filtered }
}

function countPieces(board, color) {
  let count = 0
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]?.color === color) count++
    }
  }
  return count
}

const initialState = {
  phase: 'setup',
  players: { white: { name: '' }, black: { name: '' } },
  board: [],
  currentTurn: 'white',
  selectedPiece: null,
  validMoves: [],
  mustCapture: false,
  mustContinueCapture: false,
  capturingPiece: null,
  winner: null,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayers(state, action) {
      const { whiteName, blackName } = action.payload
      state.players.white.name = whiteName
      state.players.black.name = blackName
      state.board = createEmptyBoard()
      state.phase = 'playing'
      state.currentTurn = 'white'
      state.selectedPiece = null
      state.validMoves = []
      state.mustCapture = false
      state.mustContinueCapture = false
      state.capturingPiece = null
      state.winner = null
    },

    selectPiece(state, action) {
      const { row, col } = action.payload
      const piece = state.board[row]?.[col]
      if (!piece || piece.color !== state.currentTurn) {
        state.selectedPiece = null
        state.validMoves = []
        return
      }

      if (state.mustContinueCapture) {
        if (
          !state.capturingPiece ||
          state.capturingPiece.row !== row ||
          state.capturingPiece.col !== col
        ) {
          state.selectedPiece = null
          state.validMoves = []
          return
        }
        const caps = getCaptures(state.board, row, col, piece.color, piece.isKing)
        state.selectedPiece = { row, col }
        state.validMoves = caps
        return
      }

      // Alım zorunlu değil, tüm hamleleri (alım + normal) göster
      const caps = getCaptures(state.board, row, col, piece.color, piece.isKing)
      const moves = getSimpleMoves(state.board, row, col, piece.color, piece.isKing)
      state.selectedPiece = { row, col }
      state.validMoves = [...caps, ...moves]
      state.mustCapture = false
    },

    movePiece(state, action) {
      const { row: dr, col: dc } = action.payload
      const move = state.validMoves.find(m => m.row === dr && m.col === dc)
      if (!move) return

      const sr = state.selectedPiece.row
      const sc = state.selectedPiece.col
      const piece = state.board[sr][sc]

      state.board[sr][sc] = null
      for (const cap of move.captures) {
        state.board[cap.row][cap.col] = null
      }
      state.board[dr][dc] = { ...piece }

      if (move.captures.length > 0) {
        const nextCaps = getCaptures(state.board, dr, dc, piece.color, piece.isKing)
        if (nextCaps.length > 0) {
          state.mustContinueCapture = true
          state.capturingPiece = { row: dr, col: dc }
          state.selectedPiece = { row: dr, col: dc }
          state.mustCapture = true
          const bestLen = Math.max(...nextCaps.map(c => c.captures.length))
          state.validMoves = nextCaps.filter(c => c.captures.length === bestLen)
          return
        }
      }

      if (!piece.isKing && (dr === 0 || dr === 7)) {
        state.board[dr][dc].isKing = true
      }

      state.mustContinueCapture = false
      state.capturingPiece = null
      state.selectedPiece = null
      state.validMoves = []
      state.mustCapture = false
      endTurn(state, move.captures.length > 0)
    },

    clearSelection(state) {
      state.selectedPiece = null
      state.validMoves = []
      if (!state.mustContinueCapture) {
        state.mustCapture = false
      }
    },

    resetGame() {
      return { ...initialState }
    },
  },
})

function endTurn(state, wasCapture) {
  const whiteCount = countPieces(state.board, 'white')
  const blackCount = countPieces(state.board, 'black')

  if (whiteCount === 0) {
    state.winner = 'black'
    state.phase = 'finished'
    return
  }
  if (blackCount === 0) {
    state.winner = 'white'
    state.phase = 'finished'
    return
  }
  if (whiteCount === 1 && blackCount === 1) {
    state.winner = 'draw'
    state.phase = 'finished'
    return
  }

  if (!wasCapture) {
    state.currentTurn = state.currentTurn === 'white' ? 'black' : 'white'
  }
}

export const { setPlayers, selectPiece, movePiece, clearSelection, resetGame } =
  gameSlice.actions
export default gameSlice.reducer
