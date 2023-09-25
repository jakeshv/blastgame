import { Field } from './Field'
import game from 'configs/game'

export class Game {
  #level = 1
  #moves = 0
  #scope = 0
  #targetScope = 0

  constructor() {
    const canvas = document.getElementById('game-field')
    this.field = new Field(canvas)
    this.field.addEventListener('tilesDestroy', this.onTilesDestroy.bind(this))
    this.field.addEventListener('hasNotAllowAction', this.onHasNotAllowAction.bind(this))

    this.movesElement = document.getElementById('moves')
    this.scopesElement = document.getElementById('scopes')
    this.progressElement = document.getElementById('progress')
    this.levelWindow = document.getElementById('level-window')
    this.levelElement = document.getElementById('level')
    this.currentLevelElement = document.getElementById('current-level')
    this.loseWindow = document.getElementById('lose-window')

    this.refillNumber = game.maxRefill
  }

  async init() {
    await this.field.init()
    this.generateNewLevel()
  }

  generateNewLevel() {
    this.levelElement.textContent = this.#level
    this.currentLevelElement.textContent = this.#level

    let moves = this.calculateMoves(this.#level)
    let targetScope = this.calculateTargetScore(this.#level)
    let colorNumbers = this.calculateColorNumbers(this.#level)

    this.field.setColorNumbers(colorNumbers)

    this.setScope(0)
    this.setMoves(moves)
    this.#targetScope = targetScope

    this.showLevelWindow()
  }

  showLevelWindow() {
    setTimeout(() => {
      this.levelWindow.style.opacity = '0'
      this.levelWindow.style.pointerEvents = 'none'
      this.field.fill()
    }, 1500)
    this.levelWindow.style.opacity = '1'
    this.levelWindow.style.pointerEvents = 'auto'
  }

  showLoseWindow() {
    setTimeout(() => {
      this.loseWindow.style.opacity = '0'
      this.loseWindow.style.pointerEvents = 'none'
      this.generateNewLevel()
    }, 1500)
    this.loseWindow.style.visibility = 'visible'
    this.loseWindow.style.opacity = '1'
    this.loseWindow.style.pointerEvents = 'auto'
  }

  setScope(value) {
    this.#scope = value
    this.scopesElement.textContent = value
    if (value > this.#targetScope) {
      value = this.#targetScope
    }
    let progress = value / this.#targetScope * 100
    this.progressElement.style.width = progress + '%'
  }

  setMoves(value) {
    this.#moves = value
    this.movesElement.textContent = value
  }

  onTilesDestroy(tilesNumber) {
    if (!tilesNumber) {
      return
    }
    let addedScope = this.calculateScore(tilesNumber)
    let newScope = this.#scope + addedScope
    let moves = this.#moves
    moves--

    if (newScope >= this.#targetScope) {
      return this.win()
    }

    if (moves <= 0) {
      return this.lose()
    }

    this.setMoves(moves)
    this.setScope(newScope)
  }

  calculateScore(tilesNumber) {
    let score = 1
    for (let i = 0; i < tilesNumber; i++) {
      score += 3
    }
    return score
  }

  calculateMoves(level) {
    return 10 + Math.floor(level / 3)
  }

  calculateTargetScore(level) {
    return 100 + level * 30
  }

  calculateColorNumbers(level) {
    return 3 + Math.floor(level / 3)
  }

  win() {
    this.#level++
    this.generateNewLevel()
  }

  lose() {
    this.#level = 1
    this.showLoseWindow()
  }

  onHasNotAllowAction() {
    if (this.refillNumber > 0) {
      this.refillNumber--
      this.field.fill()
    } else {
      console.log('onHasNotAllowAction')
    }
  }
}