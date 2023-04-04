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
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === start[0] && board[i][1] === start[1]) {
      return i;
    }
  }
};
//initlizes new array with object properties for 'distance' and 'predecessors'.
const buildInfoArr = (board, startIndex) => {
  let newArr = [];
  for (let i = 0; i < board.length; i++) {
    newArr[i] = {
      distance: null,
      predecessor: null,
    };
  }
  newArr[startIndex].distance = 0;
  return newArr;
};

//build adjencey list from buildBoard function.
const buildAdjList = (board) => {
  let adjList = [];
  for (let i = 0; i < board.length; i++) {
    let edges = [];
    for (let j = 0; j < 8; j++) {
      let edge = getEdge(j, board[i][0], board[i][1]);
      if (withinRange(board, edge)) {
        edges.push(findIndex(board, edge));
      }
    }
    adjList[i] = edges;
  }
  return adjList;
};
//gets connections between each of the differenr chess board pieces.
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
//checks if there is a valid spot for given 'square' piece.
const withinRange = (arr, index) => {
  if (
    arr.find((element) => element[0] === index[0]) &&
    arr.find((element) => element[1] === index[1])
  ) {
    return true;
  }
};
//creates and returns all nodes knight traveled
function constructPath(board, infoArr, item, index, newArr) {
  if (item.predecessor === null) return;
  if (item.predecessor != null) {
    newArr.push(board[index]);
    constructPath(
      board,
      infoArr,
      infoArr[item.predecessor],
      item.predecessor,
      newArr
    );
  }
}
function knightMoves(start, end) {
  let board = buildBoard();
  let startIndex = findIndex(board, start);
  let endIndex = findIndex(board, end);
  let bfs = buildInfoArr(board, startIndex);
  let adjList = buildAdjList(board);
  let queue = [startIndex];
  let begining;

  while (begining != endIndex) {
    begining = queue.shift();

    for (let i = 0; i < adjList[begining].length; i++) {
      let targetIndex = adjList[begining][i];
      if (targetIndex === endIndex) {
        bfs[targetIndex].predecessor = begining;
        let knightPath = [];
        constructPath(board, bfs, bfs[targetIndex], targetIndex, knightPath);
        let result = knightPath.reverse().splice(0, 0, start);
        console.log(
          `You made it in ${knightPath.length - 1} moves! Here's your path:`
        );
        return knightPath;
      } else {
        // Update info for neighbor square & enqueue it
        if (bfs[targetIndex].distance == null) {
          bfs[targetIndex].distance = bfs[begining].distance + 1;
          bfs[targetIndex].predecessor = begining;
          queue.push(targetIndex);
        }
      }
    }
  }
}
console.log(knightMoves([3, 3], [0, 0]));
