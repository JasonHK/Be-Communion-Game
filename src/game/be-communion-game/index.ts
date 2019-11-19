"use strict";

import WebFontLoaderPlugin from "phaser-plugin-webfont-loader";
import Phaser from "phaser";

import {
    GameScene,
    SplashScene,
    TitleScene,
} from "./scenes";

export class BeCommunionGame
{
    private readonly _game: Phaser.Game;

    constructor(element: HTMLElement)
    {
        this._game = new Phaser.Game({
            title: "Be Communion!",
            version: "1.2.1",
            parent: element,
            type: Phaser.AUTO,
            render: {
                antialias: true,
                pixelArt: false,
                roundPixels: true,
            },
            width: 1600,
            height: 900,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            backgroundColor: "#000000",
            disableContextMenu: true,
            physics: {
                default: "matter",
                matter: {
                    gravity: {
                        x: 0,
                        y: 0.65,
                    },
                    debug: true,
                    debugShowVelocity: true,
                },
            },
            plugins: {
                global: [
                    {
                        key: "Plugins.WebFontLoader",
                        plugin: WebFontLoaderPlugin,
                        start: true,
                    },
                ],
            },
            scene: [
                SplashScene,
                GameScene,
                TitleScene,
            ],
        });
    }

    public preload(): void {}
}
