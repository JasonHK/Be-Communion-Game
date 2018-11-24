"use strict";

class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: "sc-title",
            active: true
        });
    }

    preload() {
        this.load.setBaseURL('assets/');

        this.load.image("bg-jungle-00", "backgrounds/jungle-00.png");
        this.load.image("bg-jungle-01", "backgrounds/jungle-01.png");
        this.load.image("bg-jungle-02", "backgrounds/jungle-02.png");
        this.load.image("bg-jungle-03", "backgrounds/jungle-03.png");
        this.load.image("bg-jungle-04", "backgrounds/jungle-04.png");
        this.load.image("ob-player", "objects/bowl.png");
        this.load.image("ob-leaf", "objects/leaf.png");

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        let backgroundJungleA00 = this.add.image(400, 300, "bg-jungle-00").setScale(3);
        let backgroundJungleA01 = this.add.image(400, 300, "bg-jungle-01").setScale(3);
        let backgroundJungleA02 = this.add.image(400, 300, "bg-jungle-02").setScale(3);
        let backgroundJungleA03 = this.add.image(400, 300, "bg-jungle-03").setScale(3);
        let backgroundJungleA04 = this.add.image(400, 300, "bg-jungle-04").setScale(3);

        WebFont.load({
            google: {
                families: ["Righteous", "Noto Sans TC"]
            },
            custom: {
                urls: ["assets/fonts/unifont.css"],
                families: ["unifont"]
            },
            active: () => {
                let version = `${ GameConfig.name } v${ GameConfig.version }`;
                let copyright = `© ${ GameConfig.year } ${ GameConfig.author }`;
                
                this.gameCredit = this.add.text(25, 520, `${ version }\n${ copyright }`, {
                    fontSize: "30px",
                    fontFamily: "unifont",
                    fill: "#000"
                });

                this.gameStart = this.add.text(0, 380, "Touch to start", {
                    fontSize: "40px",
                    fontFamily: "unifont",
                    fill: "#000"
                });
                this.__proto__.center(this.gameStart, undefined, "horizontal");

                this.gameTitle = this.add.text(0, 100, `${ GameConfig.name }`, {
                    fontSize: "100px",
                    fontFamily: "Righteous, Noto Sans TC",
                    fill: "#000",
                    stroke: "#fff",
                    strokeThickness: 5
                });
                this.__proto__.center(this.gameTitle, undefined, "horizontal");
            }
        });

        this.keys = this.input.keyboard.addKey("SPACE");
        this.pointer = this.input.activePointer;
    }

    update() {
        if ((this.keys.isDown) || (this.pointer.isDown) || (this.input.activePointer.isDown)) { console.log(this.pointer);
            this.scene.start("sc-game");
        }
    }

    center(target, base = undefined, type = "both") {
        let baseX = ((base) ? base.x : 450);
        let baseY = ((base) ? base.y : 300);

        type = type.toLowerCase();
        if ((type == "horizontal") || (type == "both")) { target.x = baseX - target.width / 2; } 
        if ((type == "vertical") || (type == "both")) { target.y = baseY - target.height / 2; }
    }
}
