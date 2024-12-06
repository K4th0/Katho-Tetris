import './style.css'

// Initialize canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

let gameOver = false
let lockedPiece = false
let points = 0
let spacePressed = false

const BLOCK_SIZE = 40
const BOARD_WIDTH = 15
const BOARD_HEIGHT = 30

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

// Create the Game Board
const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

// Define the pieces to play
const pieces = [
  {
    shape: [
      [1, 1, 1, 1]
    ],
    color: 'cyan'
  },
  {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'yellow'
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'purple'
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'green'
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'red'
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'orange'
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'blue'
  }
]

// Select a random piece to play
let piece = getRandomPiece()

function getRandomPiece () {
  const randomIndex = Math.floor(Math.random() * pieces.length)
  return {
    ...pieces[randomIndex],
    position: { x: 6, y: 2 }
  }
}

function initializePiece () {
  piece = getRandomPiece()
  lockedPiece = false
}

// Set the Game Loop which will be updating constantly and move the piece down every 1 sec.
document.querySelector('span').addEventListener('click', () => {
  setInterval(() => {
    if (!gameOver && !spacePressed) {
      piece.position.y++
      if (checkCollision()) {
        piece.position.y--
        mergePiece()
        lockedPiece = false
        piece = getRandomPiece()
        initializePiece()
      }
    }
  }, 1000)
})

function update () {
  draw()
  if (!gameOver) {
    completeLine()
    window.requestAnimationFrame(update)
  }
}

// Draw the object in the canvas, both the board and the pieces
function draw () {
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = value
        context.fillRect(x, y, 1, 1)
      }
    })
  })

  if (!gameOver) {
    context.fillStyle = piece.color
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
        }
      })
    })
    context.strokeStyle = 'white'
    context.lineWidth = 0.1
    context.beginPath()
    context.moveTo(0, 4)
    context.lineTo(BOARD_WIDTH, 4)
    context.stroke()
  } else {
    context.strokeStyle = 'white'
    context.lineWidth = 0.1
    context.beginPath()
    context.moveTo(0, 4)
    context.lineTo(BOARD_WIDTH, 4)
    context.stroke()
    context.fillStyle = 'white'
    context.font = '2px sans-serif'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText('GAME OVER', BOARD_WIDTH / 2, BOARD_HEIGHT / 2)
    context.font = '1px sans-serif'
    context.fillText('Press "R" to play again', BOARD_WIDTH / 2, BOARD_HEIGHT / 2 + 2)
  }
  context.fillStyle = 'white'
  context.font = '1px sans-serif'
  context.textAlign = 'left'
  context.textBaseline = 'top'
  context.fillText('Score: ' + points, 0.5, 0.5)
}

// Define the behaviour of the played piece when the player pres a key
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    piece.position.x--
    if (checkCollision()) {
      piece.position.x++
    }
  }

  if (event.key === 'ArrowRight') {
    piece.position.x++
    if (checkCollision()) {
      piece.position.x--
    }
  }

  if (event.key === 'ArrowDown') {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
    }
  }

  if (event.key === 'ArrowUp') {
    let surroundedPiece = false
    if (!lockedPiece) {
      const auxRotatedPiece = rotatePiece()
      const halfPiece = Math.floor(auxRotatedPiece.shape.length / 2)
      auxRotatedPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (x + auxRotatedPiece.position.x + 1 >= board[0].length) {
            auxRotatedPiece.position.x--
          }
          if (board[y + auxRotatedPiece.position.y][x + auxRotatedPiece.position.x] === 1) {
            auxRotatedPiece.position.y--
          }
          const isBlockedAbove = y + auxRotatedPiece.position.y - 1 < 0 || board[y + auxRotatedPiece.position.y - 1][x + auxRotatedPiece.position.x] === 1
          const isBlockedBelow = y + auxRotatedPiece.position.y + 1 >= board.length || board[y + auxRotatedPiece.position.y + 1][x + auxRotatedPiece.position.x] === 1
          if (y === halfPiece && isBlockedAbove && isBlockedBelow) {
            surroundedPiece = true
          }
        })
      })
      if (!surroundedPiece) {
        piece = auxRotatedPiece
        if (checkCollision()) {
          piece.position.y--
        }
      }
    }
  }

  if (event.key === ' ') {
    if (!spacePressed) {
      spacePressed = true
      while (!checkCollision()) {
        piece.position.y++
      }
      piece.position.y--
      mergePiece()
      lockedPiece = false
      piece = getRandomPiece()
      initializePiece()
      spacePressed = false
    }
  }

  if (event.key === 'r' && gameOver) {
    console.log('sadsadsa')
    resetGame()
    gameOver = false
    points = 0
  }
})

// Reset the game and the points
function resetGame () {
  gameOver = false
  lockedPiece = false
  points = 0
  piece = getRandomPiece()
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      board[y][x] = 0
    }
  }
  update()
}

// Check the collisions beetween the piece played and the pieces in the board or the boundaries of the board
function checkCollision () {
  if (!Array.isArray(piece.shape) || !piece.shape.every(row => Array.isArray(row))) {
    return false
  }

  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      if (value !== 0) {
        return (
          y + piece.position.y < 0 ||
          y + piece.position.y >= board.length ||
          board[y + piece.position.y][x + piece.position.x] !== 0 ||
          x + piece.position.x >= board[0].length - 1 ||
          x + piece.position.x < 0
        )
      }
      return false
    })
  })
}

// Define the rotating movement of the piece
function rotatePiece () {
  const rotatedPiece = JSON.parse(JSON.stringify(piece))

  const numRows = piece.shape.length
  const numCols = piece.shape[0].length

  rotatedPiece.shape = []
  for (let i = 0; i < numCols; i++) {
    rotatedPiece.shape.push([])
  }
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      rotatedPiece.shape[i][j] = piece.shape[numRows - j - 1][i]
    }
  }
  return rotatedPiece
}

// Merge the piece with the board when the piece reaches the bottom of it or crash with another piece
function mergePiece () {
  let mergedPiece = false
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + piece.position.y][x + piece.position.x] = piece.color
        mergedPiece = true
      }
    })
  })
  if (mergedPiece) {
    if (piece.position.y <= 3) {
      gameOver = true
    }
  }
}

// Check if a line is completed, if is so then delete the line and add points
function completeLine () {
  for (let row = 0; row < BOARD_HEIGHT; row++) {
    const isComplete = board[row].slice(0, -1).every(value => value !== 0)
    if (isComplete) {
      for (let i = row; i >= 0; i--) {
        if (i > 0) {
          board[i] = [
            ...board[i - 1].slice(0, -1),
            board[i][board[i].length - 1]
          ]
        }
      }
      points += 36
    }
  }
}

document.querySelector('span').addEventListener('click', () => {
  update()
  document.querySelector('section').remove()
  // eslint-disable-next-line no-undef
  const audio = new Audio('./public/Tetris.mp3')
  audio.volume = 0.5
  audio.play()
})
