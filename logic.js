let user_score = 0;
let comp_score = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const user_Score = document.querySelector("#user_score");
const comp_Score = document.querySelector("#comp_score");

const genCompChoice = () => {
    const options = ["rock","paper","scissors"];
    const random_num = Math.floor(Math.random() * 3);
    return options[random_num];
}

const drowGame = () => {
    msg.innerText = "Game Was Drow ";
}

const showWinner = (userwin,userChoice,compChoice) => {
    if(userwin){
        user_score++;
        user_Score.innerText = user_score;
        msg.innerText = 'You Win!';
    }else{
        comp_score++;
        comp_Score.innerText = comp_score;
        msg.innerText = "You Lose!";
    }
}

const playGame = (userChoice) => {
    //generate computer choice 
    const compChoice = genCompChoice();

    if(userChoice === compChoice){
        //drow
        drowGame();
    }else{
        let userwin = true;
        if(userChoice === "rock"){
            //scissors, paper
            userwin = compChoice === "paper" ? false: true;
        }else if (userChoice === "paper"){
            //rock, scissors
            userwin = compChoice === "scissors" ? false : true;
        }else {
            //rock,paper
            userwin = compChoice === "rock" ? false : true;
        }
        showWinner(userwin,userChoice,compChoice);
    }
}

//display user choice
choices.forEach((choice) => {
    choice.addEventListener("click",() => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
