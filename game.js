
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.

var started = false;
//2. Create a new variable called level and start at level 0.
var level = 0;

$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function(){
   
   //var userChosenColor = this.id;
   var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});
//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    
  }

}
function nextSequence(){
    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    userClickedPattern=[];
    level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*4);
    
    var randomChosenColor=buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
   //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step
    
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor)
  console.log("FadeIn FadeOut Working");
}

function playSound(name){
var tune = new Audio("sounds/"+name+".mp3");
tune.play();
}
function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
setTimeout(function(){ //function body executes after 100 ms
    $("#"+currentColor).removeClass("pressed");
},100)

}

function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}