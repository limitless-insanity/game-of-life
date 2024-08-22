function makeMatrix(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
var row;
var col;
var grid;
var resolution = 20;
async function setup() {
  createCanvas(601, 401);
  row = floor(width / resolution);
  col = floor(width / resolution);

  grid = makeMatrix(col, row);

  for (var i = 0; i < col; i++) {
    for (var j = 0; j < row; j++) {
      grid[i][j] = floor(random(2));
    }
  }
  await resolveAfter2Seconds();
}

async function draw() {
  background(50);

  for (let i = 0; i < col; i++) {
    let x = i * resolution;
    for (let j = 0; j < row; j++) {
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255); //white
        stroke(70);
        rect(x, y, resolution, resolution);
      }
    }
  }
  let next = makeMatrix(col, row);
  for (var i = 0; i < col; i++) {
    for (var j = 0; j < row; j++) {
      let neighbour = neighbourCalc(i, j);

      let state = grid[i][j];
      if (state == 0 && neighbour == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbour < 2 || neighbour > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  await resolveAfterHalfSeconds();
  grid = next;

  console.table(next);
}
function resolveAfterHalfSeconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 20);
  });
}
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

function neighbourCalc(i, j) {
  var total = 0;
  for (var yy = -1; yy <= 1; yy++) {
    for (var xx = -1; xx <= 1; xx++) {
      var ii = i + yy;
      var jj = j + xx;
      if (ii > -1 && ii < col && jj > -1 && jj < row) {
        if (grid[ii][jj] == 1) {
          total++;
        }
      }
    }
  }
  //add the neighbour valuse
  total -= grid[i][j];
  return total;
}
