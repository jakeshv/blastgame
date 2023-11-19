import { tileTypes } from '../../Types/TileTypes'
import { DefaultTile } from './DefaultTile'

export class ChainTile extends DefaultTile {
  _type = tileTypes.CHAIN

  draw(x, y, width, chainSizePercent = 1) {
    super.draw(x, y, width)
    const sizeCoefficient = 0.85
    const height = width * this.getAspectRatio()
    const chainImage = this.getResourceLoader().getChainTileImage()
    this.context.drawImage(
      chainImage,
      x,
      y,
      width * sizeCoefficient * chainSizePercent,
      height * sizeCoefficient * chainSizePercent
    )
  }

  disappear(delayedStartTime = 0) {
    const duration = this._destroyTime
    return this.animateByTime((elapsedTime) => {
      elapsedTime = elapsedTime <= delayedStartTime ? 0 : elapsedTime - delayedStartTime

      const chainSizePercent = elapsedTime >= duration ? 0 : 1 - elapsedTime / duration

      this.draw(this.getStartPosition().x, this.getStartPosition().y, this.width, chainSizePercent)
    }, duration + delayedStartTime)
  }
}