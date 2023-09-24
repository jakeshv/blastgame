import tileConfig from 'configs/tile'
import fieldConfig from 'configs/field'
import { TileFactory } from './Tiles/TileFactory'
import { tileTypes } from './Tiles/TileTypes'

export class Field {
  #tilesDestroyCallback = () => {}

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
    this.inProcess = false
  }

  onTilesDestroy(callback) {
    this.#tilesDestroyCallback = callback
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
    const tile = TileFactory.create(
      tileTypes.DEFAULT,
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
    const tile = TileFactory.create(
      tileTypes.BOMB,
      this.context,
      col * this.tileWidth,
      row * this.tileHeight,
      this.tileWidth
    )
    this.fieldMap[col][row] = tile
    return tile
  }

  getRandomImage() {
    const random = Math.floor(Math.random() * this.images.length)
    return this.images[random]
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
        countTiles = await this.destroyWithNeighbours(col, row)
        if (countTiles > fieldConfig.tilesForBomb) {
          await this.createBomb(col, row).appear()
        }
        break
      case tileTypes.BOMB:
        countTiles = await this.destroyByRadius(col, row, fieldConfig.bombRadius)
    }

    this.#tilesDestroyCallback(countTiles)
    await this.topUp()

    this.inProcess = false
  }

  async destroyByRadius(centerCol, centerRow, radius) {
    const map = []

    let collect = (centerCol, centerRow, radius) => {
      for (let col = centerCol - radius; col <= centerCol + radius; col++) {
        for (let row = centerRow - radius; row <= centerRow + radius; row++) {
          const tile = this.fieldMap[col]?.[row]

          if (!map[col]) {
            map[col] = []
          }
          if (!tile || map[col][row]) {
            continue
          }
          map[col][row] = true

          if (tile.getType() === tileTypes.BOMB) {
            collect(col, row, fieldConfig.bombRadius)
          }
        }
      }
    }

    collect(centerCol, centerRow, radius)

    return this.destroyByMap(map)
  }

  async destroyWithNeighbours(col, row) {
    const tile = this.fieldMap[col][row]
    const image = tile.image
    const neighbours = []
    let count = 0

    let collect = (col, row) => {
      const tile = this.fieldMap[col]?.[row]
      if (!neighbours[col]) {
        neighbours[col] = []
      }

      if (!tile || neighbours[col][row] || tile.image !== image) {
        return
      }

      neighbours[col][row] = true
      count++

      collect(col - 1, row)
      collect(col + 1, row)
      collect(col, row - 1)
      collect(col, row + 1)
    }

    collect(col, row)

    if (count < this.minTilesToClick) {
      return
    }

    return this.destroyByMap(neighbours)
  }

  destroyByMap(map) {
    let count = 0
    const promises = []

    map.forEach((item, col) => {
      item.forEach((value, row) => {
        const tile = this.fieldMap[col][row]
        promises.push(tile.disappear())
        this.fieldMap[col][row] = null
        count++
      })
    })

    return Promise.all(promises).then(() => {
      return count
    })
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