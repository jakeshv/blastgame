import { AbstractModelTile } from './AbstractTile'
import { tileTypes } from '../../Types/TileTypes'
import { BombTile } from '../../View/Tiles/BombTile'
import fieldConfig from 'configs/field'
import tileConfig from 'configs/tile'

export class BombModelTile extends AbstractModelTile {
  _type = tileTypes.BOMB
  _canBeActivated = true

  constructor(...params) {
    super()
    this._view = new BombTile(...params)
  }

  collect() {
    this.checked = true
    let tiles = [this]
    let activeTiles = []
    let radius = fieldConfig.bombRadius
    let baseDelayed = this._view.getDestroyTime() + this._destroyDelayed

    for (let col = this._col - radius; col <= this._col + radius; col++) {
      if (!this._field[col]) {
        continue
      }
      for (let row = this._row - radius; row <= this._row + radius; row++) {
        const tile = this._field[col][row]

        if (!tile || tile.checked) {
          continue
        }

        tile._destroyDelayed += baseDelayed +
          Math.max(Math.abs(col - this._col), Math.abs(row - this._row)) * tileConfig.destroyNextDelayed

        if (tile._canBeActivated) {
          activeTiles.push(tile)
        } else {
          tile.checked = true
          tiles.push(tile)
        }
      }
    }
    activeTiles.forEach(tile => {
      tiles = tiles.concat(tile.collect())
    })

    return tiles
  }

  async click() {
    const tiles = this.collect()
    const promises = []
    tiles.forEach(tile => {
      promises.push(tile.destroy())
    })
    return Promise.all(promises).then(() => {
      return tiles.length
    })
  }

  allowClick() {
    return true
  }
}