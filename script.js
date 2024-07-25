let boxes = document.querySelectorAll(".bttn");
let resetBtn = document.querySelector("#reset-bttn");
let newBtn = document.querySelector("#newgame-bttn");
let msgContainer = document.querySelector(".message-container");
let msgtext=document.querySelector("#message");


let turnO = true;
let winner =false;

const winConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkDraw();
        checkWinner();
    });
});

const checkDraw = () => {

    let isEmpty = false;

    for (let box of boxes) {
        if (box.innerText.trim() === "") {
            isEmpty = true;
            break;
        }
    }
    
    if(!isEmpty && !winner){
        msgtext.innerText = `The game is a Draw !!!` ;
        msgContainer.classList.remove("hide");
        for (let box of boxes){
            box.disabled = true;
        }
    }
}

const checkWinner = () => {
    for (let pattern of winConditions){
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 != "" && val2 != "" && val3 != ""){
            if (val1 === val2 && val2 === val3){
                winner = true;
                showWinner(val1);
            }
        }
    }
};

const showWinner = (winner) => {
    msgtext.innerText = `Congratulations, Winner is player ${winner}` ;
    msgContainer.classList.remove("hide");
    for (let box of boxes){
        box.disabled = true;
    }
};

const resetGame = () => {
    turnO = true;
    winner = false;
    for (let box of boxes){
        box.disabled = false;
        box.innerText = " ";
    }
    msgContainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);