class play01 extends Phaser.Scene{
    constructor(){
        super({key: 'play01Scene'})
    }

    preload(){
        // Father Animation, animations will be played depending on what keys are clicked
        // sprite is moving downward
        this.anims.create({

            key: "down", // you'll need this key when you need to play an animation
            frameRate: 12, // frame rate of the sprite
            frames: this.anims.generateFrameNumbers('father', {
                frames: ["dadSprite00", "dadSprite01", "dadSprite02", "dadSprite03"] //names are from the json files
            })
        })
        // sprite is moving up 
        this.anims.create({
            key: "up", // you'll need this key when you need to play an animation
            frameRate: 12, // frame rate of the sprite
            frames: this.anims.generateFrameNumbers('father', {
                frames: ["dadSprite012", "dadSprite013", "dadSprite014", "dadSprite015"] // names are from the json files
            })
        })
        // sprite is moving to the right
        this.anims.create({
            key: "right", // you'll need this key when you need to play an animation
            frameRate: 12, // frame rate of the sprite
            frames: this.anims.generateFrameNumbers('father', {
                frames: ["dadSprite08", "dadSprite09", "dadSprite010", "dadSprite011"] // names are from the json files
            })
        })
        // sprite is moving to the left 
        this.anims.create({

            key: "left", // you'll need this key when you need to play an animation
            frameRate: 12, // frame rate of the sprite
            frames: this.anims.generateFrameNumbers('father', {

                frames: ["dadSprite04", "dadSprite05", "dadSprite06", "dadSprite07"] // names are from the json files
            })
        })
    }

    create(){
        //text boxes for our dialouge boxes
        this.input.enabled = true
        let textConfig = {
            fontFamily: 'Copperplate',
            fontSize: '28px',
            backgroundColor: '#DE3163',
            color: '#ffff00',
            align: 'right',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
           }

        
        this.textBox = false; //If the textbox should be on the screen, this var should be true
        console.log("At Play01");

        //array list, contains the dialouge that is being shown on the screen

        this.dialougeScript = 
        ["Seems I am the only one left to keep you company.",
        "When Min Min was home, I thought… she'd solve\nall the problems around here. But now… there's\nno one to do it.",
        "And I really don't know when she will be back.\nIt's hard for me to mumble like this.\nI hope you won't be offended if I say… It's like \npraying.",
        "I'm not sure if the other party can hear me…\nand I'm not sure if I'm sincere enough.",
        "Frankly...\nThere's very little I'm sure about these days.\nI wake up feeling unsure about almost everything,", 
        "and I wonder why I wake up at all, just to face\nthe same uncertainties again and again.", 
        "...", 
        "Would you want to wake up if you were me?",
        "Maybe Yang Yang is right. You lived so many more\nyears. Other than these questions we can't\nanswer...", 
        "what is there to tell you?", 
        "Anyhow I guess you don't blame Yang Yang for not\ntalking to you, in many ways he takes after me.", 
        "Really."];
        this.currentDialouge = 0; // counter for which dialogue to show
        this.speakerOption = ["NJ (father)"]; // the character who is speaking
        

        //KeyInput Codes
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.zLastClicked = 0; // counter for clicks

        //map
        const map = this.add.tilemap('scene1Json');
        const tileset01 = map.addTilesetImage('house_inside', 'tilesetHouseImage');
        const bgLayer = map.createLayer('Background', tileset01);
        const wallsLayer = map.createLayer('Wall', tileset01);
        const furnitureLayer = map.createLayer('Furnitures',tileset01);
        wallsLayer.setCollisionByProperty({ collides: true });
        furnitureLayer.setCollisionByProperty({collides: true});


        // father sprite properites 
        this.father = this.physics.add.sprite(centerX, centerY, 'father', 'dadSprite00');
        this.father.body.setCollideWorldBounds(true);
        this.vel = 100;

        //collison code
        this.physics.add.collider(this.father, wallsLayer);
        this.physics.add.collider(this.father, furnitureLayer);

        //textbox (set to visibility false until player reaches a spot on the floor)
        this.dialougeBox = this.add.rectangle(0, borderUISize - borderPadding+350, w, borderUISize*3, 0x9c0d03).setOrigin(0,0);
        this.dialougeBox.visible = false;
        
        this.dialouge = this.add.text(10, borderUISize - borderPadding + 380, this.dialougeScript[this.currentDialouge]);
        this.speaker = this.add.text(10, borderUISize - borderPadding + 360, this.speakerOption[0]);

        this.speaker.visible = false;        
        this.dialouge.visible = false;
    }

    update(time,delta){
        this.direction = new Phaser.Math.Vector2(0);

        // if the player hasnt reached the carpet spot yet, they are free to move wherever they want
        if(this.textBox==false){
            if(keyLEFT.isDown){
                this.father.play("left", true); //play animation key for hitting left
                this.direction.x = -5;
            }else if(keyRIGHT.isDown){
                this.direction.x = 5;
                this.father.play("right", true); //play animation key for hitting right
            }
            if(keyUP.isDown){
                this.father.play("up", true);  // play animation key for hitting up
                this.direction.y = -5;
            }else if(keyDOWN.isDown){
                this.father.play("down", true); // play animation key for hitting down
                this.direction.y = 5;
            }
            this.direction.normalize();
            this.father.setVelocity(this.vel * this.direction.x, this.vel * this.direction.y);     // how fast the sprite moves 
            if(this.father.x==362 && (264<=this.father.y<=268)){ 
                this.sound.play('beap', { volume: 0.5 });
                console.log("On Carpet");
                this.textBox=true;
            }   
        }else if(this.textBox==true){ // if the textbox is true, we start showing the dialogue
            this.dialougeBox.visible = true;
            this.dialouge.visible = true;
            this.speaker.visible = true;
            if(keyZ.isDown && time>this.zLastClicked){
                this.sound.play('beap', { volume: 0.5 });
                console.log("Z was clicked");
                this.zLastClicked = time + 500;
                this.currentDialouge +=1;
                if(this.currentDialouge<this.dialougeScript.length){
                    this.dialouge.text = this.dialougeScript[this.currentDialouge];
                }
            }
            // go to next scene
            if(this.currentDialouge>=this.dialougeScript.length){
                this.scene.start('play02Scene');
            }
        }

        
    }
}