import { AbstractModelTile } from './AbstractTile'
import { tileTypes } from '../../Types/TileTypes'
import tileConfig from 'configs/tile'
import { ArrowTile } from '../../View/Tiles/ArrowTile'

export class ArrowModelTile extends AbstractModelTile {
  _type = tileTypes.ARROW
  _canBeActivated = true

  constructor(...params) {
    super()
    this._view = new ArrowTile(...params)
  }

  collect() {
    this.checked = true
    let tiles = [this]
    let activeTiles = []

    this._field.forEach((rowElements, col) => {
      const tile = rowElements[this._row]

      if (tile && !tile.checked) {
        tile._destroyDelayed += this._destroyDelayed + Math.abs(col - this._col) * tileConfig.destroyNextDelayed
        tile.checked = true

        if (tile._canBeActivated) {
          activeTiles.push(tile)
        } else {
          tiles.push(tile)
        }
      }
    })

    activeTiles.forEach(tile => {
      tiles = tiles.concat(tile.collect())
    })

    return tiles
  }

  async click() {
    const tiles = this.collect()
    return this.destroyTiles(tiles)
  }

  allowClick() {
    return true
  }
}