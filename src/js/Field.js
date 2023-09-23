import { Tile } from './Tile'
import blocks from './blocks'

export class Field {
  constructor(canvas) {
    this.context = canvas.getContext('2d')

    // config
    this.numberRows = 8
    this.numberColumns = 8
    this.width = 540
    this.height = 600

    // computed
    this.images = []
    this.tileWidth = this.width / this.numberColumns
    this.tileHeight = this.height / this.numberRows
  }

  init() {
    blocks.forEach((block) => {
      let img = new Image()
      img.src = block.default
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
        const tile = new Tile(this.context, x, y, this.tileWidth, this.tileHeight, this.getRandomImage())
        tile.draw()
      }
    }
  }

  getRandomImage() {
    const random = Math.floor(Math.random() * this.images.length)
    return this.images[random]
  }
}