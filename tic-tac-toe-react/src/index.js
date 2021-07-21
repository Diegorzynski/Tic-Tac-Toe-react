import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 

const Square = (props) => {
  return (
    <button
     className="square"
     onClick={props.onClickEvent}
     >
    {props.value}
    </button>
  );
};

const Board = () => {
  
  const initialSquares = Array(9).fill(null);
  const [squares,setSquares] = useState(initialSquares); //to take turns
  const [xIsNExt,setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    // How to update the state in react, the immutable approach
    // .1 make a copy of squares state array
    const newSquares = [...squares];

    const winnerDeclare = Boolean(calculateWinner(newSquares))
    const squareFilled = Boolean(newSquares[i]);
    if(winnerDeclare || squareFilled) {
       return;

    }
    // .2 mutate the copy setting the ith element to 'X'
    newSquares[i] = xIsNExt ? 'X': 'O'; // taking turns
    // .3 call the setsqure function with the mutate copy
    setSquares(newSquares);
    setXIsNext(!xIsNExt);
  };

  const renderSquare = (i) => {
    return (
      <Square 
      value={squares[i]}
      onClickEvent={() => handleClickEvent(i)}  
      
      
      />
    );
  };
  const winner = calculateWinner(squares);
  const status =  winner? 
  `Wiiner:${winner}` :  `Next player: ${xIsNExt ? 'X': 'O'}`;
  return (
    <div>
    <div className="status">{status}</div>
    <div className="board-row">
      {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
    <div className="board-row">
    {renderSquare(3)}{renderSquare(4)}{renderSquare(5)} </div>
      <div className="board-row">
    {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: "column",
      alignItems: "center",
    }}>
    Tic-Tac-Toe
    <Board />
    </div>
  );
};

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

function calculateWinner (squares) {
    const lines = [[0,1,2],[3,4,5],[6,7,8], // horizontal winning combinations
                   [0,3,6],[1,4,7],[2,5,8], // vertical combinations
                  [0,4,8],[2,4,6],// diagonal
];
//loop over to see if theres any combination
for (let line of lines) { //use destructuring assignment syntax
    const [a,b,c] = line;
    if(squares[a] && squares [a] === squares[b] && squares[a] === squares[c]){
      return squares[a]; // x or o 
    }
  }
  return null;
}