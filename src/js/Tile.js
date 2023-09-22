export class Tile {
  constructor(context, image) {
    this.context = context
    this.image = image

    this.width = 60
    this.height = 70
    this.x = 0
    this.y = 0

  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.x + this.width, this.y + this.height)
  }
}