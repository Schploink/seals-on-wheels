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


    let seal = this.add.follower(curve, 200, 200, 'seal');
    seal.scale = 0.3


    let trickSeal = this.add.follower(curve, 600, 200, 'seal');
    trickSeal.scale = 0.3
    trickSeal.rotation = Math.PI/2
    trickSeal.toggleFlipY()
    trickSeal.toggleFlipX()
    trickSeal.visible = false



    seal.startFollow({
        duration: 2000,
        yoyo: true,
        ease: "Sine.easeInOut",
        repeat: -1,
        onYoyo: doYoyoTrick,
        onRepeat: doYoyoTrick,
        rotateToPath: true
    });

    // trickSeal.startFollow({
    //     duration: 2000,
    //     yoyo: true,
    //     // onYoyo: flip,
    //     repeat: -1,
    //     onYoyo: doYoyoTrick,
    //     onRepeat: doYoyoTrick,
    //     rotateToPath: true
    // });

    let tween = this.tweens.add({
        targets: trickSeal,
        scale: 2,
        duration: 750,
        ease: 'Power2',
        yoyo: true,
        repeat: 1,
        paused: true
    });

    function beginTrick() {
        let trick
        if ( trick = true ) {

        } else {
            
        }
    }

    function doYoyoTrick() {


        // Trick seal rotation
        // seal.visible = false
        // trickSeal.visible = true
        // setInterval(() => {trickSeal.rotation += .02}, 10)

        // Cheap seal scale
        // seal.visible = false
        // trickSeal.visible = true
        // tween.resume()
        // setInterval(() => {trickSeal.scale += .02}, 10)
        

        seal.rotation += Math.PI
        seal.toggleFlipY()
        seal.pauseFollow()
        // let isDoingTrick = true;
        // isDoingTrick = false;
    }

    this.input.on('pointerdown', function () {

        if (seal.isFollowing())
        {
            seal.pauseFollow();
        }
        else
        {
            trickSeal.visible = false
            seal.visible = true
            seal.resumeFollow();
        }

    });

    // TODO: XYZ should be 'keydown' or something idk
    // function doAction0() {
    //     // figure out a way to spin & rotate & stretch seal somehow
    //     seal...
    // }
    // function doAction1() {
    //     // figure out a way to spin & rotate & stretch seal somehow
    //     seal...
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
