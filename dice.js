//first roll, disk is off
//win 7,11
//lose:2,3,12 
//move on: 4,5,6,8,9,10 setting up a point

//second roll,disk is on
//the point is on which number was rolled 
//now player keeps rolling untill they either hit that number agian or 7
//if 7 lose if that number lose

//my global variables 
let fristRolled = false;
let rollArray = []; 

//Play agian button
document.addEventListener("DOMContentLoaded", event=>{
    let replayBtn = document.getElementById("playAgainBtn");
    replayBtn.addEventListener("click" , event =>{
        //reloding webpage on click
        location.reload();
    })
});

//loading the whole html first then calling set up
document.addEventListener("DOMContentLoaded", game);
//game(): setting up my varibles and making contact with the api
function game(){
    let rollBtn = document.getElementById("rollBtn");
    let image = document.getElementById("imageDiv");
    let pointRoll = document.getElementById("pointRoll");
    let rolled = document.getElementById("rolled");
    let playAgainBtn = document.getElementById("playAgainBtn");
    let result = document.getElementById("result");
    
    let point;
    //making contact with the api  by using fetch
    rollBtn.addEventListener("click", event =>{
        if(rollArray[1] !=undefined){
            rollArray = [];
            image.innerHTML = "";
        }
        //fetching data from the api
        fetch("http://roll.diceapi.com/json/2d6")
            //tell the promise that the mixin body will be json file
            .then(response => response.json())
            //displaying the data 
            .then(data => {
                data.dice.forEach(element => {
                    let diceRoll = document.createElement("img");
                    console.log(element.value);
                    //retrieving and setting image src to specified roll value
                    switch(element.value){
                        case 1:
                            diceRoll.setAttribute("src","/images/dice1.png");
                            image.appendChild(diceRoll);
                            rollArray.push(element.value);
                            break;
                        case 2:
                            diceRoll.setAttribute("src","/images/dice2.png");
                            image.appendChild(diceRoll);
                            rollArray.push(element.value);
                            break;
                        case 3:
                            diceRoll.setAttribute("src","/images/dice3.png");
                            image.appendChild(diceRoll);
                            rollArray.push(element.value);
                            break;
                        case 4:
                            diceRoll.setAttribute("src","/images/dice4.png");
                            image.appendChild(diceRoll); 
                            rollArray.push(element.value);
                            break;
                        case 5:
                            diceRoll.setAttribute("src","/images/dice5.png");
                            image.appendChild(diceRoll);
                            rollArray.push(element.value);
                            break;
                        case 6:
                            diceRoll.setAttribute("src","/images/dice6.png");
                            image.appendChild(diceRoll);
                            rollArray.push(element.value);
                            break;
                    }
                }); 
                let roll = adding(rollArray[0],rollArray[1]);

                //checking if player has rolled yet
                //if not game checks if player lost or won. if not the point is set
                if(!fristRolled){
                    point = roll;
                    pointRoll.innerHTML = `Your point is: ${point}`;
                    firstRoll(roll,playAgainBtn);

                }
                else{
                    //after first roll sending procceding rolls to check if player win or lost
                    rolled.innerHTML = `You rolled a: ${roll}`;
                    rollChecks(point,roll,playAgainBtn);// need to finish this off

                }

            })
            
            //catching any error that is thrown
            .catch(error => {console.log(error)});  
    });

}

//adding the rolls
function adding(a,b){
    return a+b;
}

//checking if player first roll won(7 or 11) lost(2,3,12). if anyrhing esle the point is set
function firstRoll(rollSum,navDiv){
        if(rollSum === 7 || rollSum=== 11){
            return win(rollSum,navDiv);
        }
        else if(rollSum ===2 || rollSum === 3||rollSum ===12){
            return lose(rollSum,navDiv);
    }
    fristRolled = true;
}

//any procedding roll is sent here
//the point is sent in with the sum to check if the player won or lost
function rollChecks(point,rollSum,navDiv){

    if(rollSum === point){
        return win(rollSum,navDiv);
    }
    else if (rollSum === 7){
        return lose(rollSum,navDiv)
    }
}


//losing function
function lose(roll,playAgainBtn){ 
    rollBtn.style.display = "none";
    playAgainBtn.style.display = "inline";
    rolled.innerHTML = `You rolled a: ${roll}`;
    result.innerText = "CRAPS!!! You lost this round GG fam";
}

//winning function
function win(roll,playAgainBtn){
    rollBtn.style.display = "none";
    playAgainBtn.style.display = "inline";
    rolled.innerHTML = `You rolled a: ${roll}`;
    result.innerText = "Oh wow you won a game of chance you are so skillful..... GJ"
}
