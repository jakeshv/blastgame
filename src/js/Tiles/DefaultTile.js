import { AbstractTile } from './AbstractTile'

export class DefaultTile extends AbstractTile {
  constructor(type, context, x, y, width, image) {
    super(type, context, x, y, width, image)
  }

  draw(x, y, width) {
    const height = width * this.getAspectRatio()
    this.context.drawImage(this.image, x, y, width, height)
  }
}