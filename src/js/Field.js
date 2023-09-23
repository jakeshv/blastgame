import { Tile } from './Tile'
import tileConfig from 'configs/tile'
import fieldConfig from 'configs/field'

export class Field {
  constructor(canvas, minTilesToClick = 1) {
    this.context = canvas.getContext('2d')
    canvas.addEventListener('click', this.onClick.bind(this))

    // config
    this.numberRows = fieldConfig.numberRows
    this.numberColumns = fieldConfig.numberColumns
    this.width = fieldConfig.width
    this.minTilesToClick = minTilesToClick

    // computed
    this.images = []
    this.fieldMap = []
    this.tileWidth = this.width / this.numberColumns
    this.tileHeight = this.tileWidth * tileConfig.aspectRatio
  }

  init() {
    tileConfig.defaultImages.forEach((image) => {
      let img = new Image()
      img.src = image.default
      this.images.push(img)
    })
    Promise.all(this.images.map(img => new Promise(resolve => {
      img.onload = img.onerror = resolve
    }))).then(() => {
      this.fill()
    })
  }

  fill() {
    for (let col = 0; col < this.numberColumns; col++) {
      this.fieldMap[col] = []
      for (let row = 0; row < this.numberRows; row++) {
        this.createTile(col, row).appear().then()
      }
    }
  }

  createTile(col, row) {
    const tile = new Tile(
      this.context,
      col * this.tileWidth,
      row * this.tileHeight,
      this.tileWidth,
      this.getRandomImage()
    )
    this.fieldMap[col][row] = tile
    return tile
  }

  getRandomImage() {
    const random = Math.floor(Math.random() * this.images.length)
    return this.images[random]
  }

  async onClick(e) {
    const col = Math.floor(e.offsetX / this.tileWidth)
    const row = Math.floor(e.offsetY / this.tileHeight)

    await this.destroyWithNeighbours(col, row)
    await this.topUp()
  }

  async destroyWithNeighbours(col, row) {
    const tile = this.fieldMap[col][row]
    const image = tile.image
    const neighbours = []
    let count = 0

    let check = (col, row) => {
      const tile = this.fieldMap[col]?.[row]
      if (!neighbours[col]) {
        neighbours[col] = []
      }

      if (!tile || neighbours[col][row] || tile.image !== image) {
        return
      }

      neighbours[col][row] = true
      count++

      check(col - 1, row)
      check(col + 1, row)
      check(col, row - 1)
      check(col, row + 1)
    }

    check(col, row)

    if (count < this.minTilesToClick) {
      return
    }

    const promises = []

    neighbours.forEach((item, col) => {
      item.forEach((value, row) => {
        const tile = this.fieldMap[col][row]
        promises.push(tile.disappear())
        this.fieldMap[col][row] = null
      })
    })

    await Promise.all(promises)
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
}