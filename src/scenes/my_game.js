import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import sealImg from '../assets/Sealonwheels.png';
import halfPipe from '../assets/79-skate-or-die-dos-screenshot-half-pipe-stunts.png'


export default class MyGame extends Phaser.Scene
{
    constructor () {
        super();
    }
    
    preload () {
        this.load.image('seal', sealImg);
        this.load.image('logo', logoImg);
        this.load.image('halfpipe', halfPipe)
    }   

    
    

    create () {
    var points = [];

    const halfPipe = this.add.image(500, 375, 'halfpipe')
    halfPipe.scale = 2.5
    
    // points.push(new Phaser.Math.Vector2(200, 150));
    points.push(new Phaser.Math.Vector2(200, 250));
    points.push(new Phaser.Math.Vector2(250, 425));
    points.push(new Phaser.Math.Vector2(500, 500));
    points.push(new Phaser.Math.Vector2(750, 425));
    points.push(new Phaser.Math.Vector2(800, 250));
    // points.push(new Phaser.Math.Vector2(600, 150));

    var curve = new Phaser.Curves.Spline(points);

    var graphics = this.add.graphics();
    
    for (var i = 0; i < points.length; i++)
    {
        graphics.fillCircle(points[i].x, points[i].y, 4);
    }

    // Display path curve 

    // graphics.lineStyle(1, 0xffffff, 1);

    // curve.draw(graphics, 64);

    // graphics.fillStyle(0x00ff00, 1);

    let words = [ "thing", "pizza", "hecks", "signs", "candy", "loops", "spout", "fishes",
        "havok", "radical", "bogus", "tubular", "bodacious", "rightous", "skater", "awesome",
        "cowabunga", "hella", "indie", "skate", "seals", "roundboi", "fishes", "beaches",
        "seagull", "bingo", "hang ten", "skate or die", "sk8rseal", "seals rule"]

    let seal = this.add.follower(curve, 200, 250, 'seal');
    seal.scale = 0.3


    let trickSealRight = this.add.follower(curve, 800, 250, 'seal');
    trickSealRight.scale = 0.3
    trickSealRight.rotation = Math.PI/2
    trickSealRight.toggleFlipY()
    trickSealRight.toggleFlipX()
    trickSealRight.visible = false

    let trickSealLeft = this.add.follower(curve, 200, 250, 'seal');
    trickSealLeft.scale = 0.3
    trickSealLeft.rotation = Math.PI/2
    // trickSealLeft.toggleFlipY()
    trickSealLeft.toggleFlipX()
    trickSealLeft.visible = false

    let startButton
    startButton = this.add.text(100, 100, 'Start game')
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#111' })
        .setInteractive({ useHandCursor: true })
        // .on('pointerdown', gameOver())
        .on('pointerover', () => startButton.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => startButton.setStyle({ fill: '#FFF' }))

    seal.startFollow({
        duration: 2000,
        yoyo: true,
        ease: "Sine.easeInOut",
        repeat: 4,
        onYoyo: doYoyoTrick,
        onRepeat: doYoyoTrick,
        rotateToPath: true
    });

    // trickSealRight.startFollow({
    //     duration: 2000,
    //     yoyo: true,
    //     // onYoyo: flip,
    //     repeat: -1,
    //     onYoyo: doYoyoTrick,
    //     onRepeat: doYoyoTrick,
    //     rotateToPath: true
    // });

    let tweenBounce = this.tweens.add({
        targets: [ trickSealRight, trickSealLeft ],
        scale: 2,
        duration: 750,
        ease: 'Power2',
        yoyo: true,
        repeat: true,
        paused: true
    });


    
    function doYoyoTrick() {
        
        seal.rotation += Math.PI
        seal.toggleFlipY()
        seal.pauseFollow()
        beginTrick()
    }
    
    // score info
    let score = 0
    let scoreText
    scoreText = this.add.text(16, 16, 'Score: 0', { fontFamily: "spray", fontSize: '32px', fill: '#FFFFFF'})
    // passes remaining
    let passes = 6
    let passText
    passText = this.add.text(16, 50, 'Remaining Passes: 6', { fontFamily: "spray", fontSize: '32px', fill: '#FFFFFF'})
    // timer variables
    let timer = 3
    let timerText = this.add.text(16, 84, 'Timer: 3s', { fontFamily: "spray", fontSize: '32px', fill: '#FFFFFF'})
    // match input area
    let instructionText = this.add.text(250, 650, "Type the word that appears in the top right below", {fontFamily: "spray", fontSize: "24px"})
    // matched word area
    let matchTextInstruction = this.add.text(550, 50, "match the word that appears here", {fontFamily: "spray", fontSize: "28px"})
    let matchWord = this.add.text(650, 50, "", {fontFamily: "spray", fontSize: "52px"})
    let matchText

    let trick
    let failText = this.add.text(165, 375, "", {fontFamily: "spray", fontSize: "184px", fill: "#FF0000"})
    let yesText = this.add.text(285, 375, "", {fontFamily: "spray", fontSize: "184px", fill: "#FF00FF"})
    let gameOverText = this.add.text(30, 375, "", {fontFamily: "spray", fontSize: "184px", fill: "#00FF00"})
    let timeCounter
    let insertedText

    function getWord() {
        return words[Math.floor(Math.random() * words.length)]
    }
    
    function addMatchWord() {
        matchTextInstruction.setText( "" )
        matchText = getWord()
        matchWord.setText( matchText )
    }

    function afterTrick() {
        matchTextInstruction.setText( "match the word that appears here" )
    }
    
    function updateScore() {
        score++
        scoreText.setText('Score: ' + score)
    }

    function countDown() {
        timer--
        timerText.setText('Timer: ' + timer + "s")
    }

    function timerReset() {
        timer = 3
        timerText.setText('Timer: ' + timer + "s")
        clearInterval(timeCounter)
    }

    function updatePasses() {
        passes -= 1
        passText.setText('Remaining Passes: ' + passes)
    }

    function resumeSeal() {
        seal.visible = true
        seal.resumeFollow();
    }

    function resumeSealRight() {
        trickSealRight.visible = false
        resumeSeal()
    }

    function resumeSealLeft() {
        trickSealLeft.visible = false
        resumeSeal()
    }

    function resumeAll() {
        if (passes % 2 === 0) {
            resumeSealLeft() 
        } else {
            resumeSealRight()
        }
    }

    function wordFail() {
        failText.setText("BUMMER")
        matchText = "akdhjhrign"
        matchWord.setText("Get Ready  ")
        setTimeout(() => {
            failText.setText("")
            timerReset()
        }, 500)
        resumeAll()
    }

    function wordSuccess() {
        rightTrick1()
        trickResolve()
        updateScore()
        timerReset()
        setTimeout(() => {
            resumeAll()
        }, 3000)

        matchWord.setText("Get Ready  ")
        // Success message/sound?

    }
    
    function gameOver() {
        clearInterval(timeCounter)
        gameOverText.setText("SICK, Homie!")
        // this.input.on('pointerdown', newGame())
    }

    function newGame() {
        timerReset()
        passes = 6
        score = 0
    }
    
    // Seal 'Tricks'

    function trickResolve () {
        yesText.setText("WHOA!")
        setTimeout(() => {
            yesText.setText("")
        }, 500)
    }

    function rightTrick1() {
        tweenBounce.resume()
        // setInterval(() => {trickSealRight.scale += .02}, 10)
    }

    function rightTrick2() {
        setInterval(() => {trickSealRight.rotation += .04}, 10)
        setTimeout(() => {
            trickSealRight.visible = false
            seal.visible = true
            updatePasses()}, 
            2000)
    }

    this.input.on('pointerdown', function () {
        
        if (seal.isFollowing())
        {
            seal.pauseFollow();
            clearInterval(timeCounter)
        }
        else
        {
            // trickSealRight.visible = false
            seal.visible = true
            seal.resumeFollow();
        }
        
    });

    let text = document.getElementById("matchtext")
    text.focus()

    // conditional result based on 
    function beginTrick() {
        
        addMatchWord()
        timeCounter = setInterval(() => {
            countDown()
            if (timer === 0) {
                clearInterval(timeCounter)
                wordFail()
            }
        }, 1000)

        // determine which side to activate
        if (passes % 2 === 0) {
            seal.visible = false
            trickSealRight.visible = true
            updatePasses()
        } else if (passes === 1) {
            seal.visible = false
            trickSealLeft.visible = true
            updatePasses()
            gameOver()
        } else {
            seal.visible = false
            trickSealLeft.visible = true
            updatePasses()
        }


        text.addEventListener("input", (e) => {
            insertedText = e.target.value;
            if (insertedText === matchText) {
            
            e.target.value = "";
            clearInterval(timeCounter)
            wordSuccess()
            }
        });    
    }

    }

}
