export class DefaultView {
  constructor() {
    this.movesElement = document.getElementById('moves')
    this.scopesElement = document.getElementById('scopes')
    this.progressElement = document.getElementById('progress')
    this.levelWindow = document.getElementById('level-window')
    this.levelElement = document.getElementById('level')
    this.currentLevelElement = document.getElementById('current-level')
    this.loseWindow = document.getElementById('lose-window')
    this.notAllowActionWindow = document.getElementById('not-allow-action-window')
    this.canvas = document.getElementById('game-field')
  }

  getCanvas() {
    return this.canvas
  }

  setLevel(level) {
    this.levelElement.textContent = level
    this.currentLevelElement.textContent = level
  }

  async showWindow(window) {
    window.style.visibility = 'visible'
    window.style.opacity = '1'
    window.style.pointerEvents = 'auto'
    await new Promise(resolve => setTimeout(resolve, 1500))
    window.style.opacity = '0'
    window.style.pointerEvents = 'none'
  }

  async showLevelWindow() {
    await this.showWindow(this.levelWindow)
  }

  async showLoseWindow() {
    await this.showWindow(this.loseWindow)
  }

  async showNotAllowActionWindow() {
    await this.showWindow(this.notAllowActionWindow)
  }

  setScope(value, progress) {
    this.scopesElement.textContent = value
    this.progressElement.style.width = progress + '%'
  }

  setMoves(moves) {
    this.movesElement.textContent = moves
  }
}