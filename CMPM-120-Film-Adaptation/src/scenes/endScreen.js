class End extends Phaser.Scene{
    constructor(){
        super({key: 'endScene'})
    }
    create(){
        this.add.text(20, 20, "End Scene");
        this.add.text(20, 40, "Press Space to go back to menu");
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if(keySPACE.isDown){
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('menuScene');
        }
    }
}