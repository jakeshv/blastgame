import { tileTypes } from '../../Types/TileTypes'
import { DefaultModelTile } from './DefaultTile'
import { BombModelTile } from './BombTile'
import { ArrowModelTile } from './ArrowTile'
import { ChainModelTile } from './ChainTile'

export class TileModelFactory {
  static create(type, ...params) {
    switch (type) {
      case tileTypes.DEFAULT:
        return new DefaultModelTile(...params)
      case tileTypes.BOMB:
        return new BombModelTile(...params)
      case tileTypes.ARROW:
        return new ArrowModelTile(...params)
      case tileTypes.CHAIN:
        return new ChainModelTile(...params)
    }
  }
}