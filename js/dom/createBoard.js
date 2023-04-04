const createBoard = (id) => {
  for (let i = 0; i < 8; i++) {
    //creates 8 rows dynamically
    let row = id.insertRow(i);
    if (i % 2 == 0) {
      row.classList.add("even"); //adds a class of 'even' to even rows
    } else {
      row.classList.add("odd"); //adds a class of 'odd' to odd rows
    }
    for (let j = 0; j < 8; j++) {
      if (row.classList.contains("even")) {
        //for every 'even' row start by adding even classes then odd
        if (j % 2 == 0) {
          let space = row.insertCell(j);
          space.classList.add("white");
        } else {
          let space = row.insertCell(j);
          space.classList.add("black");
        }
      } else if (row.classList.contains("odd")) {
        //for every 'odd' row start by adding odd classes then even
        if (j % 2 !== 0) {
          let space = row.insertCell(j);
          space.classList.add("white");
        } else {
          let space = row.insertCell(j);
          space.classList.add("black");
        }
      }
    }
  }
};
export { createBoard };
