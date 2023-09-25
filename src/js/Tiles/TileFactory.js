import { tileTypes } from './TileTypes'
import { DefaultTile } from './DefaultTile'
import { BombTile } from './BombTile'

export class TileFactory {
  static create(type, ...params) {
    switch (type) {
      case tileTypes.DEFAULT:
        return new DefaultTile(...params)
      case tileTypes.BOMB:
        return new BombTile(...params)
    }
  }
}