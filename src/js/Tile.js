import tileConfig from 'configs/tile'

export class Tile {
  constructor(context, x, y, width, image) {
    this.context = context
    this.image = image
    this.appearanceTime = tileConfig.appearanceTime
    this.aspectRatio = tileConfig.aspectRatio

    this.width = width
    this.height = width * this.aspectRatio
    this.startPosition = {
      x, y
    }
  }

  draw(x, y, width) {
    const height = width * this.aspectRatio
    this.context.drawImage(this.image, x, y, width, height)
  }

  appear(callback) {
    let start = performance.now()

    let step = timestamp => {
      let elapsedTime = timestamp - start
      this.clear()

      const stepSize = this.width / this.appearanceTime
      const width = elapsedTime >= this.appearanceTime ? this.width : stepSize * elapsedTime
      const x = this.startPosition.x + (this.width - width) / 2
      const y = this.startPosition.y + (this.width - width) / 2 * this.aspectRatio

      this.draw(x, y, width)

      if (elapsedTime < this.appearanceTime) {
        requestAnimationFrame(step)
      } else if (callback) {
        callback()
      }
    }

    requestAnimationFrame(step)
  }

  clear() {
    this.context.clearRect(this.startPosition.x, this.startPosition.y, this.width, this.height)
  }
}