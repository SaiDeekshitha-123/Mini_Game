// ---------- MENU ----------
function showGame(id) {
  document.querySelectorAll(".game").forEach(g => g.style.display = "none");
  document.getElementById("menu").style.display = "none";
  document.getElementById(id).style.display = "block";
}
function backMenu() {
  document.querySelectorAll(".game").forEach(g => g.style.display = "none");
  document.getElementById("menu").style.display = "flex";
}

// ---------- TIC TAC TOE ----------
let ticCells, ticPlayer;
const ticBoard = document.getElementById("board");
const ticStatus = document.getElementById("tic-status");

function renderTic() {
  ticBoard.innerHTML = "";
  ticCells.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerText = val;
    cell.addEventListener("click", () => ticClick(i));
    ticBoard.appendChild(cell);
  });
}
function ticClick(i) {
  if (ticCells[i] || ticWinner()) return;
  ticCells[i] = ticPlayer;
  ticPlayer = ticPlayer === "X" ? "O" : "X";
  renderTic();
  ticWinner();
}
function ticWinner() {
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let [a,b,c] of wins) {
    if (ticCells[a] && ticCells[a] === ticCells[b] && ticCells[a] === ticCells[c]) {
      ticStatus.innerText = `${ticCells[a]} Wins! 🎉`;
      return true;
    }
  }
  if (!ticCells.includes("")) ticStatus.innerText = "Draw!";
  return false;
}
function restartTic() {
  ticCells = Array(9).fill("");
  ticPlayer = "X";
  ticStatus.innerText = "";
  renderTic();
}
restartTic();

// ---------- MEMORY GAME ----------
const memoryBoard = document.getElementById("memory-board");
const memoryStatus = document.getElementById("memory-status");
let memoryCards, flipped, matched;

function setupMemory() {
  let values = ["🍎","🍌","🍇","🍉","🍓","🍒","🥭","🍍"];
  memoryCards = [...values, ...values].sort(() => Math.random() - 0.5);
  flipped = [];
  matched = [];
  renderMemory();
  memoryStatus.innerText = "";
}
function renderMemory() {
  memoryBoard.innerHTML = "";
  memoryCards.forEach((val, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    if (flipped.includes(i) || matched.includes(i)) {
      card.classList.add("flipped");
      card.innerText = val;
    }
    card.addEventListener("click", () => flipCard(i));
    memoryBoard.appendChild(card);
  });
}
function flipCard(i) {
  if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
  flipped.push(i);
  renderMemory();
  if (flipped.length === 2) {
    const [a,b] = flipped;
    if (memoryCards[a] === memoryCards[b]) {
      matched.push(a,b);
      flipped = [];
      if (matched.length === memoryCards.length) memoryStatus.innerText = "You Won! 🎉";
    } else {
      setTimeout(() => { flipped = []; renderMemory(); }, 800);
    }
  }
}
function restartMemory() { setupMemory(); }
setupMemory();

// ---------- SNAKE ----------
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
let snake, direction, food, snakeGame;

function initSnake() {
  snake = [{x:200,y:200}];
  direction = "RIGHT";
  food = {x:Math.floor(Math.random()*20)*20, y:Math.floor(Math.random()*20)*20};
  clearInterval(snakeGame);
  snakeGame = setInterval(drawSnake, 100);
}
function drawSnake() {
  ctx.clearRect(0,0,400,400);
  ctx.fillStyle="green";
  snake.forEach(s=>ctx.fillRect(s.x,s.y,20,20));
  ctx.fillStyle="red";
  ctx.fillRect(food.x,food.y,20,20);

  let head = {x:snake[0].x, y:snake[0].y};
  if (direction==="LEFT") head.x-=20;
  if (direction==="RIGHT") head.x+=20;
  if (direction==="UP") head.y-=20;
  if (direction==="DOWN") head.y+=20;
  if (head.x<0||head.y<0||head.x>=400||head.y>=400||snake.some(s=>s.x===head.x&&s.y===head.y)){
    document.getElementById("snake-status").innerText="Game Over!";
    clearInterval(snakeGame);
    return;
  }
  snake.unshift(head);
  if (head.x===food.x&&head.y===food.y){
    food={x:Math.floor(Math.random()*20)*20,y:Math.floor(Math.random()*20)*20};
  } else {
    snake.pop();
  }
}
document.addEventListener("keydown", e=>{
  if (e.key==="ArrowUp"&&direction!=="DOWN") direction="UP";
  if (e.key==="ArrowDown"&&direction!=="UP") direction="DOWN";
  if (e.key==="ArrowLeft"&&direction!=="RIGHT") direction="LEFT";
  if (e.key==="ArrowRight"&&direction!=="LEFT") direction="RIGHT";
});
function restartSnake() {
  document.getElementById("snake-status").innerText="";
  initSnake();
}
initSnake();

// ---------- RPS ----------
function playRPS(player) {
  const choices = ["rock","paper","scissors"];
  const comp = choices[Math.floor(Math.random()*3)];
  let result;
  if (player===comp) result="Draw!";
  else if ((player==="rock"&&comp==="scissors")||(player==="paper"&&comp==="rock")||(player==="scissors"&&comp==="paper"))
    result="You Win! 🎉";
  else result="You Lose!";
  document.getElementById("rps-result").innerText = `You: ${player} | Computer: ${comp} → ${result}`;
}
