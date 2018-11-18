"use strict";

document.title = `${ GameConfig.name }`;

let doDrop = false;
let doCount = false;

let mainGame = new Phaser.Game(PhaserConfig);
