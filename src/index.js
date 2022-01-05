// import Phaser from 'phaser';
import MyGame from './scenes/my_game.js'
// import config from './config/config'

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1000,
    height: 750,
    scene: MyGame
};

const game = new Phaser.Game(config);
