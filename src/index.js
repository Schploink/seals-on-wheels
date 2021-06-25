import Phaser from 'phaser';
import MyGame from './scenes/my_game'
// import config from './config/config'


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);
