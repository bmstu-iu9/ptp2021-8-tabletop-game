function onclickAnswer(answer) {
    const right = checkAnswer(currentQuestion, answer)
    if (right) {
        if (hexagons[currentHex - 1].color == 'neutral') {
            addScores(10)
        } else {
            addScores(20)
        }
        
        if (duelMode) {
            duelScore++
            if (duelScore < 3) {
                onclickHex(currentHex)
            } else {
                duelScore = 0
                minusMoves()
                minusCrown()
                alert('RIGHT!')
                hexagons[currentHex - 1].paint(currentPlayer)
                document.getElementById(currentHex + 'Hex').style.background = currentPlayer
                update()
            }
        } else {
            alert('RIGHT!')
            hexagons[currentHex - 1].paint(currentPlayer)
            document.getElementById(currentHex + 'Hex').style.background = currentPlayer
            update()
        }
    } else {
        if (hexagons[currentHex - 1].color === 'blue') {
            blueScore += 5
        } else if (hexagons[currentHex - 1].color === 'red') {
            redScore += 5
        }
        alert('WRONG!')
        if (duelMode) {
            minusMoves()
        }
        duelMode = false
        duelScore = 0
        update()
    }
}

function update() {
    document.getElementById('red-scope').innerHTML = redScore
    document.getElementById('blue-scope').innerHTML = blueScore
    changePlayer()
    timerZeroing()
    questionContainer.style.display = 'none'
    if (!gameState) {
        gameOver()
    }
}