const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissor = document.getElementById('scissor');
const nextRoundBtn = document.getElementById('next-round-btn');
const resetBtn = document.getElementById('resetBtn');
const btn = document.querySelectorAll('.btn');
const compMove = ['rock', 'paper', 'scissors'];

// Audio dictionary
const audioFiles = {
  rock: new Audio('/Assets/audio/tap.wav'),
  paper: new Audio('/Assets/audio/tap.wav'),
  scissors: new Audio('/Assets/audio/tap.wav'),
  uiClick: new Audio('/Assets/audio/click 2.wav'),
  win: new Audio('/Assets/audio/winner.wav'),
  lose: new Audio('/Assets/audio/lose.wav'),
};

let playerScore = 0;
let computerScore = 0;
let gameInProgress = false;

loadScores();

// Player move event listeners
rock.addEventListener('click', () => {
  audioFiles.rock.play();
  handleMove('rock');
});
paper.addEventListener('click', () => {
  audioFiles.paper.play();
  handleMove('paper');
});
scissor.addEventListener('click', () => {
  audioFiles.scissors.play();
  handleMove('scissors');
});

// Next round and reset button event listeners
nextRoundBtn.addEventListener('click', () => {
  audioFiles.uiClick.play();
  startNextRound();
});
resetBtn.addEventListener('click', () => {
  audioFiles.uiClick.play();
  audioFiles.uiClick.volume = 1;
  clearScore();
});

// Attach click sound to all other UI buttons
btn.forEach(button => {
  button.addEventListener('click', () => {
    audioFiles.uiClick.play();
    audioFiles.uiClick.volume = 1;
  });
});

function handleMove(playerMove) {
  if (gameInProgress) return;
  playGame(playerMove);
  nextRoundBtn.style.display = 'block';
}

function playGame(playerMove) {
  gameInProgress = true;
  let randomMoves = Math.floor(Math.random() * compMove.length);
  let computerMove = compMove[randomMoves];

  let resultText = `Player: ${playerMove} | Computer: ${computerMove}`;
  document.getElementById('result').innerText = resultText;

  let resultBar = document.getElementById('result-bar');

  if (playerMove === computerMove) {
    resultBar.textContent = "It's a tie!";
    resultBar.className = 'result-bar';
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    playerScore++;
    resultBar.textContent = "You win!";
    audioFiles.win.play();
    resultBar.className = 'result-bar win';
  } else {
    computerScore++;
    let explanation = getComputerWinExplanation(computerMove, playerMove);
    resultBar.textContent = `You lose! ${explanation}`;
    audioFiles.lose.play();
    resultBar.className = 'result-bar lose';
  }

  updateScores();
}

function getComputerWinExplanation(computerMove, playerMove) {
  if (computerMove === 'rock' && playerMove === 'scissors') {
    return "Rock crushes Scissors.";
  } else if (computerMove === 'paper' && playerMove === 'rock') {
    return "Paper covers Rock.";
  } else if (computerMove === 'scissors' && playerMove === 'paper') {
    return "Scissors cut Paper.";
  }
}

function startNextRound() {
  gameInProgress = false;
  nextRoundBtn.style.display = 'none';
  document.getElementById('result').innerText = "";
  document.getElementById('result-bar').textContent = "Waiting for your move...";
  document.getElementById('result-bar').className = 'result-bar';
}

function updateScores() {
  document.getElementById('score').innerText = `Player: ${playerScore} | Computer: ${computerScore}`;
  saveScores();
}

function saveScores() {
  localStorage.setItem('playerScore', playerScore);
  localStorage.setItem('computerScore', computerScore);
}

function loadScores() {
  const savedPlayerScore = localStorage.getItem('playerScore');
  const savedComputerScore = localStorage.getItem('computerScore');

  if (savedPlayerScore !== null && savedComputerScore !== null) {
    playerScore = parseInt(savedPlayerScore);
    computerScore = parseInt(savedComputerScore);
    document.getElementById('score').innerText = `Player: ${playerScore} | Computer: ${computerScore}`;
  }
}

function clearScore() {
  localStorage.removeItem('playerScore');
  localStorage.removeItem('computerScore');
  playerScore = 0;
  computerScore = 0;
  updateScores();
  document.getElementById('result').innerText = "Scores have been reset!";
  document.getElementById('result-bar').textContent = "Waiting for your move...";
  document.getElementById('result-bar').className = 'result-bar';
}

// Music Control
const bgMusic = document.getElementById('bg-music');
const musicToggleBtn = document.getElementById('music-toggle');

let isMusicPlaying = false;

function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggleBtn.textContent = 'Play Music';
  } else {
    bgMusic.play();
    musicToggleBtn.textContent = 'Pause Music';
  }
  isMusicPlaying = !isMusicPlaying;
}