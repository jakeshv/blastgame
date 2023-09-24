import { Field } from './Field'

export class Game {
  #level = 0
  #moves = 0
  #scope = 0
  #targetScope = 0

  constructor() {
    const canvas = document.getElementById('game-field')
    this.field = new Field(canvas)

    this.movesElement = document.getElementById('moves')
    this.scopesElement = document.getElementById('scopes')
    this.progressElement = document.getElementById('progress')


  }

  init() {
    this.field.init()

    this.generateLevel()
  }

  generateLevel() {
    this.#level++

    this.setScope(0)
    this.setMoves(10)
    this.#targetScope = 100
  }

  setScope(value) {
    this.#scope = 0
    this.scopesElement.textContent = value
  }

  setMoves(value) {
    this.#moves = 0
    this.movesElement.textContent = value
  }
}