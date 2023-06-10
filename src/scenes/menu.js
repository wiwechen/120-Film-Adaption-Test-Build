class Menu extends Phaser.Scene{
    constructor(){
        super({key: 'menuScene'})
    }

    create(){
        console.log("At Menu");
        this.add.text(20, 20, "Menu Screen");
        // let test = this.add.rectangle(centerX, centerY, 30, 30, 0xff0000);
        // let test1 = this.add.rectangle(centerX-50, centerY, 40, 40, 0xff0000);
        // let test2 = this.add.rectangle(centerX+50, centerY, 20, 20, 0xff0000);

        this.add.text(20, 40, "Click P to start Playing");
        this.add.text(20, 60, "Click Z to open Rules");
        this.add.text(20, 80, "Click X to open Credits");

        // key control used to navigate through the menu
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.pLastClicked = 0;
    }

    update(time,delta)
    {
        // goes to play screen
        if(keyP.isDown)
        {
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('play01Scene');
        }
        else if(keyZ.isDown) // goes to the rules of the game 
        {
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('rulesScene');

        }
        else if(keyX.isDown) // goes to the credits in the game
        {
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('creditsScene');
        }
    }
}