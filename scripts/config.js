"use strict";

const GameConfig = Object.freeze({
    name: "Be communion!",
    author: "Jason Kwok",
    year: "2018",
    version: "1.1",
    config: {
        interval: 1750,
        leaves: 4,
        scores: {
            minimum: 0,
            wining: 10,
        },
        speed: {
            player: 350,
            drop: 250
        },
        timelimit: 0,
        vocabulary: {
            positive: {
                score: 1,
                probability: 6,
                list: ["尊重", "互助", "包容", "融洽", "傾聽", "了解", "同理心", "忍耐", "關心", "禮讓", "共融", "友愛"]
            },
            negative: {
                score: -1,
                probability: 4,
                list: ["歧視", "偏見", "欺凌", "恥笑", "侮辱", "排斥"]
            }
        }
    }
})

const PhaserConfig = {
    title: `${ GameConfig.name }`,
    version: `${ GameConfig.version }`,
    canvas: document.querySelector("canvas#game"),
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    pixelArt: true,
    scene: [TitleScene, GameScene],
    plugins: {
        global: [{
            key: 'GameScalePlugin',
            plugin: Phaser.Plugins.GameScalePlugin,
            mapping: 'gameScale',
            data: {  }
        }]
    }
};
