function onclickHex(hexId) {
    if (hexagons[hexId - 1].available() && gameState) {
        currentHex = hexId
        Turn(10)
        const questionContainer = document.getElementById('question-container')
        if (questionContainer === undefined) {
            alert('В базе данных закончились вопросы')
            return
        }
        let mode
        if (hexagons[hexId - 1].color === 'neutral') {
            mode = currentPlayer
        } else {
            mode = hexagons[hexId - 1].color
        }
        currentQuestion = selectRandomQuestion(mode)
        document.getElementById('question-text').innerHTML = currentQuestion.questionText
        document.getElementById('A-txt').innerHTML = currentQuestion.A
        document.getElementById('B-txt').innerHTML = currentQuestion.B
        document.getElementById('C-txt').innerHTML = currentQuestion.C
        document.getElementById('D-txt').innerHTML = currentQuestion.D
        questionContainer.style.display = 'block'
        minusMoves()
    } else if (gameState) {
        alert("This hexagon is not available!")
    } else {
        
    }
}