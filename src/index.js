import 'styles/main.scss'

import { Field } from './js/Field'

const canvas = document.getElementById('game-field')
const gameField = new Field(canvas)
gameField.init()
