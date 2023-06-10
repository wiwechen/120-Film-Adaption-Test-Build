let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 480,
    height: 480,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
            arcade:{
                debug: false
            }
    },
    zoom: 1,
    scene: [Load,Menu,play01,play02,play03,Credits,End,Rules]
}

const game = new Phaser.Game(config)

//size variables
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyLEFT, keyRIGHT, keyDOWN, keyUP, keySHIFT, keyP, keyZ, keyX, keySPACE;