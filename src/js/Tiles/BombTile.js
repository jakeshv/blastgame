import { AbstractTile } from './AbstractTile'
import { tileTypes } from './TileTypes'

export class BombTile extends AbstractTile {
  #color = '#c0c0c0'
  _type = tileTypes.BOMB

  draw(x, y, width, fuseAngle = Math.PI * 1.4) {
    const height = width * this.getAspectRatio()

    this.context.lineWidth = 3
    this.context.fillStyle = this.#color
    this.context.strokeStyle = this.#color

    let circleX = x + width / 2
    let circleY = y + height / 1.5
    let radius = width / 3

    this.context.beginPath()
    this.context.arc(circleX, circleY, radius, 0, 2 * Math.PI)
    this.context.fill()

    let squareWidth = radius / 1.8
    let squareX = circleX - squareWidth / 2
    let squareY = circleY - radius - squareWidth / 3

    this.context.fillRect(squareX, squareY, squareWidth, squareWidth)

    this.fuseRadius = radius / 2
    this.fuseX = circleX + this.fuseRadius
    this.fuseY = squareY

    this.context.beginPath()
    this.context.arc(this.fuseX, this.fuseY, this.fuseRadius, Math.PI, fuseAngle)
    this.context.stroke()
  }

  disappear(delayedStartTime = 0) {
    const maxWidthCoefficient = 2
    const duration = this.getDestroyTime() * 3
    const blastImage = this.getResourceLoader().getBlastTileImage()

    return this.animateByTime((elapsedTime) => {
      elapsedTime = elapsedTime <= delayedStartTime ? 0 : elapsedTime - delayedStartTime
      this.clear()

      const fireDuration = duration / 3
      const blastDuration = (duration - fireDuration) * 0.9

      if (elapsedTime < fireDuration) {
        const fuseAngle = elapsedTime >= fireDuration ? Math.PI : Math.PI * (1.4 - elapsedTime / fireDuration * 0.4)
        this.draw(this.getStartPosition().x, this.getStartPosition().y, this.width, fuseAngle)

        if (elapsedTime > 0) {
          const fireWidth = this.width / 3
          const fuseEndX = this.fuseX + Math.cos(fuseAngle) * this.fuseRadius - fireWidth / 2
          const fuseEndY = this.fuseY + Math.sin(fuseAngle) * this.fuseRadius - fireWidth / 2

          this.context.drawImage(blastImage, fuseEndX, fuseEndY, fireWidth, fireWidth)
        }
      } else if (elapsedTime < fireDuration + blastDuration) {
        const blastTime = elapsedTime - fireDuration
        const stepSize = this.width / blastDuration
        const blastWidth = (elapsedTime >= duration ? 0 : stepSize * blastTime) * maxWidthCoefficient
        const x = this.getStartPosition().x + (this.width - blastWidth) / 2
        const y = this.getStartPosition().y + (this.width - blastWidth) / 2 * this.getAspectRatio()

        this.context.drawImage(blastImage, x, y, blastWidth, blastWidth)
      } else {
        const blastWidth = this.width * maxWidthCoefficient
        const x = this.getStartPosition().x + (this.width - blastWidth) / 2
        const y = this.getStartPosition().y + (this.width - blastWidth) / 2 * this.getAspectRatio()
        this.context.clearRect(x, y, blastWidth, blastWidth * this.getAspectRatio())
      }
    }, duration + delayedStartTime)
  }
}