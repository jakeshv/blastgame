import { Field } from './Field'
import gameConfig from 'configs/game'
import { DefaultView } from '../View/Templates/Default'

export class Game {
  #level = 1
  #moves = 0
  #scope = 0
  #targetScope = 0
  #refillNumber = 0

  constructor(resourceLoader) {
    this.view = new DefaultView()
    this.field = new Field(this.view.getCanvas(), resourceLoader)
    this.field.addEventListener('tilesDestroy', this.onTilesDestroy.bind(this))
    this.field.addEventListener('hasNotAllowAction', this.notAllowAction.bind(this))
  }

  async init() {
    await this.generateNewLevel()
  }

  async generateNewLevel() {
    let moves = this.calculateMoves()
    let targetScope = this.calculateTargetScore()
    let colorNumbers = this.calculateColorNumbers()

    this.setScope(0)
    this.setMoves(moves)
    this.#targetScope = targetScope
    this.#refillNumber = gameConfig.maxRefill

    this.view.setLevel(this.#level)
    await this.view.showLevelWindow()

    this.field.setColorNumbers(colorNumbers)
    this.field.fill()
  }

  async notAllowAction() {
    await this.view.showNotAllowActionWindow()
    if (this.#refillNumber > 0) {
      this.#refillNumber--
      this.field.fill()
    } else {
      await this.view.showLoseWindow()
      await this.generateNewLevel()
    }
  }

  setScope(value) {
    this.#scope = value
    if (value > this.#targetScope) {
      value = this.#targetScope
    }
    let progress = value / this.#targetScope * 100 // 100%
    this.view.setScope(value, progress)
  }

  setMoves(value) {
    this.#moves = value
    this.view.setMoves(value)
  }

  onTilesDestroy(tilesNumber) {
    if (!tilesNumber) {
      return
    }
    this.#refillNumber = gameConfig.maxRefill
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
    return tilesNumber * gameConfig.scopePerBlock
  }

  calculateMoves() {
    return gameConfig.baseMoves + this.#level
  }

  calculateTargetScore() {
    return gameConfig.baseLevelTargetScope + this.#level * gameConfig.targetScopePerLevel
  }

  calculateColorNumbers() {
    return 3 + Math.floor(this.#level / 3)
  }

  async win() {
    this.#level++
    await this.generateNewLevel()
  }

  async lose() {
    this.#level = 1
    await this.view.showLoseWindow()
    await this.generateNewLevel()
  }
}