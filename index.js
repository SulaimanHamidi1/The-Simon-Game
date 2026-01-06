var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function start (){
    if (!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
}

$(document).keypress(start);
$(document).click(start);

$(".btn").click(function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound (name){
    new Audio('./sounds/' + name + ".mp3").play();
}

function nextSequence (){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeTo('fast', 0.1).fadeTo('fast', 1);
    playSound(randomChosenColor);
}

function animatePress (currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
    

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        $("body").addClass("game-over");
        playSound("wrong");

        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}



