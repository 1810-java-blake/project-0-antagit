//first roll, disk is off
//win 7,11
//lose:2,3,12 
//move on: 4,5,6,8,9,10 setting up a point

//second roll,disk is on
//the point is on which number was rolled 
//now player keeps rolling untill they either hit that number agian or 7
//if 7 lose if that number lose


//loading the whole html first then calling set up
document.addEventListener("DOMContentLoaded", game);

//setUp(): setting up my varibles and making contact with the api
function game(){
    let rollBtn = document.getElementById("rollBtn");
    let image = document.getElementById("imageDiv");
    let rollArray = []; 
    
    let fristRolled = false;
    let point;
    //making contact with the api  by using fetch
    rollBtn.addEventListener("click", event =>{
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

                if(!fristRolled){
                    if(firstRoll(roll) === 0){
                        lose();
                    }
                    else if(firstRoll(roll)===1){
                        win();
                    }
                    else{
                        point = roll;
                        fristRolled = true;
                    }
                }
                else{
                    rollChecks(3,3);
                }

            })
            
            //catching any error that is thrown
            .catch(error => {console.log(error)});
    });

}
function adding(a,b){
    return a+b;
}

function firstRoll(rollSum){
        if(rollSum === 7 || rollSum=== 11){

            return win();
        }
        else if(rollSum ===2 || rollSum === 3||rollSum ===12){
            return lose();
    }
}

function rollChecks(point,rollSum){

    if(rollSum === point){
        return win();
    }
    else if (rollSum === 7){
        return lose()
    }
}

function lose(){
    //need to wright lose func
    
    console.log("Take taht big fat L boi!")
}

function win(){
    //need to wright win func
    console.log("Oh wow you won a game off chance you are so skillful..... gtfo of here")
}
