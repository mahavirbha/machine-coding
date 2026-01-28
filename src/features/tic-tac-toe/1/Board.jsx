import useTicTacToe from "./useTickTacToe";

function Board() {
  const { board, getStatusMessage, resetGame, handleCellClick } =
    useTicTacToe();
  return (
    <div className="game">
      <div>
        <h4 className="status">{getStatusMessage()}</h4>
      </div>
      <div className="board">
        {board.map((el, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
            disabled={el !== null}
          >
            {el}
          </button>
        ))}
      </div>
      <button className="resetbtn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default Board;
