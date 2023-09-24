import { tileTypes } from './TileTypes'
import { DefaultTile } from './DefaultTile'
import { BombTile } from './BombTile'

export class TileFactory {
  static create(type, context, x, y, width, image = null) {
    switch (type) {
      case tileTypes.DEFAULT:
        return new DefaultTile(type, context, x, y, width, image)
      case tileTypes.BOMB:
        return new BombTile(type, context, x, y, width, image)
    }
  }
}