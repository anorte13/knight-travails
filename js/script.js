import { createBoard } from "./createBoard.js";

window.addEventListener("load", () => {
  //dynamially grabs ID's of HTML elements
  const $ = (id) => {
    return document.getElementById(id);
  };

  let gameBoard = $("gameboard");
  //creates gameboard dynamically
  createBoard(gameBoard);
});
