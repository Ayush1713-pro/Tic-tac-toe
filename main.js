
let boxes= document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg= document.querySelector("#msg");
let scoreForO = document.querySelector("#O");
let scoreForX = document.querySelector("#X");
let resetScore = document.querySelector("#resetScore");


let count = 0;
let scoreO= 0;
let scoreX = 0;
let turnO = true;

const winpattern= [
  [0, 1,2], 
  [0, 3,6], 
  [0, 4,8], 
  [1, 4,7], 
  [2, 5,8], 
  [2, 4,6], 
  [3, 4,5], 
  [6, 7,8]
  ];
  


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText= "O";
      box.style.color = "#43291F";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      box.style.color = "red";
      turnO = true;
    }
    
    box.disabled = true;
    count++;
    
    let isWinner = checkwinner();
    if(count == 9 && !isWinner) {
      drawGame();
    }
    
    
  });
});

 const disablebox = () => {
   for(let box of boxes)  {
     box.disabled = true;
   }
 };
 
 const enablebox = () => {
   for(let box of boxes) {
     box.disabled = false;
     box.innerText = "";
   }
 };
 
 const rstScore = () => {
   scoreO = 0;
   scoreX = 0;
   scoreForO.innerText = "O";
   scoreForX.innerText = "O"
 }
 const resetgame = () => {
  turnO= true;
  enablebox();
  msgcontainer.classList.add("hide");
  count = 0;
};


const drawGame = () => {
  msg.innerText = "The game is Draw";
  msgcontainer.classList.remove("hide");
}

 const score = (winner) => {
  if(winner === "O") {
    scoreO++;
    scoreForO.innerText = scoreO;
  } else if(winner === "X") {
    scoreX++;
    scoreForX.innerText = scoreX;
  }
}

const showwinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  score(winner);
  disablebox();
};



const checkwinner = () => {
  for(let pattern of winpattern) {
    let posval1= boxes[pattern[0]].innerText;
    let posval2= boxes[pattern[1]].innerText;
    let posval3= boxes[pattern[2]].innerText;
    
    
    
    if(posval1 != "" && posval2 != "" &&  posval3 != "") {
      if (posval1 === posval2 && posval2 === posval3) {
        console.log("winner is ", posval1);
        showwinner(posval1);
        return true;
      };
    };
  };
  
};

resetScore.addEventListener("click", rstScore);
newbtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
