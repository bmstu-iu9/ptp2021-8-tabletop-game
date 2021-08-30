function onclickHex(hexId) {
    if (hexagons[hexId - 1].available() && gameState) {
        currentHex = hexId
        duelMode = hexagons[hexId - 1].isCrown
        fillTheContainer()
        if (!duelMode) { 
            minusMoves()
        }
    } else if (gameState) {
        alert("This hexagon is not available!")
    }
}

function fillTheContainer() {
    if (hexagons[currentHex - 1].color === 'neutral') {
        questionMode = currentPlayer
    } else {
        questionMode = hexagons[currentHex - 1].color
    }
    currentQuestion = selectRandomQuestion(questionMode)
    document.getElementById('question-text').innerHTML = currentQuestion.questionText
    document.getElementById('A-txt').innerHTML = currentQuestion.A
    document.getElementById('B-txt').innerHTML = currentQuestion.B
    document.getElementById('C-txt').innerHTML = currentQuestion.C
    document.getElementById('D-txt').innerHTML = currentQuestion.D
    questionContainer.style.display = 'block'
    Turn(10)
}