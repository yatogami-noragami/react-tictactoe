import { useState, useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const getLastWord = (str) => {
    const words = str.split('');
    return words[words.length - 1];
  };

  const winMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]


  const [p1Turn, setP1Turn] = useState(true)
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [gameover, setGameover] = useState(false)
  const [resultText, setResultText] = useState('')

  const cellClick = (event) => {
    const cellId = event.target.id
    const cellIndex = getLastWord(cellId)
    const cell = document.getElementById(cellId)
    const cellClass = cell.classList

    if (cellClass.contains('xClass') || cellClass.contains('oClass')) {

    }
    else {
      if (p1Turn) {
        cell.classList.add('xClass')
        const newBoard = [...board];
        newBoard[cellIndex] = 'X';
        setBoard(newBoard);
        setP1Turn(false)
      }
      else {
        cell.classList.add('oClass')
        const newBoard = [...board];
        newBoard[cellIndex] = 'O';
        setBoard(newBoard);
        setP1Turn(true)
      }
    }
  }


  useEffect(() => {
    checkForWin()
  })



  const checkForWin = () => {
    for (const move of winMoves) {
      const [a, b, c] = move;
      if (board[a] === board[b] && board[b] === board[c] && board[a] !== null) {
        setGameover(true)
        setResultText(`Player ${board[a]} win !`)
      }
    }

    if (board.every((cell) => cell !== null)) {
      setGameover(true)
      setResultText(`It is a draw !`)
    }
  };

  const restartGame = () => {
    const allCells = document.querySelectorAll('.cell');
    allCells.forEach((cell) => cell.classList.remove('xClass'));
    allCells.forEach((cell) => cell.classList.remove('oClass'));
    setP1Turn(true)
    setBoard(initialBoard)
    setGameover(false)
  }

  return (
    <div className="App d-flex justify-content-center align-items-center">

      <div className={`board ${gameover ? 'gameover' : ''}`}>
        <div className={`cell`} id='cell0' onClick={cellClick} ></div>

        <div className={`cell`} id='cell1' onClick={cellClick} ></div>

        <div className={`cell`} id='cell2' onClick={cellClick} ></div>

        <div className={`cell`} id='cell3' onClick={cellClick} ></div>

        <div className={`cell`} id='cell4' onClick={cellClick} ></div>

        <div className={`cell`} id='cell5' onClick={cellClick} ></div>

        <div className={`cell`} id='cell6' onClick={cellClick} ></div>

        <div className={`cell`} id='cell7' onClick={cellClick} ></div>

        <div className={`cell`} id='cell8' onClick={cellClick} ></div>

      </div>

      <div className={`bg-dark text-light resultPage w-100 p-3 d-flex justify-content-center align-items-center ${gameover ? 'show' : 'fade'}`} >
        <h1 className="text-center p-3" id='resultTxt'>{resultText}</h1>
        <button className="btn btn-outline-light fw-bold " onClick={restartGame}>Restart</button>
      </div>


    </div>
  );
}

export default App;
