"use strict";


let ball = document.getElementById("ball")
let sound = document.createElement("audio")
sound.src = "../sounds/basketballsound.mp3"
let ballX = 0
let ballY= 0
let ballDX = 0 //Velocity
let ballDY = 0
resetBall()
function randomMessage() {
    let messages = ["Ayeeeee", "You're doing GREAT!", "WOOHOO!!!"];
    let message = document.getElementById("message")
    message.innerHTML= messages[Math.floor(Math.random()*messages.length)]
}

//setInterval(moveBall, 50) - older way

//requestAnimationFrame(moveBall) // new 'best' way

let score = 0
let attempts = 0

function scoreShot() {
    score++
    document.getElementById("score").innerHTML = score
    sound.play()
    randomMessage()
}

function attemptShot() {
    attempts++
    document.getElementById("attempts").innerHTML = attempts
}

function moveBall(){
    ballX += ballDX //The velocity is the rate of change of position
    ballY += ballDY
    ballDY += .1 //Acceleration towards the ground (gravity)
    ball.style.left= ballX + "%" //<-- you might want to change this
    ball.style.top= ballY + "%"

    
    if (ballY > 90 || ballY < 0)    {ballDY = -ballDY*0.8}
    if (ballX > 90 || ballX < 0)     {ballDX = -ballDX*0.8}
    
    if (ballX + 2 > 70 && ballX + 2 < 80 && ballY + 2 > 47 && ballY + 2 < 52) { //Inside the hoop horizontally and vertically
        scoreShot()
        requestAnimationFrame(moveBall)
    }
    else if (Math.abs(ballDY) > 0.01 || ballY < 85) { //If the ball slows, the animation stops
        requestAnimationFrame(moveBall)
    } 
    else {//Ball has stopped
        resetBall()
    }
}

function resetBall() {
    ballDX = 0 //Velocity
    ballDY = 0
    ballX = 10
    ballY= 70
    ball.style.left= ballX + "%" //<-- you might want to change this
    ball.style.top= ballY + "%"
}

addEventListener("mouseup",throwBall)

function throwBall(e){
    ballDX= -((e.clientX /screen.availWidth * 100  - 2) - ballX) /7.5
    ballDY= -((e.clientY /screen.availHeight * 100 - 2) - ballY) /7.5
    requestAnimationFrame(moveBall) // new 'best' way
    attemptShot()
}