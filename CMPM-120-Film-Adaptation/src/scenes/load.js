class Load extends Phaser.Scene{
    constructor(){
        super('loadscene');
    }

    preload(){
        
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // loading assets directory which contains all the assets used for the game
        this.load.path = './assets/';
        console.log('assets path has been set');

        //playScene 1 and playScene 2 assets where the setting is inside of the house
        this.load.image('tilesetHouseImage', 'house_inside.png');
        this.load.tilemapTiledJSON('scene1Json', 'tileMap/scene1TileMap.json');

        //playScene 3 assets where the setting is at a funeral
        this.load.image('outsideImage', 'set.gif');
        this.load.image('graveStones', 'lpc_grave_markers_rework-1.3/PNG/32x32/grave_markers.png');
        this.load.tilemapTiledJSON('scene3Json', 'tileMap/graveyardMap.json');

        //audio assets
        this.load.audio('beap', 'buttonSFX.wav');
        
        // all characters that are used in the game 
        //son character assets with their respoective images and spritesheet
        this.load.atlas('son', 'characterSprite/sonSpriteImages/sonSprite.png', 'characterSprite/sonSpriteImages/sonSprite.json');
        // daugther character assets
        this.load.atlas('daughter', 'characterSprite/daughterSpriteImages/daughterSpriteSheet.png', 'characterSprite/daughterSpriteImages/daughterSpriteSheet.json')
        // father character assets
        this.load.atlas('father', 'characterSprite/dadSpriteImages/dadSpritesheet.png', 'characterSprite/dadSpriteImages/dadSpritesheetJSON.json');
        // mother character assets
        this.load.image('mother', 'characterSprite/mother.png')

        // grandma's bed sprite
        this.load.image('grandmaBed', 'characterSprite/comatoseGrandma.png');
        console.log('assets have finished loading');

    }
    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
        // this.scene.start('play03Scene');
    }
}

