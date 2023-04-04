//creates a two dimmensional array with 64 'squares'.
const buildBoard = () => {
  let board = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.push([j, i]);
    }
  }
  return board;
};
//Loops through board array and finds given index of coordinates.
const findIndex = (board, start) => {
  let hash = {};
  for (let i = 0; i < board.length; i++) {
    hash[board[i]] = i;
  }
  if (hash.hasOwnProperty(start)) {
    console.log(`Index of given cordinates are: ${hash[start]}`);
  }
};
//initlizes new array with object properties for 'distance' and 'predecessors'.
const buildInfoArr = (board, start) => {
  let arr = [];
  for (let i = 0; i < board.length; i++) {
    arr[i] = {
      distance: null,
      predecessor: null,
    };
  }
  arr[start].distance = 0;
  return arr;
};
const buildAdjList = (board) => {
  let adjList = [];
  for (let i = 0; i < board.length; i++) {
    let edges = [];
    for (let j = 0; j < 8; j++) {}
  }
};
const getEdge = (i, x, y) => {
  if (i == 0) return [x + 2, y + 1];
  if (i == 1) return [x + 1, y + 2];
  if (i == 2) return [x - 1, y + 2];
  if (i == 3) return [x - 2, y + 1];
  if (i == 4) return [x - 2, y - 1];
  if (i == 5) return [x - 1, y - 2];
  if (i == 6) return [x + 1, y - 2];
  if (i == 7) return [x + 2, y - 1];
};
function knightMoves(start, end) {
  let board = buildBoard();
  let startIndex = findIndex(board, start);
  let endIndex = findIndex(board, end);
  let bfs = buildInfoArr(board, startIndex);
  let adjList = buildAdjList(board);
}
