import tileConfig from 'configs/tile'

export class ResourceLoader {
  #defaultTileImages = []
  #blastTileImage = null
  #chainTileImage = null

  constructor() {
    this.loaded = false
  }

  async load() {
    const resources = []
    let img

    tileConfig.defaultImages.forEach((image) => {
      img = new Image()
      img.src = image.default
      this.#defaultTileImages.push(img)
      resources.push(new Promise(resolve => {
        img.onload = img.onerror = resolve
      }))
    })

    img = new Image()
    img.src = tileConfig.blastImage.default
    this.#blastTileImage = img
    resources.push(new Promise(resolve => {
      img.onload = img.onerror = resolve
    }))

    img = new Image()
    img.src = tileConfig.chainImage.default
    this.#chainTileImage = img
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

  getChainTileImage() {
    this.checkLoadStatus()
    return this.#chainTileImage
  }
}