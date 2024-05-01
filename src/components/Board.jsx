import { useState } from "react";

export function Board () {
  let gameOver = false
  const boards = []
  const [xIsNext, setXIsNext] =useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [arraySquares, setArraySquares] = useState([])

  const handleClick = (i) => {
    const nextSquares = squares.slice()
    const nextArraySquares = arraySquares.slice()
    nextArraySquares.push(i)
    
    nextSquares[i] = xIsNext ? "X" : "O"

    if(squares[i] || calculateWinner(squares)){
      return 
    }

    setArraySquares(nextArraySquares)
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  } 

  const calculateWinner = (squares) => {
    const lines =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]
        }
      }
    return null
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status= "Winner : " + winner 
    gameOver= true
  } else {
    status = "Player : " + ( xIsNext ? 'X' : 'O')
  }

  //clear first square
  if (!winner && arraySquares.length === 5 ){
    const nextArraySquares = arraySquares.slice()
    const nextSquares = squares.slice()
    const clear = arraySquares[0]
    nextSquares[clear] =null
    nextArraySquares.shift()

    setArraySquares(nextArraySquares)
    setSquares(nextSquares)

  }
  
  //show first square
  for (let i = 0; i < 9; i++){
    let style = {}
    if (arraySquares[0] === i && arraySquares.length === 4) {
      style = { 
        opacity: 0.3
      }
    }
    if ( winner && squares[i] !== winner)  { 
      style = { 
        opacity: 0.1,
      }

    }
    const board = {
      value: squares[i],
      onSquareClick: () => handleClick(i),
      style: style
    }
    boards.push(board)
  }

  const reset = () => {
    setXIsNext(true)
    setSquares(Array(9).fill(null))
    setArraySquares([])
  }

  return <>
  <div className="game-statut status">
    <h1>{status}</h1>
  </div>
  <div className="game-body">
     {boards.map((board, index) => (<Square key={index} style={board.style} value={board.value} onSquareClick={board.onSquareClick} gameOver={gameOver}/>))}
  </div>
  <button 
    className="btn btn-secondary"
    style={{ marginBottom: '50px' }} 
    onClick={reset}>
      Restart
  </button>
  </>
}

function Square ({value, onSquareClick, style = {},gameOver  }) {

    return <button style={style} className="btn btn-outline-secondary square" onClick={onSquareClick} disabled={gameOver}>{value}</button>
}