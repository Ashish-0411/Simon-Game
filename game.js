var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});
$(document).keypress(function(){
    if(!started){
        // $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});
function nextSequence(){
    userClickedPattern=[];
    level+=1;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){

$("."+currentColour).addClass("pressed");
setTimeout(function(){$("."+currentColour).removeClass("pressed")},100);
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(
              nextSequence
            , 1000);
    
          }
    }
    else{
        console.log("wrong");
        var wrong=new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
       
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game over, Press Any key to restart");

        startOver();
    }
    
}


      



