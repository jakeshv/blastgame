import 'styles/main.scss'

import { Game } from './js/Model/Game'
import { ResourceLoader } from './js/Services/ResourceLoader'

const resourceLoader = new ResourceLoader()
await resourceLoader.load()

const gameField = new Game(resourceLoader)
gameField.init()
