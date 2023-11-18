import { tileTypes } from '../../Types/TileTypes'
import { DefaultModelTile } from './DefaultTile'
import { BombModelTile } from './BombTile'

export class TileModelFactory {
  static create(type, ...params) {
    switch (type) {
      case tileTypes.DEFAULT:
        return new DefaultModelTile(...params)
      case tileTypes.BOMB:
        return new BombModelTile(...params)
    }
  }
}