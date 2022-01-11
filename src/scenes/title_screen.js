import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import sealImg from '../assets/Sealonwheels.png';
import halfPipe from '../assets/79-skate-or-die-dos-screenshot-half-pipe-stunts.png'
import linkedin from '../assets/linkedin.png'
import github from '../assets/github.png'
import angellist from '../assets/angellist.png'

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
        this.load.image('linkedin', linkedin)
        this.load.image('angellist', angellist)
        this.load.image('github', github)
    }

    create() {
      // const halfPipe = this.add.image(500, 375, 'halfpipe')
      // halfPipe.scale = 2.5

      const seal = this.add.image(500, 200, 'seal')

      let startButton
      startButton = this.add.text(500, 525, 'Start game', {fontSize: '30px'})
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#FF00FF' })
        .setInteractive({ useHandCursor: true })
        .on('pointerup', () => this.scene.switch('gameScene'))
        .on('pointerover', () => startButton.setStyle({ fill: '#00FF00' }))
        .on('pointerout', () => startButton.setStyle({ fill: '#FFF' }))

      const back = this.add.rectangle(100, 50, 250, 60, 0xFF00FF)
      const gitHub = this.add.image(50, 50, 'github')
      gitHub.scale = 0.1
      gitHub.setInteractive({ useHandCursor: true})
      gitHub.on('pointerdown', () => {
        window.open('https://github.com/Schploink/seals-on-wheels', "_blank")
      })
      const linkedIn = this.add.image(170, 50, 'linkedin')
      linkedIn.scale = 0.1
      linkedIn.setInteractive({ useHandCursor: true})
      linkedIn.on('pointerdown', () => {
        window.open('https://www.linkedin.com/in/kevin-oconnor-933561216/', "_blank")
      })
      const angelList = this.add.image(110, 50, 'angellist')
      angelList.scale = 0.057
      angelList.setInteractive({ useHandCursor: true})
      angelList.on('pointerdown', () => {
        window.open('https://angel.co/u/kevin-oconnor-7', "_blank")
      })


    let score = 0
    let scoreText
    // scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFFFFF'})
    // passes remaining
    let passes = 5
    let passText
    // passText = this.add.text(16, 50, 'Remaining Passes: 5', { fontSize: '32px', fill: '#FFFFFF'})
    // timer variables
    let timer = 3
    // let timerText = this.add.text(16, 84, 'Timer: 3s', { fontSize: '32px', fill: '#FFFFFF'})
    // match input area
    let instructionText = this.add.text(70, 650, "In the box below, type the word that appears in the top right", {fontSize: "24px"})
    // matched word area
    let matchTextInstruction = this.add.text(500, 50, "match the word that appears here", {fontSize: "22px"})
    let introTextInstruction = this.add.text(400, 20, "when Seal reaches an edge, you have 3 seconds to", {fontSize: "20px"})
    let matchWord = this.add.text(650, 50, "", {fontSize: "50px"})
      // clickButton() {
      //   this.scene.switch('gameScene')
      // }

    let introText = this.add.text(95, 350, "Rad, Homie, you're about to play", {fontSize: "42px", fill: "#00FF00"})
    let introMoreText = this.add.text(175, 400, "Seals on Wheels!", {fontSize: "68px", fill: "#FF00FF"})
    }

  }