const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;
let computerPoints = 0;
let playerPoints = 0;
let round = 0

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function computerPlay(){

    choise = Math.floor(Math.random() *3);
    return choise;
}

async function playRound(playerSelection,computerSelection){
    await animation(playerSelection,computerSelection);
    round++;
    if(round=1){
        document.getElementById('comment').hidden=false;
        
    }
    
    if(playerSelection == computerSelection){
       roundResult(0);
    } else if (playerSelection == PAPER && computerSelection==ROCK) {
        roundResult(1);
    } else if (playerSelection == PAPER && computerSelection==SCISSORS) {
        roundResult(2);
    } else if (playerSelection == ROCK && computerSelection==SCISSORS) {
        roundResult(1);
    } else if (playerSelection == ROCK && computerSelection==PAPER) {
        roundResult(2);
    } else if (playerSelection == SCISSORS && computerSelection==PAPER) {
        roundResult(1);
    } else {
        roundResult(2);
    } 
    updateTable(playerSelection,computerSelection);
    await sleep(2250);
    restoreChoises();
    if(round>0){
        document.getElementById('message').innerText="Select you weapon for this round!!";  
    }

    if(playerPoints>4){
        endgame();
        document.getElementById('result').innerText="Congratulation you are the winner!!";

    }
    if(computerPoints>4){
        endgame();
        document.getElementById('result').innerText="You lost!!";
    }
    


}

function resetGame(){
     computerPoints = 0;
     playerPoints = 0;
     round = 0

     document.getElementById('comment').innerText="";
     document.getElementById('message').innerText="Select you weapon and start the fight!!";
     document.getElementById('result').innerText="";
     document.getElementById('playerPoints').innerText="0";
     document.getElementById('computerPoints').innerText="0";
     document.getElementById('playerWeapon0').style.cssText = '';
     document.getElementById('playerWeapon1').style.cssText = '';
     document.getElementById('playerWeapon2').style.cssText = '';
     document.getElementById('result').hidden=true;
     document.getElementById('comment').hidden=true;
     deleteHistory();

}

function roundResult(variation){
    let comment = document.getElementById('comment');
    switch (variation) {
        case 0:
            comment.innerHTML = "It is a draw";
            break;
    
        case 1:
            playerPoints++;
            comment.innerHTML = "Player's Point";
            document.getElementById('playerPoints').innerText=playerPoints;
            break;
        
        case 2:
            computerPoints++;  
            comment.innerHTML = "Computer's Point"; 
            document.getElementById('computerPoints').innerText=computerPoints;
            break;
    }

}


function endgame(){
    document.getElementById('playerWeapon0').style.cssText = 'pointer-events:none;opacity:0.5;';
    document.getElementById('playerWeapon1').style.cssText = 'pointer-events:none;opacity:0.5;';
    document.getElementById('playerWeapon2').style.cssText = 'pointer-events:none;opacity:0.5;';

    document.getElementById('message').innerText="Reset the game to fight again!!";
    document.getElementById('result').hidden=false;

}



async function animation(selectedPlayer,selectedComp){
    
    
    
    if(selectedPlayer == ROCK){
        document.getElementById('playerWeapon0').style.cssText = 'pointer-events:none;';
        document.getElementById('playerWeapon1').style.cssText = 'pointer-events:none;opacity:0.5;';
        document.getElementById('playerWeapon2').style.cssText = 'pointer-events:none;opacity:0.5;';
    }else if(selectedPlayer == PAPER) {
        document.getElementById('playerWeapon0').style.cssText = 'pointer-events:none;opacity:0.5;';
        document.getElementById('playerWeapon1').style.cssText = 'pointer-events:none;';
        document.getElementById('playerWeapon2').style.cssText = 'pointer-events:none;opacity:0.5;';
    }else{
        document.getElementById('playerWeapon0').style.cssText = 'pointer-events:none;opacity:0.5;';
        document.getElementById('playerWeapon1').style.cssText = 'pointer-events:none;opacity:0.5;';
        document.getElementById('playerWeapon2').style.cssText = 'pointer-events:none;';
    }

    document.getElementById('computerWeapon0').style.cssText = 'opacity:0.5;';
    document.getElementById('computerWeapon1').style.cssText = 'opacity:0.5;';
    document.getElementById('computerWeapon2').style.cssText = 'opacity:0.5;';

    let randNumber = Math.floor(Math.random() * (15 - 10 + 1) ) + 10;

    for (let index = 0; index < randNumber; index++) {
        document.getElementById('computerWeapon'+index%3).style.cssText = '';
        await sleep(300);
        document.getElementById('computerWeapon'+index%3).style.cssText = 'opacity:0.5;';
        
    }

    if(selectedComp == ROCK){
        document.getElementById('computerWeapon0').style.cssText = '';
        
    }else if(selectedComp == PAPER) {
        document.getElementById('computerWeapon1').style.cssText = '';
    }else{
        document.getElementById('computerWeapon2').style.cssText = '';
    }

}
function restoreChoises(){
    document.getElementById('computerWeapon0').style.cssText = '';
    document.getElementById('computerWeapon1').style.cssText = '';
    document.getElementById('computerWeapon2').style.cssText = '';

    document.getElementById('playerWeapon0').style.cssText = '';
    document.getElementById('playerWeapon1').style.cssText = '';
    document.getElementById('playerWeapon2').style.cssText = '';

}

function updateTable(playerSelection,computerSelection){
    let tbodyRef = document.getElementById('history_table').getElementsByTagName('tbody')[0];
    let PlSelected;
    let CmpSelected;
    switch (playerSelection) {
        case 0:
            PlSelected = "Rock"
            break;
        case 1:
            PlSelected = "Paper"
            break;
        case 2:
            PlSelected = "Scisors"
            break;
        
    }
    switch (computerSelection) {
        case 0:
            CmpSelected = "Rock"
            break;
        case 1:
            CmpSelected = "Paper"
            break;
        case 2:
            CmpSelected = "Scisors"
            break;
        
    }
    let newRow = tbodyRef.insertRow();
    let row = '<td>'+PlSelected+'</td><td>'+CmpSelected+'</td><td>'+playerPoints+':'+computerPoints+'</td>';
    newRow.innerHTML = row;

}

function deleteHistory() {
    let tbodyRef = document.getElementById('history_table').getElementsByTagName('tbody')[0];
    console.log(tbodyRef.rows.length);
    while(tbodyRef.rows.length){
        tbodyRef.deleteRow(0)
    }

    
}