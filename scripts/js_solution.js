var inProgress = false
var btns = []
var random_btns = []


// Math.floor(Math.random() * (max - min + 1) + min) -----> min = 0  max = btns.lenght -1
function addRandomBtn() {
    random_btns[random_btns.length] = btns[ Math.floor(Math.random() * btns.length ) ] 
    playAudio(random_btns[random_btns.length - 1])
}


function playGame() {

}

function start() {
    if (!inProgress) {

        alert("hi")

        inProgress = true
    }
}

function lose() {

        alert("bye")

        inProgress = false
}

function playAudio(btnID) {
    var sound = new Audio(`sounds/${btnID}.mp3`)
    sound.play()
    sound.currentTime=0;
}






function main() {
    var body = document.querySelector("body")
    body.addEventListener("keypress", start)
    body.addEventListener("click", start)

    var tmp = document.querySelectorAll(".btn")
    for ( var i = 0 ; i < tmp.length ; i ++) {
        btns[i] = tmp[i].id
    }

}

window.onload = main