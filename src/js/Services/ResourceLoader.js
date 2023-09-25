import tileConfig from 'configs/tile'

export class ResourceLoader {
  #defaultTileImages = []
  #blastTileImage = null

  constructor() {
    this.loaded = false
  }

  async load() {
    const resources = []
    tileConfig.defaultImages.forEach((image) => {
      let img = new Image()
      img.src = image.default
      this.#defaultTileImages.push(img)
      resources.push(new Promise(resolve => {
        img.onload = img.onerror = resolve
      }))
    })

    let img = new Image()
    img.src = tileConfig.blastImage.default
    this.#blastTileImage = img
    resources.push(new Promise(resolve => {
      img.onload = img.onerror = resolve
    }))

    return Promise.all(resources).then(() => {
      this.loaded = true
    })
  }

  checkLoadStatus() {
    if (!this.loaded) {
      throw new Error('Resources has not loaded')
    }
  }

  getDefaultTileImages() {
    this.checkLoadStatus()
    return this.#defaultTileImages
  }

  getBlastTileImage() {
    this.checkLoadStatus()
    return this.#blastTileImage
  }
}