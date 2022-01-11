import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import sealImg from '../assets/Sealonwheels.png';
import halfPipe from '../assets/79-skate-or-die-dos-screenshot-half-pipe-stunts.png'


export default class MyGame extends Phaser.Scene
{
    constructor () {
        super({key: 'gameScene'});
    }
    
    preload () {
        // game.scale.pageAlignHorizontally = true;
        // game.scale.pageAlignVertically = true;
        // game.scale.refresh();
        this.load.image('seal', sealImg);
        this.load.image('logo', logoImg);
        this.load.image('halfpipe', halfPipe)
    }   

    
    

    create () {

    // this.scene.pause()
    // setTimeout(() => {this.scene.resume()}, 5500)
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
        "havok", "radical", "bogus", "tubular", "bodacious", "righteous", "skater", "awesome",
        "cowabunga", "hella", "indie", "skate", "seals", "roundboi", "fishes", "beaches",
        "seagull", "bingo", "hang ten", "sk8rseal", "seals rule", "punk rock"]

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
    startButton = this.add.text(500, 100, 'Play again?', {fontSize: '28px'})
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#FF00FF' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.restart('gameScene'))
        .on('pointerover', () => startButton.setStyle({ fill: '#00FF00' }))
        .on('pointerout', () => startButton.setStyle({ fill: '#FFF' }))
    
    startButton.visible = false

    seal.startFollow({
        duration: 2000,
        yoyo: true,
        ease: "Sine.easeInOut",
        repeat: 4,
        onYoyo: doYoyoTrick,
        onRepeat: doYoyoTrick,
        rotateToPath: true
    });

    let tweenBounce = this.tweens.add({
        targets: [ trickSealRight, trickSealLeft ],
        scale: 2,
        duration: 750,
        ease: 'Power2',
        yoyo: true,
        repeat: true,
        paused: true
    });

    let outOfBody = this.tweens.add({
        targets: [ trickSealRight, trickSealLeft],
        x: '+=100',
        y: '+=100',
        duration: 750,
        ease: 'Power2',
        yoyo: true,
        paused: true,
        repeat: 2
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
    scoreText = this.add.text(16, 16, 'Score: 0', {  fontSize: '32px', fill: '#FFFFFF'})
    // passes remaining
    let passes = 5
    let passText
    passText = this.add.text(16, 50, 'Remaining Passes: 5', {  fontSize: '32px', fill: '#FFFFFF'})
    // timer variables
    let timer = 3
    let timerText = this.add.text(16, 84, 'Timer: 3s', {  fontSize: '32px', fill: '#FFFFFF'})
    // match input area
    // let instructionText = this.add.text(70, 650, "In the box below, type the word that appears in the top right", { fontSize: "24px"})
    // matched word area
    let matchTextInstruction = this.add.text(650, 75, "", { fontSize: "32px"})
    let matchWord = this.add.text(650, 50, "Get Ready", { fontSize: "52px"})
    let matchText

    let trick
    let failText = this.add.text(165, 375, "", { fontSize: "184px", fill: "#FF0000"})
    let yesText = this.add.text(250, 375, "", { fontSize: "184px", fill: "#FF00FF"})
    let gameOverText = this.add.text(30, 375, "", { fontSize: "144px", fill: "#00FF00"})
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
        if (passes % 2 === 1) {
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
        sealTrick()
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
        matchWord.setText("")
        matchTextInstruction.setText( `You got ${score} of 5!` )
        startButton.visible = true
    }

    function newGame() {
        timerReset()
        passes = 5
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
        // flipz.resume()
        let sealTwirl = 
            setInterval(() => {
                trickSealRight.rotation += .04
                trickSealLeft.rotation += .04}
            , 10)
        setTimeout(() => {
            clearInterval(sealTwirl)

            trickSealRight.rotation = Math.PI/2
            // trickSealRight.toggleFlipY()
            // trickSealRight.toggleFlipX()

            trickSealLeft.rotation = Math.PI/2
            // trickSealLeft.toggleFlipX()

        }, 3000)
        // setTimeout(() => {
        //     trickSealRight.visible = false
        //     seal.visible = true
        //     updatePasses()}, 
        //     2000)
    }

    function rightTrick3() {
        outOfBody.resume()
    }

    function sealTrick() {
        var i = Math.floor((Math.random()*20))%4
        if (i === 0) {
            i = Math.floor((Math.random()*20))%4
            sealTrick()
        } else {
        eval('rightTrick'+i+'()')
        }
    }

    // this.input.on('pointerdown', function () {
        
        // if (seal.isFollowing())
        // {
            // seal.pauseFollow();
            // clearInterval(timeCounter)
        // }
        // else
        // {
        //     // trickSealRight.visible = false
        //     seal.visible = true
        //     seal.resumeFollow();
        //     this.scene.resume(this.scene)
        // }
        
    // });

    let text = document.getElementById("matchtext")
    text.focus()

    // conditional result based on 
    function beginTrick() {
        
        
        timeCounter = setInterval(() => {
            countDown()
            if (timer === 0) {
                clearInterval(timeCounter)
                wordFail()
            }
        }, 1000)

        // determine which side to activate
        if (passes % 2 === 1) {
            addMatchWord()
            seal.visible = false
            trickSealRight.visible = true
            updatePasses()
        } else if (passes === 0) {
            seal.visible = false
            trickSealLeft.visible = true
            matchText = "akdhjhrign"
            gameOver()
        } else {
            addMatchWord()
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
