import { AbstractTile } from './AbstractTile'
import { tileTypes } from '../../Types/TileTypes'

export class DefaultTile extends AbstractTile {
  _type = tileTypes.DEFAULT

  draw(x, y, width) {
    const height = width * this.getAspectRatio()
    this.context.drawImage(this.image, x, y, width, height)
  }
}