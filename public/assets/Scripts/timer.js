function Turn (t) {
    var timer = document.getElementById("timer")
    timer.style.color = currentPlayer
    var start = t
    timer.innerHTML = start
    if (currentHex === -1) { return }
    setTimeout(function() {
        start--
        timer.innerHTML = start
        if (start == 0) {
            changePlayer()
            if (hexagons[currentHex - 1].color === 'blue') {
                blueScore += 5
            } else if (hexagons[currentHex - 1].color === 'red') {
                redScore += 5
            }
            document.getElementById('question-container').style.display = 'none'
        } else {
            Turn(start)
        }
    }, 1000)
}

function timerZeroing() {
    currentHex = -1
    document.getElementById("timer").innerHTML = 0
}