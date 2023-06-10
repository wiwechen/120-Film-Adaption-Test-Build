class play02 extends Phaser.Scene{
    constructor(){
        super({key: 'play02Scene'})
    }

    preload(){
        //Daughter Animation, animations will be played depending on what keys are clicked (ie: up will play the her walking up)
        this.anims.create({

            key: "downDaughter", // you'll need this key when you need to play an animation
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('daughter', {
                frames: ["daughterSprite00", "daughterSprite01", "daughterSprite02", "daughterSprite03"] //names are from the json files
            })
        })
        this.anims.create({

            key: "upDaughter",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('daughter', {
                frames: ["daughterSprite12", "daughterSprite13", "daughterSprite14", "daughterSprite15"]
            })
        })
        this.anims.create({

            key: "rightDaughter",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('daughter', {
                frames: ["daughterSprite08", "daughterSprite09", "daughterSprite10", "daughterSprite11"]
            })
        })

        this.anims.create({

            key: "leftDaughter",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('daughter', {

                frames: ["daughterSprite04", "daughterSprite05", "daughterSprite06", "daughterSprite07"]
            })
        })
    }


    create(){
        //text boxes for our dialouge boxes
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
        //variables
        
        this.textBox = false;
        console.log("At Play02");

        //array list, contains the dialouge that is being shown on the screen

        this.dialougeScript = 
        [
            "I thought it was the nurse in here, \nbut it seems you are awake.",
            "I was at the police station. I cannot face going\nback to school.",
            "I haven't slept in so long.\nI'm so tired grandma. \nBut now.. you've forgiven me, I can sleep.",
            "Grandma.. Why is the world so different \nfrom what we thought it was?",
            "Now that you're awake and see it again...\nHas it changed at all?",
            "Now... I close my eyes.. the world \nI see.. is so beautiful"
        ];
        this.currentDialouge = 0;
        this.speakerOption = ["Ting Ting (daughter)"];
        

        //KeyInput Codes
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.zLastClicked = 0;

        //map Code
        const map = this.add.tilemap('scene1Json');
        const tileset01 = map.addTilesetImage('house_inside', 'tilesetHouseImage');
        const bgLayer = map.createLayer('Background', tileset01);
        const wallsLayer = map.createLayer('Wall', tileset01);
        const furnitureLayer = map.createLayer('Furnitures',tileset01);
        wallsLayer.setCollisionByProperty({ collides: true });
        furnitureLayer.setCollisionByProperty({collides: true});


        //daughter sprite
        this.daughter = this.physics.add.sprite(centerX, centerY, 'daughter', 'daughterSprite00');
        this.daughter.body.setCollideWorldBounds(true);
        this.vel = 100;

        //collison code
        this.physics.add.collider(this.daughter, wallsLayer);
        this.physics.add.collider(this.daughter, furnitureLayer);

        //text
        this.dialougeBox = this.add.rectangle(0, borderUISize - borderPadding+350, w, borderUISize*3, 0x9c0d03).setOrigin(0,0);
        this.dialougeBox.visible = false;
        
        this.dialouge = this.add.text(10, borderUISize - borderPadding + 380, this.dialougeScript[this.currentDialouge]);
        this.speaker = this.add.text(10, borderUISize - borderPadding + 360, this.speakerOption[0]);

        this.speaker.visible = false;        
        this.dialouge.visible = false;
    }
    update(time,delta){
        this.direction = new Phaser.Math.Vector2(0);
        //If the textBox is false, it'll allow the players to move around
        if(this.textBox==false){
            if(keyLEFT.isDown){
                this.daughter.play("leftDaughter", true); //play animation key for hiting left
                this.direction.x = -5;
            }else if(keyRIGHT.isDown){
                this.direction.x = 5;
                this.daughter.play("rightDaughter", true);
            }
            if(keyUP.isDown){
                this.daughter.play("upDaughter", true);
                this.direction.y = -5;
            }else if(keyDOWN.isDown){
                this.daughter.play("downDaughter", true);
                this.direction.y = 5;
            }
            this.direction.normalize();
            this.daughter.setVelocity(this.vel * this.direction.x, this.vel * this.direction.y);     
            if(this.daughter.x==370 && (260<=this.daughter.y) && (this.daughter.y <=265)){ 
                this.sound.play('beap', { volume: 0.5 });
                console.log("On Carpet");
                this.textBox=true;
            }   
        }else if(this.textBox==true){ //If the textBox is true, it'll stop the players from moving and the dialouge will play out
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
            if(this.currentDialouge>=this.dialougeScript.length){
                this.scene.start('play03Scene');
            }
        }

        
    }
}