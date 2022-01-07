import Phaser from 'phaser';
import MyGame from './scenes/my_game.js'
import TitleScreen from './scenes/title_screen.js'
// import config from './config/config'

let gameScene = new MyGame()
let titleScreen = new TitleScreen()

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1000,
    height: 750,
    // scene: MyGame
};

const game = new Phaser.Game(config);

game.scene.add('titleScreen', titleScreen)
game.scene.add('game', gameScene)


game.scene.start('titleScreen')
