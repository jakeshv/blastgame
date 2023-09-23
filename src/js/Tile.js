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

  appear() {
    return new Promise(resolve => {
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
        } else {
          resolve()
        }
      }

      requestAnimationFrame(step)
    })
  }

  fallTo(target) {
    if (target < this.startPosition.y) {
      return
    }
    let start = performance.now()

    let step = timestamp => {
      //let elapsedTime = timestamp - start
      this.clear()

      const stepSize = 10
      this.startPosition.y += stepSize
      if (this.startPosition.y > target) {
        this.startPosition.y = target
      }

      this.draw(this.startPosition.x, this.startPosition.y, this.width)

      if (this.startPosition.y < target) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }

  clear() {
    this.context.clearRect(this.startPosition.x, this.startPosition.y, this.width, this.height)
  }
}