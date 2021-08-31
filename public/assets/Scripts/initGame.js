class Hexagon {
    constructor(id, ... neighbors) {
        this.color = 'neutral'
        this.id = id
        this.neighbors = neighbors
        this.isCrown = false
    }

    paint(color) {
        this.color = color
    }

    available() {
        for (let i of this.neighbors) {
            if (hexagons[i - 1].color === currentPlayer) {
                return this.color != currentPlayer
            }
        }
        return false
    }
}

let questionMode,
    duelScore = 0,
    duelMode = false,
    redCrowns = 3,
    blueCrowns = 3,
    gameState = true,
    currentQuestion,
    currentHex = -1,
    currentPlayer = 'red',
    redScore = 0,
    blueScore = 0,
    redMoves = 10,
    blueMoves = 10,
    hexagons = [];

const questionContainer = document.getElementById('question-container');

function hexInit() {
    hexagons[0] = new Hexagon(1, 2, 4)
    hexagons[1] = new Hexagon(2, 1, 5)
    hexagons[2] = new Hexagon(3, 4, 7, 8)
    hexagons[3] = new Hexagon(4, 1, 3, 8, 9)
    hexagons[4] = new Hexagon(5, 2, 6, 10, 11)
    hexagons[5] = new Hexagon(6, 5, 11, 12)
    hexagons[6] = new Hexagon(7, 3, 8, 13)
    hexagons[7] = new Hexagon(8, 3, 4, 7, 9, 13, 14)
    hexagons[8] = new Hexagon(9, 4, 8, 10, 14)
    hexagons[9] = new Hexagon(10, 5, 9, 11, 15)
    hexagons[10] = new Hexagon(11, 5, 6, 10, 12, 15, 16)
    hexagons[11] = new Hexagon(12, 6, 11, 16)
    hexagons[12] = new Hexagon(13, 7, 8, 14)
    hexagons[13] = new Hexagon(14, 8, 9, 13, 17)
    hexagons[14] = new Hexagon(15, 10, 11, 16, 18)
    hexagons[15] = new Hexagon(16, 11, 12, 15)
    hexagons[16] = new Hexagon(17, 14, 18)
    hexagons[17] = new Hexagon(18, 15, 17)

    hexagons[2].paint('blue')
    hexagons[2].isCrown = true

    hexagons[6].paint('blue')
    hexagons[6].isCrown = true

    hexagons[12].paint('blue')
    hexagons[12].isCrown = true

    hexagons[5].paint('red')
    hexagons[5].isCrown = true

    hexagons[11].paint('red')
    hexagons[11].isCrown = true

    hexagons[15].paint('red')
    hexagons[15].isCrown = true
}

function changePlayer() {
    if (currentPlayer === 'red') {
        currentPlayer = 'blue'
        document.getElementById('turn').innerHTML = 'синего'
    } else {
        currentPlayer = 'red'
        document.getElementById('turn').innerHTML = 'красного'
    }
}

function addScores(scores) {
    if (currentPlayer === 'red') {
        redScore += scores
    } else {
        blueScore += scores
    }
}

function minusCrown() {
    duelMode = false
    if (currentPlayer === 'red') {
        blueCrowns--
        document.getElementById('red-crowns').innerHTML = 3 - blueCrowns
    } else {
        redCrowns--
        document.getElementById('blue-crowns').innerHTML = 3 - redCrowns
    }
    if (blueCrowns === 0 || redCrowns === 0) {
        gameState = false
    }
    hexagons[currentHex - 1].isCrown = false
}

function minusMoves() {
    if (currentPlayer === 'red') {
        if (redMoves > 0) {
            redMoves--
            document.getElementById('red-turn-remain').innerHTML = redMoves
        } else {
            alert('У красного нет ходов!')
        }
    } else {
        if (blueMoves > 0) {
            blueMoves--
            document.getElementById('blue-turn-remain').innerHTML = blueMoves
        } else {
            alert('У синего нет ходов!')
        }
    }
    if (redMoves === 0 && blueMoves === 0) {
        gameState = false
    }
}

function gameOver() {
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
    document.location.href = "./index.html"
}

hexInit()

