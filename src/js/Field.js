import { Tile } from './Tile'
import blocks from './blocks'

export class Field {
  constructor(canvas) {
    this.context = canvas.getContext('2d')
    this.images = []
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
    const tile = new Tile(this.context, this.images[0])
    tile.draw()
  }
}