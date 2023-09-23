export class Tile {
  constructor(context, x, y, width, height, image) {
    this.context = context
    this.image = image

    this.width = width
    this.height = height
    this.startPosition = {
      x, y
    }
  }

  draw() {
    this.context.drawImage(this.image, this.startPosition.x, this.startPosition.y, this.width, this.height)
  }
}