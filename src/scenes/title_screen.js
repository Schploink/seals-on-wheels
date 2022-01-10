import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import sealImg from '../assets/Sealonwheels.png';
import halfPipe from '../assets/79-skate-or-die-dos-screenshot-half-pipe-stunts.png'

export default class MyGame extends Phaser.Scene
{
    constructor () {
        super({key: 'titleScreen'});
    }

    preload() {
        // game.scale.pageAlignHorizontally = true;
        // game.scale.pageAlignVertically = true;
        // game.scale.refresh();
        this.load.image('seal', sealImg);
        this.load.image('logo', logoImg);
        this.load.image('halfpipe', halfPipe)
    }

    create() {
      // const halfPipe = this.add.image(500, 375, 'halfpipe')
      // halfPipe.scale = 2.5

      let startButton
      startButton = this.add.text(500, 350, 'Start game')
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#FF00FF' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.switch('gameScene'))
        .on('pointerover', () => startButton.setStyle({ fill: '#00FF00' }))
        .on('pointerout', () => startButton.setStyle({ fill: '#FFF' }))


    let score = 0
    let scoreText
    scoreText = this.add.text(16, 16, 'Score: 0', { fontFamily: "spray", fontSize: '32px', fill: '#FFFFFF'})
    // passes remaining
    let passes = 5
    let passText
    passText = this.add.text(16, 50, 'Remaining Passes: 5', { fontFamily: "spray", fontSize: '32px', fill: '#FFFFFF'})
    // timer variables
    let timer = 3
    let timerText = this.add.text(16, 84, 'Timer: 3s', { fontFamily: "spray", fontSize: '32px', fill: '#FFFFFF'})
    // match input area
    let instructionText = this.add.text(200, 650, "In the box below, type the word that appears in the top right", {fontFamily: "spray", fontSize: "24px"})
    // matched word area
    let matchTextInstruction = this.add.text(550, 50, "match the word that appears here", {fontFamily: "spray", fontSize: "28px"})
    let introTextInstruction = this.add.text(400, 20, "when Seal reaches an edge, you have 3 seconds to", {fontFamily: "spray", fontSize: "28px"})
    let matchWord = this.add.text(650, 50, "", {fontFamily: "spray", fontSize: "52px"})
      // clickButton() {
      //   this.scene.switch('gameScene')
      // }

    let introText = this.add.text(65, 400, "Rad, Homie, you're about to", {fontFamily: "spray", fontSize: "78px", fill: "#00FF00"})
    let introMoreText = this.add.text(165, 475, "play Seals on Wheels!", {fontFamily: "spray", fontSize: "78px", fill: "#FF00FF"})
    }

  }