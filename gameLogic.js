let playerText = document.getElementById('playerText')
let replayBtn = document.getElementById('replayBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let playingBoxes = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', ClickedonBox))
}

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-boxes')

function ClickedonBox(e) {
    const id = e.target.id

    if(!playingBoxes[id]){
        playingBoxes[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_boxes = playerHasWon()
            winning_boxes.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
    replayBtn.innerText = 'RePlay'
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(playingBoxes[a] && (playingBoxes[a] == playingBoxes[b] && playingBoxes[a] == playingBoxes[c])) {
            return [a,b,c]
        }
    }
    return false
}

replayBtn.addEventListener('click', replay)

function replay() {
    playingBoxes.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'
    replayBtn.innerText = 'ReStart'

    currentPlayer = X_TEXT
}

startGame()