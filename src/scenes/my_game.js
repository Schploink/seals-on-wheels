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

    let words = [ "thing", "pizza", "hecks", "signs", "candy", "loops", "spout",
        "havok", "radical", "bogus", "tubular", "bodacious", "rightous", "skater", "awesome",
        "cowabunga", "hella", "indie", "skate", "seals", "roundboi", "fishes", "beaches",
        "seagull", "bingo", "hang ten", "shaka", "skate or die"]

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
    
    
    let score = 0
    let scoreText
    scoreText = this.add.text(16, 16, 'Score: 0', { fontFamily: "spray", fontSize: '32px', fill: '#FFFFFF'})
    let passes = 6
    let passText
    passText = this.add.text(16, 50, 'Remaining Passes: 6', { fontFamily: "spray", fontSize: '32px', fill: '#FFFFFF'})
    let timer = 3.0
    let timerText = this.add.text(16, 84, 'Timer: 3.0', { fontFamily: "spray", fontSize: '32px', fill: '#FFFFFF'})
    let instructionText = this.add.text(250, 650, "Type the word that appears in the top right below", {fontFamily: "spray", fontSize: "24px"})
    let matchTextInstruction = this.add.text(550, 50, "match the word that appears here", {fontFamily: "spray", fontSize: "28px"})
    let matchWord = this.add.text(650, 50, "", {fontFamily: "spray", fontSize: "52px"})
    let matchText
    let trick
    
    function getWord() {
        return words[Math.floor(Math.random() * words.length)]
    }
    
    function addMatchWord() {
        matchTextInstruction.setText( "" )
        matchText = getWord()
        matchWord.setText( matchText )
    }
    
    function updateScore() {
        score++
        scoreText.setText('Score: ' + score)
    }

    function updatePasses() {
        passes -= 1
        passText.setText('Remaining Passes: ' + passes)
    }
    
    function gameOver() {
        if (passes === 0) {

        }
    }
    
    this.input.on('pointerdown', function () {
        
        if (seal.isFollowing())
        {
            seal.pauseFollow();
        }
        else
        {
            // trickSealRight.visible = false
            // seal.visible = true
            seal.resumeFollow();
        }
        
    });

    let text = document.getElementById("matchtext")
    text.focus()
    // text.addEventListener("input", (e) => {
    //     const insertedText = e.target.value;
    //     console.log(insertedText)
    //     console.log(matchText)
    //     if (insertedText === matchText) {

    //     e.target.value = "";
    //     }
    // });

// conditional result based on 
    function beginTrick() {
        
        addMatchWord()

        if (passes % 2 === 0) {
            seal.visible = false
            trickSealRight.visible = true
        } else {
            seal.visible = false
            trickSealLeft.visible = true
        }

        text.addEventListener("input", (e) => {
            const insertedText = e.target.value;
            console.log(insertedText)
            console.log(matchText)
            if (insertedText === matchText) {
            
            e.target.value = "";
            }
        });
        // function where input success or fail sets trick to true or false
        if ( trick = true ) {
            updateScore()
            // show success, perform trick, increase score, decrease pass count

            // Trick seal rotation
            // seal.visible = false
            // trickSealRight.visible = true
            // setInterval(() => {trickSealRight.rotation += .04}, 10)
            // setTimeout(() => {
            //     trickSealRight.visible = false
            //     seal.visible = true
            //     updatePasses()
            // }, 2000)
    
            // Cheap seal scale
            // seal.visible = false
            // trickSealRight.visible = true
            // trickSealLeft.visible = true
            // tweenBounce.resume()
            // setInterval(() => {trickSealRight.scale += .02}, 10)
            // setTimeout (() => {
            //     seal.visible = true
            //     updatePasses()}, 2000)
        } else {
            // show failure, decrease pass count
        }
    }

    }

}
