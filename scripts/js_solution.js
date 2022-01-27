var inProgress = false
var btns = []
var random_btns = []
var queue = []

// function fadeOut(id) {
//     var opacity = 0
//     var intervalID = 0
//     var element = document.getElementById(id)

//     setInterval(function() {
//         opacity = Number(window.getComputedStyle(element).getPropertyValue("opacity"))
//         if( opacity > 0) {
//             opacity=opacity-0.1
//             element.style.opacity=opacity
//         }
//         else{
//             clearInterval(intervalID);
//         }
//     }, 10)

// }

// function fadeIn(id){
//     var opacity = 0
//     var intervalID = 0
//     var element = document.getElementById(id)
    
//     setInterval(function() {
//         opacity = Number(window.getComputedStyle(element).getPropertyValue("opacity"))
//         if (opacity < 1) {
//             opacity = opacity + 0.1
//             element.style.opacity = opacity
//         } else {
//             clearInterval(intervalID)
//         }
//     }, 10)

// } 

function playGame() {
    var random_btn = btns[ Math.floor(Math.random() * btns.length ) ]
    random_btns.push( random_btn )

    console.log(random_btns)
    queue = []
    for ( var i = random_btns.length -1 ; i >= 0; i--) {
        queue.push(random_btns[i])
    }

    console.log(queue)


    playAudio(random_btn)
    
    // TODO: change below functions, looks like shit :)
    // var btn = document.getElementById(random_btn)
    // btn.classList.add("pressed")
    // fadeOut(random_btn)

    // setTimeout( function(){
    //     btn.classList.remove("pressed")
    //     fadeIn(random_btn)
    // } , 20)
    
}

function chooseBtn(event) {
    id = event.target.id
    document.getElementById(id).classList.add("pressed")
    playAudio(id)
    setTimeout( function(){
        document.getElementById(id).classList.remove("pressed")
    }, 100)

    if (id === queue.at(-1)) {
        queue.pop()
        checkState()
    } else {
        lose()
    }
}

function checkState() {

}

function start() {
    if (inProgress === false) {

        document.getElementById("title").textContent = `Level ${random_btns.length + 1}`

        var tmp = document.querySelectorAll(".btn")
        for ( var i = 0 ; i < tmp.length ; i ++) {
            tmp[i].addEventListener("click", chooseBtn)

            playGame()
            inProgress = true
        }
    }
}

function lose() {
    if (inProgress === true) {
            
    document.getElementById("title").textContent = "Game Over, Press Any Key To Restart"
    playAudio("wrong")

    var tmp = document.querySelectorAll(".btn")
    for ( var i = 0 ; i < tmp.length ; i ++) {
        tmp[i].removeEventListener("click", chooseBtn)
    }


        random_btns = []
        inProgress = false
     }

}

function playAudio(btnID) {
    var snd = new Audio(`sounds/${btnID}.mp3`)
    snd.play()
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