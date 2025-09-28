
 const canvas = document.getElementById("mazeCanvas");
    const ctx = canvas.getContext("2d");

    const rows = 20;
    const cols = 20;
    const size = canvas.width / cols;
    let grid = [];
    let stack = [];
    let player;
    let solvingMethod = 'DFS'; 

    class Cell {
      constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true];
        this.visited = false;
        this.previous = null;
      }

      draw() {
        const x = this.j * size;
        const y = this.i * size;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        if (this.walls[0]) drawLine(x, y, x + size, y); 
        if (this.walls[1]) drawLine(x + size, y, x + size, y + size); 
        if (this.walls[2]) drawLine(x + size, y + size, x, y + size); 
        if (this.walls[3]) drawLine(x, y + size, x, y);

        if (this.visited) {
          ctx.fillStyle = "#eee";
          ctx.fillRect(x, y, size, size);
        }
      }

      highlight(color) {
        const x = this.j * size;
        const y = this.i * size;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);
      }

      getUnvisitedNeighbors() {
        let neighbors = [];

        const top = grid[index(this.i - 1, this.j)];
        const right = grid[index(this.i, this.j + 1)];
        const bottom = grid[index(this.i + 1, this.j)];
        const left = grid[index(this.i, this.j - 1)];

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        return neighbors;
      }
    }

    function index(i, j) {
      if (i < 0 || j < 0 || i >= rows || j >= cols) return -1;
      return i * cols + j;
    }

    function drawLine(x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function setupGrid() {
      grid = [];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          grid.push(new Cell(i, j));
        }
      }
    }

    function removeWalls(a, b) {
      let x = a.j - b.j;
      let y = a.i - b.i;

      if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
      } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
      }

      if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
      } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
      }
    }

    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      grid.forEach(cell => cell.draw());
    }

    async function generateMaze() {
      setupGrid();
      let current = grid[0];
      current.visited = true;
      stack = [];

      while (true) {
        drawGrid();
        current.highlight("green");

        let neighbors = current.getUnvisitedNeighbors();
        if (neighbors.length > 0) {
          let next = neighbors[Math.floor(Math.random() * neighbors.length)];
          stack.push(current);
          removeWalls(current, next);
          current = next;
          current.visited = true;
        } else if (stack.length > 0) {
          current = stack.pop();
        } else {
          break;
        }

        await new Promise(r => setTimeout(r, 10));
      }

      player = grid[0];
      drawGrid();
      highlightGoal();
      drawPlayer();
    }

    function drawPlayer() {
      const x = player.j * size + size / 4;
      const y = player.i * size + size / 4;
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(x + size / 4, y + size / 4, size / 4, 0, Math.PI * 2);
      ctx.fill();
    }

    function highlightGoal() {
      const goal = grid[grid.length - 1];
      const x = goal.j * size;
      const y = goal.i * size;
      ctx.fillStyle = "gold";
      ctx.fillRect(x, y, size, size);
    }

    function resetVisited() {
      grid.forEach(cell => {
        cell.visited = false;
        cell.previous = null;
      });
    }

    async function solveDFS() {
      solvingMethod = 'DFS';
      resetVisited();
      let stack = [grid[0]];
      grid[0].visited = true;

      while (stack.length > 0) {
        drawGrid();
        let current = stack.pop();
        current.highlight("lightgreen");

        if (current === grid[grid.length - 1]) {
          await showPath(current);
          return;
        }

        let neighbors = getAvailableNeighbors(current);
        for (let neighbor of neighbors) {
          if (!neighbor.visited) {
            neighbor.visited = true;
            neighbor.previous = current;
            stack.push(neighbor);
          }
        }

        await new Promise(r => setTimeout(r, 20));
      }
    }

    async function solveBFS() {
      solvingMethod = 'BFS';
      resetVisited();
      let queue = [grid[0]];
      grid[0].visited = true;

      while (queue.length > 0) {
        drawGrid();
        let current = queue.shift();
        current.highlight("skyblue");

        if (current === grid[grid.length - 1]) {
          await showPath(current);
          return;
        }

        let neighbors = getAvailableNeighbors(current);
        for (let neighbor of neighbors) {
          if (!neighbor.visited) {
            neighbor.visited = true;
            neighbor.previous = current;
            queue.push(neighbor);
          }
        }

        await new Promise(r => setTimeout(r, 20));
      }
    }

    function getAvailableNeighbors(cell) {
      let neighbors = [];

      const top = grid[index(cell.i - 1, cell.j)];
      const right = grid[index(cell.i, cell.j + 1)];
      const bottom = grid[index(cell.i + 1, cell.j)];
      const left = grid[index(cell.i, cell.j - 1)];

      if (top && !cell.walls[0]) neighbors.push(top);
      if (right && !cell.walls[1]) neighbors.push(right);
      if (bottom && !cell.walls[2]) neighbors.push(bottom);
      if (left && !cell.walls[3]) neighbors.push(left);

      return neighbors;
    }

    async function showPath(cell) {
      let path = [];
      while (cell) {
        path.push(cell);
        cell = cell.previous;
      }
      path.reverse();

      for (let step of path) {
        player = step;
        drawGrid();
        highlightGoal();
        drawPlayer();
        await new Promise(r => setTimeout(r, 100));
      }

      setTimeout(() => alert(" Maze Solved Automatically!"), 100);
    }

    document.getElementById("generateBtn").addEventListener("click", generateMaze);
    document.getElementById("dfsBtn").addEventListener("click", solveDFS);
    document.getElementById("bfsBtn").addEventListener("click", solveBFS);
    document.getElementById("resetBtn").addEventListener("click", generateMaze);


    document.addEventListener("keydown", e => {
      let moved = false;
      if (e.key === "ArrowUp" || e.key === "w") {
        if (!player.walls[0]) {
          player = grid[index(player.i - 1, player.j)];
          moved = true;
        }
      } else if (e.key === "ArrowRight" || e.key === "d") {
        if (!player.walls[1]) {
          player = grid[index(player.i, player.j + 1)];
          moved = true;
        }
      } else if (e.key === "ArrowDown" || e.key === "s") {
        if (!player.walls[2]) {
          player = grid[index(player.i + 1, player.j)];
          moved = true;
        }
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        if (!player.walls[3]) {
          player = grid[index(player.i, player.j - 1)];
          moved = true;
        }
      }

      if (moved) {
        drawGrid();
        highlightGoal();
        drawPlayer();

        if (player === grid[grid.length - 1]) {
          setTimeout(() => alert("🎉 You reached the goal!"), 100);
        }
      }
    });

  const canvas = document.getElementById("mazeCanvas-box");
const ctx = canvas.getContext("2d");

const rows = 20;
const cols = 20;
const size = canvas.width / cols;
let grid = [];
let stack = [];
let player;
let solvingMethod = 'DFS'; 

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.previous = null;
  }

  draw() {
    const x = this.j * size;
    const y = this.i * size;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    if (this.walls[0]) drawLine(x, y, x + size, y); 
    if (this.walls[1]) drawLine(x + size, y, x + size, y + size); 
    if (this.walls[2]) drawLine(x + size, y + size, x, y + size); 
    if (this.walls[3]) drawLine(x, y + size, x, y);

    if (this.visited) {
      ctx.fillStyle = "#eee";
      ctx.fillRect(x, y, size, size);
    }
  }

  highlight(color) {
    const x = this.j * size;
    const y = this.i * size;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
  }

  getUnvisitedNeighbors() {
    let neighbors = [];

    const top = grid[index(this.i - 1, this.j)];
    const right = grid[index(this.i, this.j + 1)];
    const bottom = grid[index(this.i + 1, this.j)];
    const left = grid[index(this.i, this.j - 1)];

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    return neighbors;
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i >= rows || j >= cols) return -1;
  return i * cols + j;
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function setupGrid() {
  grid = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid.push(new Cell(i, j));
    }
  }
}

function removeWalls(a, b) {
  let x = a.j - b.j;
  let y = a.i - b.i;

  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  grid.forEach(cell => cell.draw());
}

async function generateMaze() {
  setupGrid();
  let current = grid[0];
  current.visited = true;
  stack = [];

  while (true) {
    drawGrid();
    current.highlight("green");

    let neighbors = current.getUnvisitedNeighbors();
    if (neighbors.length > 0) {
      let next = neighbors[Math.floor(Math.random() * neighbors.length)];
      stack.push(current);
      removeWalls(current, next);
      current = next;
      current.visited = true;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else {
      break;
    }

    await new Promise(r => setTimeout(r, 10));
  }

  player = grid[0];
  drawGrid();
  highlightGoal();
  drawPlayer();
}

function drawPlayer() {
  const x = player.j * size + size / 4;
  const y = player.i * size + size / 4;
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x + size / 4, y + size / 4, size / 4, 0, Math.PI * 2);
  ctx.fill();
}

function highlightGoal() {
  const goal = grid[grid.length - 1];
  const x = goal.j * size;
  const y = goal.i * size;
  ctx.fillStyle = "gold";
  ctx.fillRect(x, y, size, size);
}

function resetVisited() {
  grid.forEach(cell => {
    cell.visited = false;
    cell.previous = null;
  });
}

async function solveDFS() {
  solvingMethod = 'DFS';
  resetVisited();
  let stack = [grid[0]];
  grid[0].visited = true;

  while (stack.length > 0) {
    drawGrid();
    let current = stack.pop();
    current.highlight("lightgreen");

    if (current === grid[grid.length - 1]) {
      await showPath(current);
      return;
    }

    let neighbors = getAvailableNeighbors(current);
    for (let neighbor of neighbors) {
      if (!neighbor.visited) {
        neighbor.visited = true;
        neighbor.previous = current;
        stack.push(neighbor);
      }
    }

    await new Promise(r => setTimeout(r, 20));
  }
}

async function solveBFS() {
  solvingMethod = 'BFS';
  resetVisited();
  let queue = [grid[0]];
  grid[0].visited = true;

  while (queue.length > 0) {
    drawGrid();
    let current = queue.shift();
    current.highlight("skyblue");

    if (current === grid[grid.length - 1]) {
      await showPath(current);
      return;
    }

    let neighbors = getAvailableNeighbors(current);
    for (let neighbor of neighbors) {
      if (!neighbor.visited) {
        neighbor.visited = true;
        neighbor.previous = current;
        queue.push(neighbor);
      }
    }

    await new Promise(r => setTimeout(r, 20));
  }
}

function getAvailableNeighbors(cell) {
  let neighbors = [];

  const top = grid[index(cell.i - 1, cell.j)];
  const right = grid[index(cell.i, cell.j + 1)];
  const bottom = grid[index(cell.i + 1, cell.j)];
  const left = grid[index(cell.i, cell.j - 1)];

  if (top && !cell.walls[0]) neighbors.push(top);
  if (right && !cell.walls[1]) neighbors.push(right);
  if (bottom && !cell.walls[2]) neighbors.push(bottom);
  if (left && !cell.walls[3]) neighbors.push(left);

  return neighbors;
}

async function showPath(cell) {
  let path = [];
  while (cell) {
    path.push(cell);
    cell = cell.previous;
  }
  path.reverse();

  for (let step of path) {
    player = step;
    drawGrid();
    highlightGoal();
    drawPlayer();
    await new Promise(r => setTimeout(r, 100));
  }

  setTimeout(() => alert(" Maze Solved Automatically!"), 100);
}

document.getElementById("generateBtn").addEventListener("click", generateMaze);
document.getElementById("dfsBtn").addEventListener("click", solveDFS);
document.getElementById("bfsBtn").addEventListener("click", solveBFS);
document.getElementById("resetBtn").addEventListener("click", generateMaze);

document.addEventListener("keydown", e => {
  let moved = false;
  if (e.key === "ArrowUp" || e.key === "w") {
    if (!player.walls[0]) {
      player = grid[index(player.i - 1, player.j)];
      moved = true;
    }
  } else if (e.key === "ArrowRight" || e.key === "d") {
    if (!player.walls[1]) {
      player = grid[index(player.i, player.j + 1)];
      moved = true;
    }
  } else if (e.key === "ArrowDown" || e.key === "s") {
    if (!player.walls[2]) {
      player = grid[index(player.i + 1, player.j)];
      moved = true;
    }
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    if (!player.walls[3]) {
      player = grid[index(player.i, player.j - 1)];
      moved = true;
    }
  }

  if (moved) {
    drawGrid();
    highlightGoal();
    drawPlayer();

    if (player === grid[grid.length - 1]) {
      setTimeout(() => alert(" You reached the goal!"), 100);
    }
  }
});



  </script>
</body>
</html>

