import { Tile } from './Tile'
import tileConfig from 'configs/tile'
import fieldConfig from 'configs/field'

export class Field {
  constructor(canvas) {
    this.context = canvas.getContext('2d')
    canvas.addEventListener('click', this.onClick.bind(this))

    // config
    this.numberRows = fieldConfig.numberRows
    this.numberColumns = fieldConfig.numberColumns
    this.width = fieldConfig.width

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
        let x = col * this.tileWidth
        let y = row * this.tileHeight
        const tile = new Tile(this.context, x, y, this.tileWidth, this.getRandomImage())
        this.fieldMap[col][row] = tile
        tile.appear().then()
      }
    }
  }

  getRandomImage() {
    const random = Math.floor(Math.random() * this.images.length)
    return this.images[random]
  }

  onClick(e) {
    const col = Math.floor(e.offsetX / this.tileWidth)
    const row = Math.floor(e.offsetY / this.tileHeight)
    const tile = this.fieldMap[col][row]
    tile.destroy()
  }
}