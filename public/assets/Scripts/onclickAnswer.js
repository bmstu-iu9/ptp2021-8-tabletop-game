function onclickAnswer(answer) {
    const questionContainer = document.getElementById('question-container')
    const right = checkAnswer(currentQuestion, answer)
    if (right) {
        if (hexagons[currentHex - 1].color == 'neutral') {
            addScores(10)
        } else {
            addScores(20)
        }

        if (hexagons[currentHex - 1].isCrown) {
            minusCrown()
        }

        alert('RIGHT!')
        hexagons[currentHex - 1].paint(currentPlayer)
        document.getElementById(currentHex + 'Hex').style.background = currentPlayer
    } else {
        if (hexagons[currentHex - 1].color === 'blue') {
            blueScore += 5
        } else if (hexagons[currentHex - 1].color === 'red') {
            redScore += 5
        }
        alert('WRONG!')
    }
    document.getElementById('red-scope').innerHTML = redScore
    document.getElementById('blue-scope').innerHTML = blueScore
    changePlayer()
    timerZeroing()
    questionContainer.style.display = 'none'
    if (!gameState) {
        if (redCrowns === 0) {
            alert('синий победил!')
        } else if (blueCrowns === 0) {
            alert('красный победил!')
        } else if (redScore > blueScore) {
            alert('красный победил!')
        } else if (blueScore > redScore) {
            alert('синий победил!')
        } else {
            alert('ничья!')
        }
        return
    }
}