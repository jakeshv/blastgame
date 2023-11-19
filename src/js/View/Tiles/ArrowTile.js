import { AbstractTile } from './AbstractTile'
import { tileTypes } from '../../Types/TileTypes'

export class ArrowTile extends AbstractTile {
  #fillColor = 'aqua'
  #strokeColor = 'blue'
  _type = tileTypes.ARROW

  draw(x, y, width, shift = 0) {
    const height = width * this.getAspectRatio()

    this.context.lineWidth = 1
    this.context.fillStyle = this.#fillColor
    this.context.strokeStyle = this.#strokeColor

    this.drawRight(x, y, width, height, shift)
    this.drawLeft(x, y, width, height, shift)
  }

  drawRight(x, y, width, height, shift) {
    let paddingX = width / 10

    let x1 = x + paddingX - shift
    let x2 = x + width / 2 - paddingX * 2 - shift
    let x3 = x + width / 2 - shift

    this.drawHalfBlock(y, x1, x2, x3, height)
  }

  drawLeft(x, y, width, height, shift) {
    let paddingX = width / 10

    let x1 = x + width - paddingX + shift
    let x2 = x + width - width / 2 + paddingX * 2 + shift
    let x3 = x + width / 2 + shift

    this.drawHalfBlock(y, x1, x2, x3, height)
  }

  drawHalfBlock(y, x1, x2, x3, height) {
    let paddingY = height / 8

    let y1 = y + height / 2
    let y2 = y + paddingY * 2
    let y3 = y2 + paddingY
    let y4 = y3 + paddingY * 2
    let y5 = y4 + paddingY

    this.context.beginPath()
    this.context.moveTo(x1, y1)
    this.context.lineTo(x2, y2)
    this.context.lineTo(x2, y3)
    this.context.lineTo(x3, y3)
    this.context.lineTo(x3, y4)
    this.context.lineTo(x2, y4)
    this.context.lineTo(x2, y5)
    this.context.stroke()
    this.context.fill()
    this.context.closePath()
  }

  disappear(delayedStartTime = 0) {
    const duration = this.getDestroyTime()

    return this.animateByTime((elapsedTime) => {
      elapsedTime = elapsedTime <= delayedStartTime ? 0 : elapsedTime - delayedStartTime
      let shift = this.width * 3 / duration * elapsedTime

      this.clear(shift)

      if (elapsedTime < duration) {
        this.draw(this.getStartPosition().x, this.getStartPosition().y, this.width, shift)
      }
    }, duration + delayedStartTime)
  }

  clear(shift = 0) {
    this.context.clearRect(
      this.getStartPosition().x - shift,
      this.getStartPosition().y,
      this.width + 2 * shift,
      this.width * this.getAspectRatio()
    )
  }

  reDrawOnHover(width) {
    this.clear()
    let shift = (this.width - width) / 2
    this.draw(this.getStartPosition().x, this.getStartPosition().y, this.width, shift)
  }
}