import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import sealImg from '../assets/Sealonwheels.png';
import halfPipe from '../assets/79-skate-or-die-dos-screenshot-half-pipe-stunts.png'

export default class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('seal', sealImg);
        this.load.image('logo', logoImg);
        this.load.image('halfpipe', halfPipe)
    }   
    create ()
{
    var points = [];

    const halfPipe = this.add.image(400, 300, 'halfpipe')
    halfPipe.scale = 1.5

    points.push(new Phaser.Math.Vector2(200, 200));
    points.push(new Phaser.Math.Vector2(250, 300));
    points.push(new Phaser.Math.Vector2(400, 350));
    points.push(new Phaser.Math.Vector2(550, 300));
    points.push(new Phaser.Math.Vector2(600, 200));

    var curve = new Phaser.Curves.Spline(points);

    var graphics = this.add.graphics();

    // graphics.lineStyle(1, 0xffffff, 1);

    // curve.draw(graphics, 64);

    // graphics.fillStyle(0x00ff00, 1);

    for (var i = 0; i < points.length; i++)
    {
        graphics.fillCircle(points[i].x, points[i].y, 4);
    }

    var seal = this.add.follower(curve, 200, 200, 'seal');
    seal.scale = 0.3

    seal.startFollow({
        duration: 2000,
        yoyo: true,
        // onYoyo: flip,
        repeat: -1,
        onYoyo: () => { addEvent('onYoyo') },
        rotateToPath: true
    });

    const tween = this.tweens.add({
        targets: seal,
        props: {
            x: {
                value: 600,
                delay: 1000
            }
        },
        ease: 'Power1',
        duration: 3000,
        yoyo: true,
        paused: true,
        onActive: function () { addEvent('onActive') },
        onStart: function () { addEvent('onStart') },
        onLoop: function () { addEvent('onLoop') },
        onYoyo: function () { addEvent('onYoyo') },
        onRepeat: function () { addEvent('onRepeat') },
        onComplete: function () { addEvent('onComplete') }
    });

    function onYoyoHandler (tween, target)
{
    console.log(arguments);

    target.toggleFlipX().setAlpha(0.2 + Math.random());
}

    this.input.on('pointerdown', function () {

        if (seal.isFollowing())
        {
            seal.pauseFollow();
        }
        else
        {
            seal.resumeFollow();
        }

    });
    }
}
