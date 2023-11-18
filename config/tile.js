import * as blue from 'images/blocks/blue.png'
import * as green from 'images/blocks/green.png'
import * as red from 'images/blocks/red.png'
import * as yellow from 'images/blocks/yellow.png'
import * as purple from 'images/blocks/purple.png'
import * as blast from 'images/blast.png'

export default {
  aspectRatio: 1.1,
  appearanceTime: 200,
  destroyTime: 500,
  destroyNextDelayed: 50,
  fallSpeed: 15, // in px per frame
  defaultImages: [blue, green, red, yellow, purple],
  blastImage: blast
}