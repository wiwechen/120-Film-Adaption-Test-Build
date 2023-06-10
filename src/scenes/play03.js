class play03 extends Phaser.Scene{
    constructor(){
        super({key: 'play03Scene'})
    }

    preload(){
        //son Animation, animations will be played depending on what keys are clicked
        this.anims.create({

            key: "downSon", //you'll need this key when you need to play an animation
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('son', {
                frames: ["sonSprite00", "sonSprite01", "sonSprite02", "sonSprite03"] //names are from the json files
            })
        })
        this.anims.create({

            key: "upSon",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('son', {
                frames: ["sonSprite012", "sonSprite013", "sonSprite014", "sonSprite015"]
            })
        })
        this.anims.create({

            key: "rightSon",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('son', {
                frames: ["sonSprite08", "sonSprite09", "sonSprite010", "sonSprite011"]
            })
        })

        this.anims.create({

            key: "leftSon",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('son', {

                frames: ["sonSprite04", "sonSprite05", "sonSprite06", "sonSprite07"]
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
        console.log("At Play03");

        //array list, contains the dialouge that is being shown on the screen

        this.dialougeScript = [
        "I'm sorry grandma, its not that I don't want to \ntalk to you. I think of all the stuff I could \ntell you, you must already know.", 
        "Otherwise, you wouldn't always tell me to listen. \n", 
        "They say you've all gone away\nbut you didn't tell me where you went.", 
        "I guess its someplace you think I should know, \nbut grandma, I know so little.", 
        "Do you know what I want to do when I grow up?", 
        "I want to tell people the things they don't know\nshow them the stuff they haven't seen.", 
        "It'll be so much fun. Perhaps one day... \nI'll find out where you've gone, and if I do, \ncan I tell everyone and bring them to visit you?", 
        "Grandma... I miss you. Especially when I see \nmy newborn cousin who still doesn't have a name.", 
        "He reminds me that you always said you felt old.\nI want to tell him that I feel old too.",
        "... ", 
        ];
        this.currentDialouge = 0;
        this.speakerOption = ["Yang Yang (son)"];
        

        //KeyInput Codes
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.zLastClicked = 0;

        //These lines of code load our map for our scene
        const map = this.add.tilemap('scene3Json');
        const tileset01 = map.addTilesetImage('outsideTile', 'outsideImage');
        const tileset02 = map.addTilesetImage('grave_markers', 'graveStones');
        const floorLayer = map.createLayer("Floor", tileset01);
        const treesLayer = map.createLayer('trees', tileset01);
        const graveLayer = map.createLayer('Graves',tileset02);
        floorLayer.setCollisionByProperty({ collides: true });
        treesLayer.setCollisionByProperty({collides: true});
        graveLayer.setCollisionByProperty({collides: true});



        //Created the son character, which is what the player will be controlling for this scene
        this.son = this.physics.add.sprite(15, centerY+50, 'son', 'sonSprite00');
        this.son.body.setCollideWorldBounds(true);
        this.vel = 100;

        //created the family to be in the scene
        this.father = this.physics.add.sprite(215, 211, 'father', 'dadSprite08');
        this.father.body.setImmovable();
        this.mother = this.physics.add.sprite(300, 211, 'mother');
        this.mother.body.setImmovable();
        this.daughter = this.physics.add.sprite(330, 211, 'daughter', 'daughterSprite00');
        this.daughter.body.setImmovable();


        //collison code
        this.physics.add.collider(this.son, floorLayer);
        this.physics.add.collider(this.son, treesLayer);
        this.physics.add.collider(this.son, graveLayer);
        this.physics.add.collider(this.son, this.father);
        this.physics.add.collider(this.son, this.mother);
        this.physics.add.collider(this.son, this.daughter);

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

        if(this.textBox==false){
            if(keyLEFT.isDown){
                this.son.play("leftSon", true); //play animation key for hiting left
                this.direction.x = -5;
            }else if(keyRIGHT.isDown){
                this.direction.x = 5;
                this.son.play("rightSon", true);
            }
            if(keyUP.isDown){
                this.son.play("upSon", true);
                this.direction.y = -5;
            }else if(keyDOWN.isDown){
                this.son.play("downSon", true);
                this.direction.y = 5;
                
            }
            this.direction.normalize();
            this.son.setVelocity(this.vel * this.direction.x, this.vel * this.direction.y);     
            if((242<=this.son.x  && this.son.x<=272) && this.son.y==211){
                console.log("Front of Grave");
                this.sound.play('beap', { volume: 0.5 });
                this.textBox=true;
            }
            // console.log("coord at: ("+this.son.x+","+this.son.y+")");      
        }else if(this.textBox==true){
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
                this.scene.start('endScene');
            }
        }

        
    }
}