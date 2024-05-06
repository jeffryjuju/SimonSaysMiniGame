alert("Test")

var buttonColours = ["red", "blue", "green", "yellow"]; // Default pattern
var gamePattern = []; // Pattern created by the system
var userClickedPattern = [] // User clicked pattern
var level = 0; // Level counter
var isPlaying = false; // In game validator
var currSequence = 0; // Click counter per level

$(document).on("keypress", function() {
    if (!isPlaying){
        nextSequence();
        isPlaying = true;
    }
});

// Each button clicks will trigger these actions
$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress($(this), "checking");
    playSound(userChosenColour);
    checkAnswer();
});

// Simon Says Generator
function nextSequence() {
    // Update h1 title
    level++;
    $("#level-title").text("Level "+level);

    // Randomize the colour
    var randomNumber = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColours[randomNumber]);

    // Flash animation
    $("#"+buttonColours[randomNumber]).fadeOut(100).fadeIn(100);

    playSound(buttonColours[randomNumber]);
}

// Function to play sound
function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

// User click animation
function animatePress(element, condition) {
    if (condition === "checking") {
        element.addClass("pressed");
        setTimeout(function() {
            element.removeClass("pressed");
        },100);
    }

    if (condition === "reseting") {
        element.addClass("game-over");
        setTimeout(function() {
            element.removeClass("game-over");
        },200);
    }
}

// Checking for answer
function checkAnswer() {
    // If the user clicks the correct colour
    if (userClickedPattern[currSequence] === gamePattern[currSequence]) {
        currSequence++;
        // console.log("Success!");
    } 
    // If the user
    else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        animatePress($("body"), "reseting");
        level = 0;
        gamePattern = [];
        currSequence = 0;
        userClickedPattern = [];
        isPlaying = false;
    }

    // Whenever currSequence is equal as level, means the user finishes the level and can proceed
    if (currSequence === level && isPlaying) {
        userClickedPattern = [];
        currSequence = 0;
        setTimeout(function() {
            nextSequence();
        },1000);
    }
}