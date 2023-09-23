import tileConfig from 'configs/tile'

export class Tile {
  #targetPosition = {}
  #startPosition = {}
  #appearanceTime = tileConfig.appearanceTime
  #destroyTime = tileConfig.destroyTime
  #aspectRatio = tileConfig.aspectRatio

  constructor(context, x, y, width, image) {
    this.context = context
    this.image = image

    this.width = width
    this.height = width * this.#aspectRatio
    this.#startPosition = {
      x, y
    }
  }

  draw(x, y, width) {
    const height = width * this.#aspectRatio
    this.context.drawImage(this.image, x, y, width, height)
  }

  appear() {
    const duration = this.#appearanceTime
    return this.animateByTime((elapsedTime) => {
      this.clear()

      const stepSize = this.width / this.#appearanceTime
      const width = elapsedTime >= this.#appearanceTime ? this.width : stepSize * elapsedTime
      const x = this.#startPosition.x + (this.width - width) / 2
      const y = this.#startPosition.y + (this.width - width) / 2 * this.#aspectRatio

      this.draw(x, y, width)
    }, duration)
  }

  setTargetPosition(x, y) {
    this.#targetPosition = { x, y }
  }

  fall() {
    if (this.#targetPosition.y <= this.#startPosition.y) {
      return
    }
    return new Promise(resolve => {

      let step = timestamp => {
        this.clear()

        const stepSize = 10
        this.#startPosition.y += stepSize
        if (this.#startPosition.y > this.#targetPosition.y) {
          this.#startPosition.y = this.#targetPosition.y
        }

        this.draw(this.#startPosition.x, this.#startPosition.y, this.width)

        if (this.#startPosition.y < this.#targetPosition.y) {
          requestAnimationFrame(step)
        } else {
          resolve()
        }
      }

      requestAnimationFrame(step)
    })
  }

  clear() {
    this.context.clearRect(this.#startPosition.x, this.#startPosition.y, this.width, this.height)
  }

  disappear() {
    const duration = this.#destroyTime
    return this.animateByTime((elapsedTime) => {
      this.clear()

      const stepSize = this.width / duration
      const width = elapsedTime >= duration ? 0 : this.width - stepSize * elapsedTime
      const x = this.#startPosition.x + (this.width - width) / 2
      const y = this.#startPosition.y + (this.width - width) / 2 * this.#aspectRatio

      this.draw(x, y, width)
    }, duration)
  }

  animateByTime(callback, duration) {
    return new Promise(resolve => {
      let start = performance.now()
      let step = timestamp => {
        let elapsedTime = timestamp - start

        if (elapsedTime > 0) {
          callback(elapsedTime)
        }

        if (elapsedTime <= duration) {
          requestAnimationFrame(step)
        } else {
          resolve()
        }
      }
      requestAnimationFrame(step)
    })
  }
}