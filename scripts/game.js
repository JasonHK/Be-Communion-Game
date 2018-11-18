"use strict";

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: "sc-game",
            active: false,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: (GameConfig.config.speed.drop) },
                    debug: false
                }
            }
        });

        this.startCountdown = 4;
        this.labels = [];
        this.score = 0;
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

        this.player = this.physics.add.sprite(450, 550, "ob-player").setScale(0.8);
        this.player.body.allowGravity = false;
        this.player.setCollideWorldBounds(true);
        //this.__proto__.center(this.player, undefined, "horizontal"); console.log(this.player);

        let leafIndex = 0;
        this.leafs = this.physics.add.group({
            key: 'ob-leaf',
            repeat: (GameConfig.config.leafs - 1),
            setXY: { x: 110, y: -50, stepX: 225 }
        });
        this.leafs.children.iterate((leaf) => {
            leaf.setScale(0.8);
            leaf.body.allowGravity = false;

            leaf.index = leafIndex;
            leafIndex += 1;

            leaf.isAvailable = true;
            leaf.isPositive = false;
        });

        WebFont.load({
            google: {
                families: ["Righteous", "Noto Sans TC"]
            },
            custom: {
                urls: ["assets/fonts/unifont.css"],
                families: ["unifont"]
            },
            active: () => {
                for (let i = 0; i < GameConfig.config.leafs; i++) {
                    this.labels.push(this.add.text(-100, -100, "", {
                        fontSize: "35px",
                        fontFamily: "Unifont",
                        fill: "#000",
                        stroke: "#fff",
                        strokeThickness: 1
                    }));
                }

                this.startCounter = this.add.text(780, 0, "", {
                    fontSize: "100px",
                    fontFamily: "Righteous",
                    fill: "#000",
                    stroke: "#fff",
                    strokeThickness: 5
                });
                this.__proto__.center(this.startCounter);
                doCount = true;
                this.startCounting = setInterval(() => {
                    doCount = true;
                }, 1000);

                this.scoreCounter = this.add.text(780, 0, "00", {
                    fontSize: "80px",
                    fontFamily: "Righteous",
                    fill: "#000",
                    stroke: "#fff",
                    strokeThickness: 5
                });
            }
        }); //console.log(this);

        this.physics.add.overlap(this.player, this.leafs, this.__proto__.collect, null, this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pointer = this.input.activePointer;
    }

    update() {
        if ((this.cursors.left.isDown) || ((this.pointer.isDown) && (this.pointer.x < 450))) {
            this.player.setVelocityX(-(GameConfig.config.speed.player));
        } else if ((this.cursors.right.isDown) || ((this.pointer.isDown) && (this.pointer.x > 450))) {
            this.player.setVelocityX(GameConfig.config.speed.player);
        } else {
            this.player.setVelocityX(0);
        }

        for (let i = 0; i < GameConfig.config.leafs; i++) {
            if (this.leafs.children.entries[i].y >= 650) {
                this.leafs.children.entries[i].body.allowGravity = false;
                this.leafs.children.entries[i].setVelocityY(0);
                this.leafs.children.entries[i].y = -50;

                this.leafs.children.entries[i].isAvailable = true;
            }

            if (this.dropLeafs) {
                this.__proto__.center(this.labels[i], this.leafs.children.entries[i]);
            }
        }

        if (doCount) {
            doCount = false;
            this.startCountdown -= 1;
            if (this.startCountdown > 0) {
                this.startCounter.setText(this.startCountdown);
                this.__proto__.center(this.startCounter);
            } else if (this.startCountdown == 0) {
                this.startCounter.setText("GO!");
                this.__proto__.center(this.startCounter);

                this.dropLeafs = setInterval(() => {
                    doDrop = true;
                }, GameConfig.config.interval);
            } else {
                this.startCounter.setText("");
                clearInterval(this.startCounting);
            }
        }

        if (doDrop) {
            doDrop = false;

            let isPositive = (Utilities.random(0, 2) == 1);
            this.__proto__.drop(this.leafs.children.entries, this.labels, isPositive);
        }
    }

    center(target, base = undefined, type = "both") {
        let baseX = ((base) ? base.x : 450);
        let baseY = ((base) ? base.y : 300);

        type = type.toLowerCase();
        if ((type == "horizontal") || (type == "both")) { target.x = baseX - target.width / 2; } 
        if ((type == "vertical") || (type == "both")) { target.y = baseY - target.height / 2; }
    }

    getWords(isPositive) {
        if (isPositive) {
            let wordsCount = GameConfig.config.vocabulary.positive.list.length;
            return GameConfig.config.vocabulary.positive.list[Utilities.random(0, wordsCount)];
        } else {
            let wordsCount = GameConfig.config.vocabulary.negative.list.length;
            return GameConfig.config.vocabulary.negative.list[Utilities.random(0, wordsCount)];
        }
    }

    drop(leafs, labels, isPositive, index = undefined) {
        if ((index >= 0) && (index < GameConfig.config.leafs)) {
            if (leafs[index].isAvailable) {
                leafs[index].isAvailable = false;

                leafs[index].isPositive = isPositive;
                labels[index].setText(this.getWords(isPositive));

                leafs[index].body.allowGravity = true;
            } else {
                this.drop(leafs, labels, isPositive);
            }
        } else {
            this.drop(leafs, labels, isPositive, Utilities.random(0, GameConfig.config.leafs));
        }
    }

    collect(player, leaf) {
        leaf.body.allowGravity = false;
        leaf.setVelocityY(0);
        leaf.y = -50;

        if (leaf.isPositive) { this.score += GameConfig.config.vocabulary.positive.score; }
            else { this.score += GameConfig.config.vocabulary.negative.score; }
        if (this.score < 10) { this.scoreCounter.setText("0" + this.score) }
            else { this.scoreCounter.setText(this.score) }

        if (this.score >= GameConfig.config.scores.wining) {
            clearInterval(this.dropLeafs);
            this.leafs.children.iterate((leafs) => {
                leafs.body.allowGravity = false;
                leafs.setVelocityY(0);
                leafs.y = -50;
            });
            
            this.congratulations = this.add.text(780, 0, "You won!", {
                fontSize: "100px",
                fontFamily: "Righteous",
                fill: "#000",
                stroke: "#fff",
                strokeThickness: 5
            });
            this.__proto__.center(this.congratulations);
        }

        leaf.isAvailable = true;
    }
}
