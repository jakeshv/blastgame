import { AbstractTile } from './AbstractTile'

export class BombTile extends AbstractTile {
  constructor(type, context, x, y, width, image = null) {
    super(type, context, x, y, width, image)
  }

  draw(x, y, width) {
    const height = width * this.getAspectRatio()

    let currX = x + width / 2
    let currY = y + height / 2

    this.context.beginPath()
    this.context.fillStyle = 'black'
    this.context.arc(currX, currY, width / 3, 0, 2 * Math.PI)
    this.context.fill()
  }
}