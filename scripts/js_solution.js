var btns = []
var random_btns = []
var queue = []

function playGame() {
    // add level
    document.getElementById("title").textContent = `Level ${random_btns.length + 1}`
    var random_btn = btns[Math.floor(Math.random() * btns.length)]
    random_btns.push(random_btn)

    queue = []
    for (var i = random_btns.length - 1; i >= 0; i--) {
        queue.push(random_btns[i])
    }

    playAudio(random_btn)
    
    // blink div
    var btn = document.getElementById(random_btn)
    btn.style.opacity = 0

    setTimeout(function () {
        btn.style.opacity = 1
    }, 100)
}

function chooseBtn(event) {
    id = event.target.id
    // blink div
    document.getElementById(id).classList.add("pressed")

    setTimeout(function () {
        playAudio(id)
        document.getElementById(id).classList.remove("pressed")
    }, 100)

    // check queue status and pop
    if (id === queue.at(-1)) {
        queue.pop()
        if (queue.length === 0) {
            setTimeout(playGame, 1000)
        }
    } else {
        lose()
    }
}

function start() {
    var tmp = document.querySelectorAll(".btn")
    for (var i = 0; i < tmp.length; i++) {
        tmp[i].addEventListener("click", chooseBtn)
    }

    document.querySelector("body").removeEventListener("keypress", start)

    // initiate game
    setTimeout(playGame, 1000)
}

function lose() {
    document.getElementById("title").textContent = 'Game Over, Press Any Key To Restart'
    // blink body
    document.querySelector("body").classList.add("game-over")
    setTimeout(function() {
        document.querySelector("body").classList.remove("game-over")
    }, 100);

    playAudio("wrong")
    // setup listeners
    var tmp = document.querySelectorAll(".btn")
    for (var i = 0; i < tmp.length; i++) {
        tmp[i].removeEventListener("click", chooseBtn)
    }

    document.querySelector("body").addEventListener("keypress", start)

    random_btns = []
}

function playAudio(btnID) {
    var snd = new Audio(`sounds/${btnID}.mp3`)
    snd.play()
}

function main() {
    document.querySelector("body").addEventListener("keypress", start)

    var tmp = document.querySelectorAll(".btn")
    for (var i = 0; i < tmp.length; i++) {
        btns.push(tmp[i].id)
    }
}

window.onload = main