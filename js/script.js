import { createBoard } from "./dom/createBoard.js";
import * as modules from "./modules/knightMoves.js";

window.addEventListener("load", () => {
  //dynamially grabs ID's of HTML elements

  const $ = (id) => {
    return document.getElementById(id);
  };

  let gameBoard = $("gameboard");
  let rows = gameBoard.getElementsByTagName("tr");
  let placeKnightBtn = $("start");

  createBoard(gameBoard);
  let board = modules.buildBoard();

  const returnCords = (e) => {
    let chessSquare = e.currentTarget;
    placeKnightBtn.disabled = true;
    console.log("Button has been disabled");
  };

  const getKnightPlacement = () => {
    let squares = null;
    //adds eventListners to all sqaures on chess board
    for (let i = 0; i < rows.length; i++) {
      squares = rows[i].getElementsByTagName("td");
      for (let n = 0; n < squares.length; n++) {
        //attaches cordinate values to each chessboard piece
        squares[n].value = `${i}, ${n}`;
        squares[n].addEventListener("click", returnCords);
      }
    }
  };
  placeKnightBtn.addEventListener("click", getKnightPlacement);
});
