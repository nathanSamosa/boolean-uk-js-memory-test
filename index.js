//Set initial variables
var memoryArr = [];
var answersArr = [];
var gameDifficulty = 3;
var score = 0;

//Display default game difficulty
console.log("Default game difficulty: " + gameDifficulty + " seconds.");

//Called when the game is played to clear arrays and score
function gameReset() {
    memoryArr = [];
    answersArr = [];
    score = 0;
}

//Used to change the difficulty of the game by adding more digits to the random numbers
function changeDifficulty(digits) {
    gameDifficulty = digits;
    console.log("You have to wait " + gameDifficulty + " seconds before reciting the digits shown");
    displayDifficulty();
}


//Main game function
function PlayMemoryTest(gameLength) {

    //Clear previous arrays and scores
    gameReset();

    //Push random numbers to the memoryArr to match the gameLength
    for (let i = 0; i < gameLength; i++) {
        const tempRandom = Math.floor(Math.random() * 100) + 1;
        console.log(tempRandom);
        memoryArr.push(tempRandom);
    }

    //The string of text that will prompt the player to begin memorising
    const gamePrompt = "Remember this list of numbers:\n" + memoryArr.join(", ") + "\nYou will be asked in " + gameDifficulty + " seconds to recite these digits"

    //Confirm the user has read the digits and start a countdown equal to gameDifficulty
    if (confirm(gamePrompt)){
        setTimeout(function() { promptAnswer(); }, gameDifficulty*1000)
    } else {
        alert("Game cancelled");
    }
}

//Prompt player for their answers
function promptAnswer() {
    for (let i = 0; i < memoryArr.length; i++) {

        //Fetch suffix for ordinality
        var iSuffix = suffix(i+1);

        //Fetch player answer and push to answersArr to match memoryArr
        var tempAnswer = prompt("enter the " + iSuffix + " digit:");
        answersArr.push(tempAnswer);
    }
    
    gameResults();
}


//Find suffix to match i
function suffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

//Compare index of memoryArr and answersArr to calculate score
function gameResults() {
    for (let i = 0; i < memoryArr.length; i++) {
        if (answersArr[i] == memoryArr[i]) {
            score++
        }
    }

    //Convert score to 0-decimal percentage
    var percentage = (score / memoryArr.length) * 100;
    percentage = percentage.toFixed(0);
    console.log(percentage);


    //Alert the user of their score with a message
    if (percentage == 100) {
        alert("CONGRATULATIONS!! You scored " + percentage + "% and got every number correct");
    } else if (percentage >= 75) {
        alert("Well done!! You scored " + percentage + "%");
    } else if (percentage >= 50) {
        alert("Good job! You scored " + percentage + "%");
    } else if (percentage < 50) {
        alert("You scored " + percentage + "%, better luck next time!");
    }
}