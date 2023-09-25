import tileConfig from 'configs/tile'

const ABSTRACT_METHOD_ERROR = 'Метод должен быть определен в наследуемом классе'

export class AbstractTile {
  _type = 'abstract'
  _appearanceTime = tileConfig.appearanceTime
  _destroyTime = tileConfig.destroyTime

  #targetPosition = {}
  #startPosition = {}
  #aspectRatio = tileConfig.aspectRatio
  #resourceLoader = null

  constructor(context, x, y, width, image, resourceLoader) {
    this.#resourceLoader = resourceLoader
    this.context = context
    this.image = image

    this.width = width
    this.#startPosition = {
      x, y
    }
  }

  getAspectRatio() {
    return this.#aspectRatio
  }

  getType() {
    return this._type
  }

  getDestroyTime() {
    return this._destroyTime
  }

  getStartPosition() {
    return this.#startPosition
  }

  getResourceLoader() {
    return this.#resourceLoader
  }

  draw(x, y, width) {
    throw Error(ABSTRACT_METHOD_ERROR)
  }

  appear() {
    const duration = this._appearanceTime
    return this.animateByTime((elapsedTime) => {
      this.clear()

      const stepSize = this.width / duration
      const width = elapsedTime >= duration ? this.width : stepSize * elapsedTime
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

      let step = () => {
        this.clear()

        const stepSize = tileConfig.fallSpeed
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
    this.context.clearRect(this.#startPosition.x, this.#startPosition.y, this.width, this.width * this.#aspectRatio)
  }

  disappear(delayedStartTime = 0) {
    const duration = this._destroyTime
    return this.animateByTime((elapsedTime) => {
      elapsedTime = elapsedTime <= delayedStartTime ? 0 : elapsedTime - delayedStartTime
      this.clear()

      const stepSize = this.width / duration
      const width = elapsedTime >= duration ? 0 : this.width - stepSize * elapsedTime
      const x = this.#startPosition.x + (this.width - width) / 2
      const y = this.#startPosition.y + (this.width - width) / 2 * this.#aspectRatio

      this.draw(x, y, width)
    }, duration + delayedStartTime)
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