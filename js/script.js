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
  let output = document.getElementsByClassName("output");
  createBoard(gameBoard); //creates div elements for gameboard;
  let rows = gameBoard.getElementsByTagName("tr");
  let placeKnightBtn = $("start");
  let endKnightBtn = $("end");
  let randomKnight = $("random");
  let travailBtn = $("travail"); //disable to prevent user from inputing with null array
  travailBtn.disabled = true;
  let clear = $("clear");
  clear.disabled = true; //disable to prevent user from clearing board mid move

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
      startPoint(globalCords);
      //create knight image
      knight = document.createElement("img");
      knight.src = "./img/chess.png";
      knight.classList.add("knight");
      //append knight image to choose square
      chessSquare.classList.add("knight");
      chessSquare.appendChild(knight);
    } else {
      endPoint(globalCords);
      //add red sqaure to end piece
      chessSquare.classList.add("start");
    }
  };
  //returns start and end points of respective function
  const startPoint = (x) => {
    start = x;
  };
  const endPoint = (y) => {
    end = y;
  };
  //Adds cordinates to all pieces on the chessboard
  const addCords = () => {
    for (let i = 0; i < rows.length; i++) {
      squares = rows[i].getElementsByTagName("td");
      for (let n = 0; n < squares.length; n++) {
        squares[n].dataset.xcord = i;
        squares[n].dataset.ycord = n;
        squares[n].addEventListener("click", returnCords);
      }
    }
  };
  //Clears chess board of all knight pieces and end points and clears out all coordinates
  const clearBoard = () => {
    globalCords = [];
    count = 0;
    start = [];
    end = [];
    for (let i = 0; i < rows.length; i++) {
      squares = rows[i].getElementsByTagName("td");
      for (let n = 0; n < squares.length; n++) {
        if (squares[n].classList.contains("start")) {
          squares[n].classList.remove("start");
        }
        if (
          squares[n].classList.contains("knight") ||
          squares[n].classList.contains("knight-path")
        ) {
          squares[n].removeChild(squares[n].firstElementChild);
        }
      }
    }
  };
  //Allows user to randomly place a knight on the chessboard
  const createRandomKnight = () => {
    let x = Math.floor(Math.random() * 8);
    let y = Math.floor(Math.random() * 8);

    count++; //Increments counter as if adding knight for the first move

    globalCords = [x, y];

    startPoint(globalCords);
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
          console.log(knight);
        }
      }
    }
  };
  const knightPath = (arr) => {
    let currentIndex = 1;

    const appendNextKnight = () => {
      if (currentIndex >= arr.length) {
        return;
      }
      const element = arr[currentIndex];
      const x = element[0];
      const y = element[1];

      const rows = document.getElementsByTagName("tr");

      for (let i = 0; i < rows.length; i++) {
        const squares = rows[i].getElementsByTagName("td");

        for (let n = 0; n < squares.length; n++) {
          const square = squares[n];

          if (
            square.dataset["xcord"] === `${x}` &&
            square.dataset["ycord"] === `${y}`
          ) {
            const knight = document.createElement("img");
            knight.src = "./img/chess.png";
            knight.classList.add("knight", "animate-knight");

            square.classList.add("knight-path");
            square.appendChild(knight);
          }
        }
      }
      currentIndex++;
      // Adjust the delay between each image append operation as per your preference
      setTimeout(appendNextKnight, 1000); // 500ms delay between each image append
      // Or use setInterval for a constant delay
      // setInterval(appendNextKnight, 500); // 500ms delay between each image append
    };

    appendNextKnight();
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
    knightPath(path);
    placeKnightBtn.disabled = false;
    endKnightBtn.disabled = false;
    clear.disabled = false;
    travailBtn.disabled = true;
    output.innerHTML = `<p>You made it in ${path.length - 1} moves! <p>`;
  });
  randomKnight.addEventListener("click", () => {
    for (let i = 0; i < rows.length; i++) {
      squares = rows[i].getElementsByTagName("td");
      for (let n = 0; n < squares.length; n++) {
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
