let ball = document.querySelector('.ball');
let field = document.querySelector('.Field');
let holes = document.querySelectorAll('.hole');
let finish = document.querySelector('#finish');
let isLose = false;
let maxY = Field.clientHeight - Ball.clientHeight;
let maxX = Field.clientWidth - Ball.clientHeight;

//Nasłuchiwacz
window.addEventListener('deviceorientation', Game);

//Funkcja przechowująca mechanikę gry
function Game(e) {
    let x = e.beta
    let y = e.gamma
    if (x > 90) x = 90
    if (x < -90) x = -90
    x += 90
    y += 90
    ball.style.top = (maxX * x / 180 - 10) + "px"
    ball.style.left = (maxY * y / 180 - 10) + "px"

    let ballPosition = {
        top: ball.offsetTop,
        left: ball.offsetLeft
    }
    let checkpointPosition = {
        top: start.offsetTop,
        left: start.offsetLeft
    }

    function wait(milliseconds) {
        let start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break
            }
        }
    }

    if (ballPosition.top > checkpointPosition.top - 20 &&
        ballPosition.top < checkpointPosition.top + 20 &&
        ballPosition.left > checkpointPosition.left - 20 &&
        ballPosition.left < checkpointPosition.left + 20) {
        Statement("You win!", "green", "visible")
        wait(1000)
        location.reload()
    }

    isLose = CheckLose(ballPosition, holes)

    function CheckLose(ball, holes) {
        for (let i = 0; i < holes.length; i++) {
            let hole = {
                top: holes[i].offsetTop,
                left: holes[i].offsetLeft
            }
            if (ball.top > hole.top - 20 &&
                ball.top < hole.top + 20 &&
                ball.left > hole.left - 20 &&
                ball.left < hole.left + 20) {
                return true
                break
            }
        }
        return false
    }

    function Statement(text, background, visibility) {
        statement.innerHTML = text
        statement.style.background = background
        statement.style.visibility = visibility
    }

    if (isLose) {
        Statement("You lose", "red", "visible")
        wait(1000)
        location.reload()
    }
