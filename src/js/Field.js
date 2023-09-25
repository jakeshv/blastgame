import tileConfig from 'configs/tile'
import fieldConfig from 'configs/field'
import { TileFactory } from './Tiles/TileFactory'
import { tileTypes } from './Tiles/TileTypes'

export class Field {
  #listeners = {
    tilesDestroy: () => {
    },
    hasNotAllowAction: () => {
    }
  }
  #tilesCollection = []

  constructor(canvas) {
    this.context = canvas.getContext('2d')
    canvas.addEventListener('click', this.onClick.bind(this))

    // config
    this.numberRows = fieldConfig.numberRows
    this.numberColumns = fieldConfig.numberColumns
    this.width = fieldConfig.width
    this.minTilesToClick = fieldConfig.minTilesToClick

    // computed
    this.images = []
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
      this.#listeners[event](params)
    }
  }

  async init() {
    tileConfig.defaultImages.forEach((image) => {
      let img = new Image()
      img.src = image.default
      this.images.push(img)
    })
    return Promise.all(this.images.map(img => new Promise(resolve => {
      img.onload = img.onerror = resolve
    })))
  }

  fill() {
    for (let col = 0; col < this.numberColumns; col++) {
      this.fieldMap[col] = []
      for (let row = 0; row < this.numberRows; row++) {
        this.createTile(col, row).appear().then()
      }
    }

    if (!this.hasAllowAction()) {
      this.fireEvent('hasNotAllowAction')
    }
  }

  createTile(col, row, type = tileTypes.DEFAULT) {
    const tile = TileFactory.create(
      type,
      this.context,
      col * this.tileWidth,
      row * this.tileHeight,
      this.tileWidth,
      this.getRandomImage()
    )
    this.fieldMap[col][row] = tile
    return tile
  }

  createBomb(col, row) {
    return this.createTile(col, row, tileTypes.BOMB)
  }

  getRandomImage() {
    let length = this.colorNumbers && this.colorNumbers < this.images.length ? this.colorNumbers : this.images.length
    const random = Math.floor(Math.random() * length)
    return this.images[random]
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
    let countTiles = 0
    switch (tile.getType()) {
      case tileTypes.DEFAULT:
        const image = tile.image
        countTiles = this.collectByColor(col, row, image)
        if (countTiles < this.minTilesToClick) {
          this.clearCollection()
          this.inProcess = false
          return
        }
        countTiles = await this.destroyCollection()
        if (countTiles > fieldConfig.tilesForBomb) {
          await this.createBomb(col, row).appear()
        }
        break
      case tileTypes.BOMB:
        this.collectByRadius(col, row, fieldConfig.bombRadius)
        countTiles = await this.destroyCollection()
        break
    }

    this.fireEvent('tilesDestroy', countTiles)
    await this.topUp()

    if (!this.hasAllowAction()) {
      this.fireEvent('hasNotAllowAction')
    }

    this.inProcess = false
  }

  collectByRadius(centerCol, centerRow, radius) {
    for (let col = centerCol - radius; col <= centerCol + radius; col++) {
      for (let row = centerRow - radius; row <= centerRow + radius; row++) {
        const tile = this.fieldMap[col]?.[row]

        if (!this.#tilesCollection[col]) {
          this.#tilesCollection[col] = []
        }
        if (!tile || this.#tilesCollection[col][row]) {
          continue
        }
        this.#tilesCollection[col][row] = true

        if (tile.getType() === tileTypes.BOMB) {
          this.collectByRadius(col, row, fieldConfig.bombRadius)
        }
      }
    }
  }

  collectByColor(col, row, image) {
    let count = 0

    let collect = (col, row) => {
      const tile = this.fieldMap[col]?.[row]
      if (!this.#tilesCollection[col]) {
        this.#tilesCollection[col] = []
      }

      if (!tile || tile.getType() !== tileTypes.DEFAULT || this.#tilesCollection[col][row] || tile.image !== image) {
        return
      }

      this.#tilesCollection[col][row] = true
      count++

      collect(col - 1, row)
      collect(col + 1, row)
      collect(col, row - 1)
      collect(col, row + 1)
    }

    collect(col, row)
    return count
  }

  destroyCollection() {
    let count = 0
    const promises = []

    this.#tilesCollection.forEach((item, col) => {
      item.forEach((value, row) => {
        const tile = this.fieldMap[col][row]
        promises.push(tile.disappear())
        this.fieldMap[col][row] = null
        count++
      })
    })
    this.clearCollection()

    return Promise.all(promises).then(() => {
      return count
    })
  }

  clearCollection() {
    this.#tilesCollection = []
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
          this.fieldMap[col][row] = null
          this.fieldMap[col][targetRow] = tile
          tile.setTargetPosition(col * this.tileWidth, targetRow * this.tileHeight)
          targets.push(row)
          fallPromises.push(tile.fall())
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
        switch (tile.getType()) {
          case tileTypes.DEFAULT:
            const image = tile.image
            const countTiles = this.collectByColor(col, row, image)
            if (countTiles > this.minTilesToClick) {
              this.clearCollection()
              return true
            }
            break
          case tileTypes.BOMB:
            this.clearCollection()
            return true
        }
      }
    }
    this.clearCollection()
    return false
  }
}