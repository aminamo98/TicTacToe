const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const boxElements = document.querySelectorAll('[data-box]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let oTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    oTurn = false
    boxElements.forEach(box => {
        box.classList.remove(X_CLASS)
        box.classList.remove(O_CLASS)
        box.removeEventListener('click', handleClick)
        box.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    const box = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS
    placeMark(box, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "'O'" : "'X'"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...boxElements].every(box => {
        return box.classList.contains(X_CLASS) || box.classList.contains(O_CLASS)
    })
}

function placeMark(box, currentClass){
    box.classList.add(currentClass)
}

function swapTurns(){
    oTurn = !oTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(oTurn){
        board.classList.add(O_CLASS)
    } else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return boxElements[index].classList.contains(currentClass)
        })
    })
}