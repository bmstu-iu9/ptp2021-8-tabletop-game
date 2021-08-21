function redTurn (t) {
    var timer = document.getElementById("timer")
    timer.style.color = "red"
    var start = t
    timer.innerHTML = start
    setTimeout(function() {
        start--
        timer.innerHTML = start
        if (start == 0) {
            blueTurn(60)
        } else {
            redTurn(start)
        }
    }, 1000)
}
function blueTurn (t) {
    var timer = document.getElementById("timer")
    timer.style.color = "blue"
    var start = t
    timer.innerHTML = start
    setTimeout(function() {
        start--
        timer.innerHTML = start
        if (start == 0) {
            redTurn(60)
        } else {
            blueTurn(start)
        }
    }, 1000)

}
setTimeout(redTurn, 1, 60)