import tileConfig from 'configs/tile'
import fieldConfig from 'configs/field'
import { tileTypes } from '../Types/TileTypes'
import { TileModelFactory } from './Tiles/TileFactory'

export class Field {
  #listeners = {
    tilesDestroy: () => {
    },
    hasNotAllowAction: () => {
    }
  }

  constructor(canvas, resourceLoader) {
    this.resourceLoader = resourceLoader
    this.context = canvas.getContext('2d')
    canvas.addEventListener('click', this.onClick.bind(this))

    // config
    this.numberRows = fieldConfig.numberRows
    this.numberColumns = fieldConfig.numberColumns
    this.width = fieldConfig.width

    // computed
    this.fieldMap = []
    this.tileWidth = this.width / this.numberColumns
    this.tileHeight = this.tileWidth * tileConfig.aspectRatio
    this.height = this.tileHeight * this.numberRows
    this.inProcess = false

    canvas.height = this.height
  }

  addEventListener(event, callback) {
    if (this.#listeners.hasOwnProperty(event)) {
      this.#listeners[event] = callback
    }
  }

  fireEvent(event, ...params) {
    if (this.#listeners.hasOwnProperty(event) && typeof this.#listeners[event] === 'function') {
      this.#listeners[event](...params)
    }
  }

  fill() {
    for (let col = 0; col < this.numberColumns; col++) {
      this.fieldMap[col] = []
      for (let row = 0; row < this.numberRows; row++) {
        this.createTile(col, row).appear()
      }
    }

    if (!this.hasAllowAction()) {
      this.fireEvent('hasNotAllowAction')
    }
  }

  createTile(col, row, type = tileTypes.DEFAULT) {
    const tile = TileModelFactory.create(
      type,
      this.context,
      this.tileWidth,
      this.getRandomImage(),
      this.resourceLoader
    )
    tile.setField(this.fieldMap)
    tile.setPosition(col, row)
    return tile
  }

  getRandomImage() {
    const images = this.resourceLoader.getDefaultTileImages()
    let length = this.colorNumbers && this.colorNumbers < images.length ? this.colorNumbers : images.length
    const random = Math.floor(Math.random() * length)
    return images[random]
  }

  setColorNumbers(colorNumbers) {
    this.colorNumbers = colorNumbers
  }

  async onClick(e) {
    if (this.inProcess) {
      return
    }
    this.inProcess = true

    const col = Math.floor(e.offsetX / this.tileWidth)
    const row = Math.floor(e.offsetY / this.tileHeight)

    const tile = this.fieldMap[col][row]

    let countTiles = await tile.click(col, row)

    if (countTiles) {
      if (tile.getType() === tileTypes.DEFAULT) {
        if (countTiles >= fieldConfig.tilesForBomb) {
          await this.createTile(col, row, tileTypes.BOMB).appear()
        }
      }

      this.fireEvent('tilesDestroy', countTiles)
      await this.topUp()

      if (!this.hasAllowAction()) {
        this.fireEvent('hasNotAllowAction')
      }
    }

    this.inProcess = false
  }

  async topUp() {
    let fallPromises = []
    let createdTiles = []
    for (let col = 0; col < this.numberColumns; col++) {
      let targets = []
      for (let row = this.numberRows - 1; row >= 0; row--) {
        const tile = this.fieldMap[col][row]
        if (!tile) {
          targets.push(row)
        } else if (targets.length) {
          const targetRow = targets.shift()
          targets.push(row)
          fallPromises.push(tile.fallToPosition(col, targetRow))
        }
      }
      targets.map((targetRow) => {
        createdTiles.push(this.createTile(col, targetRow))
      })
    }
    await Promise.all(fallPromises)
    await Promise.all(createdTiles.map(tile => tile.appear()))
  }

  hasAllowAction() {
    for (let col = 0; col < this.numberColumns; col++) {
      for (let row = 0; row < this.numberRows; row++) {
        const tile = this.fieldMap[col][row]
        if (tile.allowClick()) {
          return true
        }
      }
    }
    return false
  }
}