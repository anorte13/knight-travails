import { createBoard } from "./dom/createBoard.js";
import * as modules from "./modules/knightMoves.js";

window.addEventListener("load", () => {
  //global variables
  let globalCords = [];
  let count = 0;
  let start = [];
  let end = [];
  let squares = null;
  let knight;
  //dynamially grabs ID's of HTML elements
  const $ = (id) => {
    return document.getElementById(id);
  };
  let gameBoard = $("gameboard");
  createBoard(gameBoard); //creates div elements for gameboard;
  let rows = gameBoard.getElementsByTagName("tr");
  let placeKnightBtn = $("start");
  let endKnightBtn = $("end");
  let randomKnight = $("random");
  let travailBtn = $("travail"); //disable to prevent user from inputing with null array
  travailBtn.disabled = true;
  let clear = $("clear");
  clear.disabled = true; //disable to prevent user from clearing board mid move
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
      //create knight image
      knight = document.createElement("img");
      knight.src = "./img/chess.png";
      knight.classList.add("knight");
      //append knight image to choose square
      chessSquare.classList.add("knight");
      chessSquare.appendChild(knight);
    } else {
      t(globalCords);
      //add red sqaure to end piece
      chessSquare.classList.add("start");
    }
  };
  //returns start and end points of respective function
  const s = (x) => {
    start = x;
  };
  const t = (y) => {
    end = y;
  };
  const addCords = () => {
    for (let i = 0; i < rows.length; i++) {
      squares = rows[i].getElementsByTagName("td");
      for (let n = 0; n < squares.length; n++) {
        //attaches cordinate values to each chessboard piece
        squares[n].dataset.xcord = i;
        squares[n].dataset.ycord = n;
        squares[n].addEventListener("click", returnCords);
      }
    }
  };
  const clearBoard = () => {
    globalCords = [];
    count = 0;
    start = [];
    end = [];
    knight.parentNode.removeChild(knight);
    for (let i = 0; i < rows.length; i++) {
      squares = rows[i].getElementsByTagName("td");
      for (let n = 0; n < squares.length; n++) {
        if (squares[n].classList.contains("start")) {
          squares[n].classList.remove("start");
        }
      }
    }
  };

  const createRandomKnight = () => {
    let x = Math.floor(Math.random() * 8);
    let y = Math.floor(Math.random() * 8);

    count++;
    let cords = [x, y];
    globalCords = cords;
    console.log(globalCords);
    s(globalCords);
    placeKnightBtn.disabled = true;

    for (let i = 0; i < rows.length; i++) {
      squares = rows[i].getElementsByTagName("td");
      for (let n = 0; n < squares.length; n++) {
        if (
          squares[n].dataset["xcord"] === `${x}` &&
          squares[n].dataset["ycord"] === `${y}`
        ) {
          knight = document.createElement("img");
          knight.src = "./img/chess.png";
          knight.classList.add("knight");
          //append knight image to choose square
          squares[n].classList.add("knight");
          squares[n].appendChild(knight);
        }
      }
    }
  };

  placeKnightBtn.addEventListener("click", () => {
    addCords();
    placeKnightBtn.disabled = true;
  });
  endKnightBtn.addEventListener("click", () => {
    endKnightBtn.disabled = true;
    travailBtn.disabled = false;
    addCords();
  });
  travailBtn.addEventListener("click", () => {
    let path = modules.knightMoves(start, end);
    path.forEach((element) => {
      console.log(element);
    });
    placeKnightBtn.disabled = false;
    endKnightBtn.disabled = false;
    clear.disabled = false;
    travailBtn.disabled = true;
  });
  randomKnight.addEventListener("click", () => {
    for (let i = 0; i < rows.length; i++) {
      squares = rows[i].getElementsByTagName("td");
      for (let n = 0; n < squares.length; n++) {
        //attaches cordinate values to each chessboard piece
        squares[n].dataset.xcord = i;
        squares[n].dataset.ycord = n;
      }
    }
    createRandomKnight();
  });
  clear.addEventListener("click", () => {
    clearBoard();
    clear.disabled = true;
  });
});
