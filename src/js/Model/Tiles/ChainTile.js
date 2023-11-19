import { AbstractModelTile } from './AbstractTile'
import { tileTypes } from '../../Types/TileTypes'
import { ChainTile } from '../../View/Tiles/ChainTile'
import { TileModelFactory } from './TileFactory'

export class ChainModelTile extends AbstractModelTile {
  _type = tileTypes.CHAIN

  constructor(...params) {
    super()
    this._view = new ChainTile(...params)
  }

  async destroy() {
    await this._view.disappear(this._destroyDelayed)

    const tile = TileModelFactory.create(
      tileTypes.DEFAULT,
      this._view.context,
      this._view.width,
      this._view.image,
      this._view.resourceLoader
    )
    tile.setField(this._field)
    tile.setPosition(this._col, this._row)

    return tile._view.appear(true)
  }

  async click() {
    return 0
  }

  allowClick() {
    return false
  }
}