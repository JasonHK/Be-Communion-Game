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

    create() { console.log("loading game");
        this.controllable = true;
        this.startCountdown = 4;
        this.labels = [];
        this.score = 0;
        this.returnTitle = false;

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
        this.leaves = this.physics.add.group({
            key: 'ob-leaf',
            repeat: (GameConfig.config.leaves - 1),
            setXY: { x: 110, y: -50, stepX: 225 }
        });
        this.leaves.children.iterate((leaf) => {
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
                for (let i = 0; i < GameConfig.config.leaves; i++) {
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

        this.physics.add.overlap(this.player, this.leaves, this.__proto__.collect, null, this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pointer = this.input.activePointer;
        this.keys = this.input.keyboard.addKey("ESC"); console.log(this);
    }

    update() {
        if ((this.controllable) && ((this.cursors.left.isDown) || ((this.pointer.isDown) && (this.pointer.x < 450)))) {
            this.player.setVelocityX(-(GameConfig.config.speed.player));
        } else if ((this.controllable) && ((this.cursors.right.isDown) || ((this.pointer.isDown) && (this.pointer.x > 450)))) {
            this.player.setVelocityX(GameConfig.config.speed.player);
        } else {
            this.player.setVelocityX(0);
        }

        if ((this.returnTitle) && ((this.keys.isDown) || (this.pointer.isDown))) {
            this.returnTitle = false;
            this.scene.start("sc-title");
        }

        for (let i = 0; i < GameConfig.config.leaves; i++) {
            if (this.leaves.children.entries[i].y >= 650) {
                this.leaves.children.entries[i].body.allowGravity = false;
                this.leaves.children.entries[i].setVelocityY(0);
                this.leaves.children.entries[i].y = -50;

                this.leaves.children.entries[i].isAvailable = true;
            }

            if (this.dropLeaves) {
                this.__proto__.center(this.labels[i], this.leaves.children.entries[i]);
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

                this.dropLeaves = setInterval(() => {
                    doDrop = true;
                }, GameConfig.config.interval);
            } else {
                this.startCounter.setText("");
                clearInterval(this.startCounting);
            }
        }

        if (doDrop) {
            doDrop = false;

            let isPositive = this.__proto__.chooseTones(GameConfig.config.vocabulary.positive.probability, GameConfig.config.vocabulary.negative.probability);
            this.__proto__.drop(this.leaves.children.entries, this.labels, isPositive);
        }
    }

    center(target, base = undefined, type = "both") {
        let baseX = ((base) ? base.x : 450);
        let baseY = ((base) ? base.y : 300);

        type = type.toLowerCase();
        if ((type == "horizontal") || (type == "both")) { target.x = baseX - target.width / 2; } 
        if ((type == "vertical") || (type == "both")) { target.y = baseY - target.height / 2; }
    }

    chooseTones(positive, negative) {
        let random = Utilities.random(1, (positive + negative) + 1);
        if (random <= positive) { return true; } else { return false; }
    }

    chooseWord(isPositive) {
        if (isPositive) {
            let wordsCount = GameConfig.config.vocabulary.positive.list.length;
            return GameConfig.config.vocabulary.positive.list[Utilities.random(0, wordsCount)];
        } else {
            let wordsCount = GameConfig.config.vocabulary.negative.list.length;
            return GameConfig.config.vocabulary.negative.list[Utilities.random(0, wordsCount)];
        }
    }

    //-------------------------------------------------------------------------
    // Leaves Dropping
    //-------------------------------------------------------------------------
    drop(leaves, labels, isPositive, index = undefined) {
        if ((index >= 0) && (index < GameConfig.config.leaves)) {
            if (leaves[index].isAvailable) {
                leaves[index].isAvailable = false;

                leaves[index].isPositive = isPositive;
                labels[index].setText(this.chooseWord(isPositive));

                leaves[index].body.allowGravity = true;
            } else {
                this.drop(leaves, labels, isPositive);
            }
        } else {
            this.drop(leaves, labels, isPositive, Utilities.random(0, GameConfig.config.leaves));
        }
    }

    //-------------------------------------------------------------------------
    // Leaves Collection
    //-------------------------------------------------------------------------
    collect(player, leaf) {
        leaf.body.allowGravity = false;
        leaf.setVelocityY(0);
        leaf.y = -50;

        this.score = this.__proto__.calculateScore(this.score, leaf.isPositive);
        this.scoreCounter.setText(this.score.toString().padStart(2, "0"));

        if (this.score >= GameConfig.config.scores.wining) {
            this.controllable = false;
            this.player.setVelocityX(0);

            clearInterval(this.dropLeaves);
            this.leaves.children.iterate((leaves) => {
                leaves.body.allowGravity = false;
                leaves.setVelocityY(0);
                leaves.y = -50;
            });
            
            this.congratulations = this.add.text(0, 175, "You won!", {
                fontSize: "100px",
                fontFamily: "Righteous",
                fill: "#000",
                stroke: "#fff",
                strokeThickness: 5
            });
            this.__proto__.center(this.congratulations, undefined, "horizontal");

            setTimeout(() => {
                this.gameStart = this.add.text(0, 380, "Touch to back to title", {
                    fontSize: "40px",
                    fontFamily: "unifont",
                    fill: "#000"
                });
                this.__proto__.center(this.gameStart, undefined, "horizontal");

                this.returnTitle = true;
            }, 3000);
        }

        leaf.isAvailable = true;
    }

    calculateScore(currentScore, isPositive) {
        const Vocabulary = GameConfig.config.vocabulary;
        const MinScore = GameConfig.config.scores.minimum;

        let newScore = currentScore + ((isPositive) ? Vocabulary.positive.score : Vocabulary.negative.score);
        if (newScore < currentScore) {
            return ((newScore < MinScore) ? MinScore : newScore);
        } else {
            return newScore;
        }
    }
}
