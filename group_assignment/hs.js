// const canvas = document.getElementById('mazeCanvas');
// const ctx = canvas.getContext('2d');

// const cols = 20;
// const rows = 20;
// const cellSize = canvas.width / cols;

// let grid = [];
// let stack = [];
// let current;

// let solving = false;

// // Cell constructor
// class Cell {
//   constructor(i, j) {
//     this.i = i;
//     this.j = j;
//     this.walls = [true, true, true, true]; // top, right, bottom, left
//     this.visited = false;
//     this.solutionVisited = false;
//   }

//   draw() {
//     const x = this.i * cellSize;
//     const y = this.j * cellSize;

//     ctx.strokeStyle = '#222';
//     ctx.lineWidth = 2;

//     if (this.walls[0]) line(x, y, x + cellSize, y); // top
//     if (this.walls[1]) line(x + cellSize, y, x + cellSize, y + cellSize); // right
//     if (this.walls[2]) line(x + cellSize, y + cellSize, x, y + cellSize); // bottom
//     if (this.walls[3]) line(x, y + cellSize, x, y); // left

//     if (this.visited) {
//       ctx.fillStyle = '#b2fefa';
//       ctx.fillRect(x, y, cellSize, cellSize);
//     }
//   }

//   highlight(color) {
//     const x = this.i * cellSize;
//     const y = this.j * cellSize;
//     ctx.fillStyle = color;
//     ctx.fillRect(x, y, cellSize, cellSize);
//   }

//   getNeighbors() {
//     const neighbors = [];

//     const top    = grid[index(this.i, this.j - 1)];
//     const right  = grid[index(this.i + 1, this.j)];
//     const bottom = grid[index(this.i, this.j + 1)];
//     const left   = grid[index(this.i - 1, this.j)];

//     if (top && !top.visited) neighbors.push(top);
//     if (right && !right.visited) neighbors.push(right);
//     if (bottom && !bottom.visited) neighbors.push(bottom);
//     if (left && !left.visited) neighbors.push(left);

//     return neighbors;
//   }

//   getUnblockedNeighbors() {
//     const neighbors = [];

//     const top    = grid[index(this.i, this.j - 1)];
//     const right  = grid[index(this.i + 1, this.j)];
//     const bottom = grid[index(this.i, this.j + 1)];
//     const left   = grid[index(this.i - 1, this.j)];

//     if (top && !this.walls[0]) neighbors.push(top);
//     if (right && !this.walls[1]) neighbors.push(right);
//     if (bottom && !this.walls[2]) neighbors.push(bottom);
//     if (left && !this.walls[3]) neighbors.push(left);

//     return neighbors;
//   }
// }

// function index(i, j) {
//   if (i < 0 || j < 0 || i >= cols || j >= rows) return -1;
//   return i + j * cols;
// }

// function line(x1, y1, x2, y2) {
//   ctx.beginPath();
//   ctx.moveTo(x1, y1);
//   ctx.lineTo(x2, y2);
//   ctx.stroke();
// }

// function setup() {
//   grid = [];
//   stack = [];
//   for (let j = 0; j < rows; j++) {
//     for (let i = 0; i < cols; i++) {
//       grid.push(new Cell(i, j));
//     }
//   }
//   current = grid[0];
//   current.visited = true;
//   stack.push(current);
//   generate();
// }

// function generate() {
//   const interval = setInterval(() => {
//     if (stack.length > 0) {
//       const current = stack[stack.length - 1];
//       current.visited = true;

//       const neighbors = current.getNeighbors();
//       if (neighbors.length > 0) {
//         const next = neighbors[Math.floor(Math.random() * neighbors.length)];
//         removeWalls(current, next);
//         next.visited = true;
//         stack.push(next);
//       } else {
//         stack.pop();
//       }

//       drawGrid();
//     } else {
//       clearInterval(interval);
//       drawGrid();
//     }
//   }, 10);
// }

// function removeWalls(a, b) {
//   const x = a.i - b.i;
//   const y = a.j - b.j;

//   if (x === 1) {
//     a.walls[3] = false;
//     b.walls[1] = false;
//   } else if (x === -1) {
//     a.walls[1] = false;
//     b.walls[3] = false;
//   }

//   if (y === 1) {
//     a.walls[0] = false;
//     b.walls[2] = false;
//   } else if (y === -1) {
//     a.walls[2] = false;
//     b.walls[0] = false;
//   }
// }

// function drawGrid() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   for (let cell of grid) {
//     cell.draw();
//   }

//   // start
//   grid[0].highlight('#0f0');
//   // end
//   grid[grid.length - 1].highlight('#f00');
// }

// function solveMaze() {
//   if (solving) return;

//   solving = true;
//   let path = [];
//   let visited = new Set();

//   const start = grid[0];
//   const end = grid[grid.length - 1];

//   function dfs(cell) {
//     path.push(cell);
//     cell.solutionVisited = true;
//     drawSolution(path);

//     if (cell === end) {
//       solving = false;
//       return true;
//     }

//     const neighbors = cell.getUnblockedNeighbors();
//     for (let neighbor of neighbors) {
//       if (!visited.has(neighbor)) {
//         visited.add(neighbor);
//         if (dfs(neighbor)) return true;
//       }
//     }

//     path.pop();
//     drawSolution(path);
//     return false;
//   }

//   dfs(start);
// }

// function drawSolution(path) {
//   setTimeout(() => {
//     drawGrid();
//     for (let cell of path) {
//       cell.highlight('rgba(255,255,0,0.6)');
//     }
//   }, 10);
// }

// function generateMaze() {
//   setup();
// }

// function resetMaze() {
//   setup();
//   drawGrid();
// }

// // Initialize
// setup();

















let grid = [];
let solving = false;

function generateMaze() {
  grid = [];
  for (let row = 0; row < 20; row++) {
    let newRow = [];
    for (let col = 0; col < 20; col++) {
      newRow.push(new Cell(row, col));
    }
    grid.push(newRow);
  }
  addWalls();
  drawGrid();
}

function addWalls() {
  // Add random walls to the grid
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 20; col++) {
      if (Math.random() < 0.2) {
        grid[row][col].blocked = true;
      }
    }
  }
  // Make sure the start and end are not blocked
  grid[0][0].blocked = false;
  grid[19][19].blocked = false;
}

function drawGrid() {
  let gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let cell = grid[row][col];
      let cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      if (cell.blocked) {
        cellElement.classList.add("blocked");
      }
      if (cell.solutionVisited) {
        cellElement.classList.add("visited");
      }
      if (cell === grid[0][0]) {
        cellElement.classList.add("start");
      }
      if (cell === grid[19][19]) {
        cellElement.classList.add("end");
      }
      gridElement.appendChild(cellElement);
    }
  }
}

function solveMaze(isBFS = false) {
  if (solving) return;

  solving = true;
  let path = [];
  let visited = new Set();
  let queue = [];

  const start = grid[0][0];
  const end = grid[19][19];

  // BFS implementation
  if (isBFS) {
    queue.push(start);
    visited.add(start);
    let parent = new Map();  // To track the path

    while (queue.length > 0) {
      let current = queue.shift();  // dequeue
      path.push(current);
      drawSolution(path);

      if (current === end) {
        solving = false;
        break;
      }

      const neighbors = current.getUnblockedNeighbors();
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);  // enqueue
          parent.set(neighbor, current);  // Track path
        }
      }
    }

    // Trace back the path
    let current = end;
    let finalPath = [];
    while (parent.has(current)) {
      finalPath.push(current);
      current = parent.get(current);
    }
    finalPath.reverse();
    path = finalPath;
  } else {
    // DFS implementation
    function dfs(cell) {
      path.push(cell);
      cell.solutionVisited = true;
      drawSolution(path);

      if (cell === end) {
        solving = false;
        return true;
      }

      const neighbors = cell.getUnblockedNeighbors();
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          if (dfs(neighbor)) return true;
        }
      }

      path.pop();
      drawSolution(path);
      return false;
    }

    dfs(start);
  }
}

function drawSolution(path) {
  setTimeout(() => {
    drawGrid();
    for (let cell of path) {
      cell.highlight('rgba(255,255,0,0.6)');
    }
  }, 10);
}

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.blocked = false;
    this.solutionVisited = false;
  }

  getUnblockedNeighbors() {
    let neighbors = [];
    if (this.row > 0 && !grid[this.row - 1][this.col].blocked) neighbors.push(grid[this.row - 1][this.col]);  // Up
    if (this.row < grid.length - 1 && !grid[this.row + 1][this.col].blocked) neighbors.push(grid[this.row + 1][this.col]);  // Down
    if (this.col > 0 && !grid[this.row][this.col - 1].blocked) neighbors.push(grid[this.row][this.col - 1]);  // Left
    if (this.col < grid[0].length - 1 && !grid[this.row][this.col + 1].blocked) neighbors.push(grid[this.row][this.col + 1]);  // Right
    return neighbors;
  }

  highlight(color) {
    const gridElement = document.getElementById("grid");
    const index = this.row * grid[0].length + this.col;
    const cellElement = gridElement.children[index];
    cellElement.style.backgroundColor = color;
  }
}

// HTML buttons functionality
document.getElementById("generate").addEventListener("click", () => {
  generateMaze();
});

document.getElementById("solveDFS").addEventListener("click", () => {
  solveMaze(false);  // DFS
});

document.getElementById("solveBFS").addEventListener("click", () => {
  solveMaze(true);  // BFS
});

generateMaze();
