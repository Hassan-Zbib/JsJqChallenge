var btns = []
var random_btns = []
var queue = []

function playGame() {
    document.getElementById("title").textContent = `Level ${random_btns.length + 1}`
    var random_btn = btns[Math.floor(Math.random() * btns.length)]
    random_btns.push(random_btn)

    queue = []
    for (var i = random_btns.length - 1; i >= 0; i--) {
        queue.push(random_btns[i])
    }

    playAudio(random_btn)

    var btn = document.getElementById(random_btn)
    btn.style.opacity = 0

    setTimeout(function () {
        btn.style.opacity = 1
    }, 100)
}

function chooseBtn(event) {
    id = event.target.id
    document.getElementById(id).classList.add("pressed")

    setTimeout(function () {
        playAudio(id)
        document.getElementById(id).classList.remove("pressed")
    }, 100)

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

    var body = document.querySelector("body")
    body.removeEventListener("keypress", start)

    playGame()
}

function lose() {
    document.getElementById("title").textContent = 'Game Over, Press Any Key To Restart'
    playAudio("wrong")

    var tmp = document.querySelectorAll(".btn")
    for (var i = 0; i < tmp.length; i++) {
        tmp[i].removeEventListener("click", chooseBtn)
    }

    var body = document.querySelector("body")
    body.addEventListener("keypress", start)

    random_btns = []
}

function playAudio(btnID) {
    var snd = new Audio(`sounds/${btnID}.mp3`)
    snd.play()
}

function main() {
    var body = document.querySelector("body")
    body.addEventListener("keypress", start)

    var tmp = document.querySelectorAll(".btn")
    for (var i = 0; i < tmp.length; i++) {
        btns[i] = tmp[i].id
    }
}

window.onload = main