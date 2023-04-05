import { createBoard } from "./dom/createBoard.js";
import * as modules from "./modules/knightMoves.js";

window.addEventListener("load", () => {
  //global variables
  let globalCords = [];
  let count = 0;
  let start = [];
  let end = [];
  let knight = document.createElement("img");
  knight.src = "./img/chess.png";
  knight.classList.add("knight");

  //dynamially grabs ID's of HTML elements
  const $ = (id) => {
    return document.getElementById(id);
  };
  let gameBoard = $("gameboard");
  createBoard(gameBoard); //creates div elements for gameboard;
  let rows = gameBoard.getElementsByTagName("tr");
  let placeKnightBtn = $("start");
  let endKnightBtn = $("end");
  let travailBtn = $("travail");
  let board = modules.buildBoard();

  //uses eventListner to let clicked square return a pair of cordinates;
  const returnCords = (e) => {
    count++;
    let cords = [];
    let chessSquare = e.currentTarget;
    let x = parseInt(chessSquare.dataset.xcord, 10);
    let y = parseInt(chessSquare.dataset.ycord, 10);
    cords.push(x);
    cords.push(y);
    globalCords = cords;
    if (count % 2 !== 0) {
      s(globalCords);
      chessSquare.appendChild(knight);
    } else {
      t(globalCords);
      chessSquare.classList.add("start");
    }
  };

  const s = (x) => {
    start = x;
  };
  const t = (y) => {
    end = y;
  };

  const addCords = () => {
    let squares = null;
    for (let i = 0; i < rows.length; i++) {
      squares = rows[i].getElementsByTagName("td");
      for (let n = 0; n < squares.length; n++) {
        //attaches cordinate values to each chessboard piece
        squares[n].dataset.xcord = i;
        squares[n].dataset.ycord = n;
        squares[n].addEventListener("click", returnCords);
      }
    }
    return false;
  };

  placeKnightBtn.addEventListener("click", () => {
    addCords();
  });
  endKnightBtn.addEventListener("click", () => {
    addCords();
  });
  travailBtn.addEventListener("click", () => {
    let path = modules.knightMoves(start, end);
  });
});
