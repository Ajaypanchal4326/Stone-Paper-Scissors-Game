let userScore = 0;
let computerScore = 0;
const choices = ["rock", "paper", "scissors"];
const images = {
  rock: "images/rock.png",
  paper: "images/paper.png",
  scissors: "images/scissors.png",
};

const userScoreElement = document.getElementById("user-score");
const computerScoreElement = document.getElementById("computer-score");
const messageElement = document.getElementById("message");
const gameRoundElement = document.getElementById("game-round");
const playerDisplayElement = document.getElementById("player-display");
const computerDisplayElement = document.getElementById("computer-display");

document.querySelectorAll(".choice").forEach((choice) => {
  choice.addEventListener("click", function () {
    const userChoice = this.getAttribute("data-choice");
    playGame(userChoice);
  });
});

function playGame(userChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(userChoice, computerChoice);

  updateDisplay(userChoice, computerChoice, result);
  updateScore(result);
  showGameRound(userChoice, computerChoice);
}

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(user, computer) {
  if (user === computer) return "draw";

  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return winConditions[user] === computer ? "win" : "lose";
}

function updateDisplay(userChoice, computerChoice, result) {
  let message = "";
  let messageClass = "";

  switch (result) {
    case "win":
      message = `You Win! ${
        userChoice.charAt(0).toUpperCase() + userChoice.slice(1)
      } beats ${computerChoice}!`;
      messageClass = "win";
      break;
    case "lose":
      message = `You Lose! ${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      } beats ${userChoice}!`;
      messageClass = "lose";
      break;
    case "draw":
      message = `It's a Draw! Both chose ${userChoice}!`;
      messageClass = "draw";
      break;
  }

  messageElement.textContent = message;
  messageElement.className = `message ${messageClass}`;
}

function updateScore(result) {
  if (result === "win") {
    userScore++;
    userScoreElement.textContent = userScore;
    animateScore(userScoreElement);
  } else if (result === "lose") {
    computerScore++;
    computerScoreElement.textContent = computerScore;
    animateScore(computerScoreElement);
  }
}

function showGameRound(userChoice, computerChoice) {
  playerDisplayElement.innerHTML = `<img src="${images[userChoice]}" alt="${userChoice}" style="width: 40px; height: 40px; object-fit: contain;">`;
  computerDisplayElement.innerHTML = `<img src="${images[computerChoice]}" alt="${computerChoice}" style="width: 40px; height: 40px; object-fit: contain;">`;
  gameRoundElement.style.display = "flex";

  // Add animation
  gameRoundElement.style.animation = "none";
  setTimeout(() => {
    gameRoundElement.style.animation = "fadeIn 0.5s ease-out";
  }, 10);
}

function animateScore(element) {
  element.style.transform = "scale(1.3)";
  element.style.color = "#00ff00";
  setTimeout(() => {
    element.style.transform = "scale(1)";
    element.style.color = "#ffd700";
  }, 300);
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  userScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
  messageElement.textContent = "Make your choice to start playing!";
  messageElement.className = "message";
  gameRoundElement.style.display = "none";

  // Add reset animation
  document.querySelector(".game-container").style.animation = "none";
  setTimeout(() => {
    document.querySelector(".game-container").style.animation =
      "fadeIn 0.5s ease-out";
  }, 10);
}

// Add keyboard support
document.addEventListener("keydown", function (event) {
  switch (event.key.toLowerCase()) {
    case "r":
      playGame("rock");
      break;
    case "p":
      playGame("paper");
      break;
    case "s":
      playGame("scissors");
      break;
    case " ":
      event.preventDefault();
      resetGame();
      break;
  }
});
