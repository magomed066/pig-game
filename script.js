'use strict'

//? UI Elements
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const btnNewGame = document.querySelector('.btn--new')
const $current1 = document.querySelector('#current--0')
const $current2 = document.querySelector('#current--1')
const $score1 = document.querySelector('#score--0')
const $score2 = document.querySelector('#score--1')
const $dice = document.querySelector('.dice')
const player1 = document.querySelector('.player--0')
const player2 = document.querySelector('.player--1')

let scores, currentScore, activePlayer, isPlay

init()

btnRoll.addEventListener('click', () => {
    if (isPlay) {
        const dice = Math.trunc(Math.random() * 6) + 1

        $dice.classList.remove('hidden')
        $dice.src = `dice-${dice}.png`

        if (dice !== 1) {
            currentScore += dice
            document.querySelector(
                `#current--${activePlayer}`
            ).textContent = currentScore
        } else {
            switchPlayer()
        }
    }
})

btnHold.addEventListener('click', () => {
    if (isPlay) {
        scores[activePlayer] += currentScore

        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer]

        if (scores[activePlayer] >= 20) {
            isPlay = false

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner')
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active')
        } else {
            switchPlayer()
        }
    }
})

btnNewGame.addEventListener('click', init)

function switchPlayer() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0
    currentScore = 0
    currentScore = activePlayer = activePlayer === 0 ? 1 : 0

    player1.classList.toggle('player--active')
    player2.classList.toggle('player--active')
}

function init() {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    isPlay = true

    $score1.textContent = '0'
    $score2.textContent = '0'
    $current1.textContent = '0'
    $current2.textContent = '0'

    $dice.classList.add('hidden')
    player1.classList.remove('player--winner')
    player2.classList.remove('player--winner')
    player1.classList.add('player--active')
    player2.classList.remove('player--active')
}
