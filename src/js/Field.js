import { Tile } from './Tile'
import tileConfig from 'configs/tile'
import fieldConfig from 'configs/field'

export class Field {
  constructor(canvas) {
    this.context = canvas.getContext('2d')

    // config
    this.numberRows = fieldConfig.numberRows
    this.numberColumns = fieldConfig.numberColumns
    this.width = fieldConfig.width

    // computed
    this.images = []
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
      for (let row = 0; row < this.numberRows; row++) {
        let x = col * this.tileWidth
        let y = row * this.tileHeight
        const tile = new Tile(this.context, x, y, this.tileWidth, this.getRandomImage())
        tile.appear().then(() => tile.fallTo(500))
      }
    }
  }

  getRandomImage() {
    const random = Math.floor(Math.random() * this.images.length)
    return this.images[random]
  }
}