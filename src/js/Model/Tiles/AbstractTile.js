import { errorTypes } from '../../Types/ErrorTypes'

export class AbstractModelTile {
  _type = null
  _view = null
  _field = null
  _col = null
  _row = null
  _canBeActivated = false
  _destroyDelayed = 0

  checked = false

  constructor() {}

  setField(field) {
    this._field = field
  }

  setPosition(col, row) {
    this._addToField(col, row)
    this._view.setStartPosition(...this._getCoordinates())
  }

  fallToPosition(col, row) {
    this._removeFromField()
    this._addToField(col, row)
    this._view.setTargetPosition(...this._getCoordinates())
    return this._view.fall()
  }

  _addToField(col, row) {
    this._col = col
    this._row = row
    this._field[col][row] = this
  }

  _getCoordinates() {
    return [this._col * this._view.width, this._row * this._view.width * this._view.getAspectRatio()]
  }

  _removeFromField() {
    this._field[this._col][this._row] = null
  }

  clearChecked() {
    this._field.forEach(col => col.forEach((tile) => {
      tile.checked = false
    }))
  }

  getType() {
    return this._type
  }

  appear() {
    return this._view.appear()
  }

  async destroyTiles(tiles) {
    const promises = []
    tiles.forEach(tile => {
      promises.push(tile.destroy())
    })
    return Promise.all(promises).then(() => {
      return tiles.length
    })
  }

  destroy() {
    this._removeFromField()
    return this._view.disappear(this._destroyDelayed)
  }

  collect() {
    throw Error(errorTypes.ABSTRACT_METHOD_ERROR)
  }

  click() {
    throw Error(errorTypes.ABSTRACT_METHOD_ERROR)
  }

  allowClick() {
    throw Error(errorTypes.ABSTRACT_METHOD_ERROR)
  }
}