const userClickPattern=[]
const buttonColors=["red","blue","green","yellow"]
const gamePattern=[]
let level=0;
$(document).on("keydown",()=>{
    $('h1').text('Level'+' '+level)
    nextSequence()
    $('[type=button]').css('pointer-events', '')
})
function nextSequence(){
    level++
    $('h1').text('Level'+' '+level)
    randomNumber=Math.floor(Math.random()*3)+1
    let randomChosenColour=buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(() => {
            playSound(gamePattern[i]);
            animatePress(gamePattern[i]);
        }, 1000 * i+1000 );
    }
    userClickPattern.length=0
}
$("[type=button]").on("click",function(){
    let id=this.id
    userClickPattern.push(id)
    playSound(id)
    animatePress(id) 
    checkAnswer(userClickPattern.length-1)
    if(userClickPattern.length===gamePattern.length){
        nextSequence()
    }
})
function playSound(name){
    let audio=new Audio(`sounds/${name}.mp3`)
    audio.play()
}
function animatePress(currentColor){
    $('#'+currentColor).addClass("pressed")
    setTimeout(()=>{
        $('#'+currentColor).removeClass("pressed")
    },100)
}
function checkAnswer(index){
    if(userClickPattern[index]!==gamePattern[index]){
        gameOver()
    }
}
function gameOver(){
    gamePattern.length=0
    level=0
    $('h1').text("GaMe OvEr 😈😈")
    let audio = new Audio("sounds/wrong.mp3")
    audio.play()
    $('[type=button]').css("pointer-events","none")
}