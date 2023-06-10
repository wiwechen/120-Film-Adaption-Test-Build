class Rules extends Phaser.Scene{
    constructor(){
        super({key: 'rulesScene'})
    }
    create(){
        this.add.text(20, 20, "Rules Scene(Press Space to go back to menu)");
        this.add.text(20, 60, "Use arrow keys to move");
        this.add.text(20, 80, "Press Z to continue text box");
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if(keySPACE.isDown){
            this.sound.play('beap', { volume: 0.5 });
            this.scene.start('menuScene');
        }
    }
}