import { AbstractModelTile } from './AbstractTile'
import { tileTypes } from '../../Types/TileTypes'
import { DefaultTile } from '../../View/Tiles/DefaultTile'
import fieldConfig from 'configs/field'
import tileConfig from 'configs/tile'

export class DefaultModelTile extends AbstractModelTile {
  _type = tileTypes.DEFAULT

  constructor(...params) {
    super()
    this._view = new DefaultTile(...params)
  }

  collect() {
    const image = this._view.image
    const tiles = []

    let collect = (col, row, delay = 0) => {
      const tile = this._field[col]?.[row]

      if (!tile || tile.checked || tile.getType() !== this._type || tile._view.image !== image) {
        return
      }

      tile.checked = true
      tile._destroyDelayed = delay
      tiles.push(tile)

      let nextDelay = delay + tileConfig.destroyNextDelayed
      collect(col - 1, row, nextDelay)
      collect(col + 1, row, nextDelay)
      collect(col, row - 1, nextDelay)
      collect(col, row + 1, nextDelay)
    }

    collect(this._col, this._row)

    return tiles
  }

  async click() {
    const tiles = this.collect()
    if (tiles.length >= fieldConfig.minTilesToClick) {
      return this.destroyTiles(tiles)
    } else {
      this.clearChecked()
      return 0
    }
  }

  allowClick() {
    const tiles = this.collect()
    this.clearChecked()
    return tiles.length >= fieldConfig.minTilesToClick
  }
}