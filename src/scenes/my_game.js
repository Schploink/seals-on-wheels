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

    const halfPipe = this.add.image(400, 300, 'halfpipe')
    halfPipe.scale = 1.5
    
    // points.push(new Phaser.Math.Vector2(200, 150));
    points.push(new Phaser.Math.Vector2(200, 200));
    points.push(new Phaser.Math.Vector2(250, 300));
    points.push(new Phaser.Math.Vector2(400, 350));
    points.push(new Phaser.Math.Vector2(550, 300));
    points.push(new Phaser.Math.Vector2(600, 200));
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
        "cowabunga", "hella", "indie", "skate", "seals", "roundboi", "fishes", "beaches", "seagull", "bingo"]

    let seal = this.add.follower(curve, 200, 200, 'seal');
    seal.scale = 0.3


    let trickSealRight = this.add.follower(curve, 600, 200, 'seal');
    trickSealRight.scale = 0.3
    trickSealRight.rotation = Math.PI/2
    trickSealRight.toggleFlipY()
    trickSealRight.toggleFlipX()
    trickSealRight.visible = false

    let trickSealLeft = this.add.follower(curve, 200, 200, 'seal');
    trickSealLeft.scale = 0.3
    trickSealLeft.rotation = Math.PI/2
    trickSealLeft.toggleFlipY()
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
        repeat: 1,
        paused: true
    });

    // conditional result based on 
    function beginTrick() {
        let trick

        // function where input success or fail sets trick to true or false

        if ( trick = true ) {

            // show success, perform trick, increase score, decrease pass count

            // Trick seal rotation
            // seal.visible = false
            // trickSealRight.visible = true
            // setInterval(() => {trickSealRight.rotation += .02}, 10)
    
            // Cheap seal scale
            // seal.visible = false
            // trickSealRight.visible = true
            // tweenBounce.resume()
            // setInterval(() => {trickSealRight.scale += .02}, 10)

        } else {
            // show failure, decrease pass count
        }
    }

    function doYoyoTrick() {

        seal.rotation += Math.PI
        seal.toggleFlipY()
        seal.pauseFollow()
    }


    function getWord() {
        return words[Math.floor(Math.random() * words.length)]
    }
        
    function gameOver() {

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

    // function doAction0() {
    // }
    // function doAction1() {
    // }
    // let actionWords =['abcd', 'efgh', ...];
    // let accumulatorString = '';
    // let isDoingTrick = false;
    // this.input.on('XYZ', function (event) {
    //     if (isDoingTrick) {
            // 
            // 
            // event --> letter ('a', 'b',)
            // letter = ...

            // accumulatorString += letter
            /* 
            might be .equals() instead of ===
            if (accumulatorString === actionWords[0]) {
            doAction0();  
            } else if(accumulatorString === actionWords[1]) {
            doAction1();
            } ...
            */
    //     }

    // });

    }

}
