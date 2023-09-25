import { AbstractTile } from './AbstractTile'

export class BombTile extends AbstractTile {
  #color = '#c0c0c0'

  constructor(type, context, x, y, width, image = null) {
    super(type, context, x, y, width, image)
  }

  draw(x, y, width) {
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

    let fuseRadius = radius / 2
    let fuseX = circleX + fuseRadius
    let fuseY = squareY

    this.context.beginPath()
    this.context.arc(fuseX, fuseY, fuseRadius, Math.PI,  Math.PI * 1.4)
    this.context.stroke()
  }
}