var btns = []
var random_btns = []
var queue = []

function playGame() {
    // add level
    $("#title").text(`Level ${random_btns.length + 1}`)
    var random_btn = btns[Math.floor(Math.random() * btns.length)]
    random_btns.push(random_btn)

    queue = []
    for (var i = random_btns.length - 1; i >= 0; i--) {
        queue.push(random_btns[i])
    }

    playAudio(random_btn)
    
    // blink div
    $(`#${random_btn}`).fadeOut(100).fadeIn(100)

}

function chooseBtn(event) {
    id = event.target.id
    // blink div
    $(`#${id}`).addClass("pressed")

    setTimeout(function () {
        playAudio(id)
        $(`#${id}`).removeClass("pressed")
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
    $(".btn").on("click", chooseBtn)
    $("body").off("keypress", start)
    
    // initiate game
    setTimeout(playGame, 1000)
}

function lose() {
    $("#title").text("Game Over, Press Any Key To Restart")
    // blink body
    $("body").addClass("game-over")
    setTimeout(function() {
        $("body").removeClass("game-over")
    }, 100);

    playAudio("wrong")
    // setup listeners
    $(".btn").off("click", chooseBtn)
    $("body").on("keypress", start)

    random_btns = []
}

function playAudio(btnID) {
    var snd = new Audio(`sounds/${btnID}.mp3`)
    snd.play()
}

function main() {

    $("body").on("keypress", start)

    $(".btn").each(function() {
        btns.push(this.id)
    })
}


$( document ).ready( main )