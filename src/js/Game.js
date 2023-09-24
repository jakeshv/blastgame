import { Field } from './Field'

export class Game {
  #level = 1
  #moves = 0
  #scope = 0
  #targetScope = 0

  constructor() {
    const canvas = document.getElementById('game-field')
    this.field = new Field(canvas)
    this.field.onTilesDestroy(this.onTilesDestroy.bind(this))

    this.movesElement = document.getElementById('moves')
    this.scopesElement = document.getElementById('scopes')
    this.progressElement = document.getElementById('progress')
    this.levelWindow = document.getElementById('level-window')
    this.levelElement = document.getElementById('level')
    this.loseWindow = document.getElementById('lose-window')
  }

  async init() {
    await this.field.init()
    this.generateNewLevel()
  }

  generateNewLevel() {
    this.levelElement.textContent = this.#level

    this.setScope(0)
    this.setMoves(3)
    this.#targetScope = 100

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
    let addedScope = tilesNumber * 10
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

  win() {
    this.#level++
    this.generateNewLevel()
  }

  lose() {
    this.#level = 1
    this.showLoseWindow()
  }
}