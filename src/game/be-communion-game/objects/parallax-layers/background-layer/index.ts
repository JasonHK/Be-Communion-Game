"use strict";

import Phaser from "phaser";

import { BackgroundAssets } from "../../../assets/background-assets";

import { PARALLAX_VECTORS } from "../constants";
import { LAYER_INDEXES } from "./constants";

export class BackgroundLayer extends Phaser.GameObjects.Container
{
    private readonly _background: Phaser.GameObjects.TileSprite;
    private readonly _foreground: Phaser.GameObjects.TileSprite;
    private readonly _middleground: Phaser.GameObjects.TileSprite;
    private readonly _sky: Phaser.GameObjects.TileSprite;

    public get tilesPositionX(): number { return this._foreground.tilePositionX / PARALLAX_VECTORS.FOREGROUND; }
    public set tilesPositionX(position: number)
    {
        this._background.tilePositionX = position * PARALLAX_VECTORS.BACKGROUND;
        this._foreground.tilePositionX = position * PARALLAX_VECTORS.FOREGROUND;
        this._middleground.tilePositionX = position * PARALLAX_VECTORS.MIDDLEGROUND;
        this._sky.tilePositionX = position * PARALLAX_VECTORS.SKY;
    }

    public get tilesPositionY(): number { return this._foreground.tilePositionY / PARALLAX_VECTORS.FOREGROUND; }
    public set tilesPositionY(position: number)
    {
        this._background.tilePositionY = position * PARALLAX_VECTORS.BACKGROUND;
        this._foreground.tilePositionY = position * PARALLAX_VECTORS.FOREGROUND;
        this._middleground.tilePositionY = position * PARALLAX_VECTORS.MIDDLEGROUND;
        this._sky.tilePositionY = position * PARALLAX_VECTORS.SKY;
    }

    constructor(scene: Phaser.Scene, x?: number, y?: number)
    {
        super(scene, x, y);

        const { height, width } = scene.sys.canvas;

        this._sky = scene.add.tileSprite(0, 0, width, height, BackgroundAssets.NAMESPACE, BackgroundAssets.Jungle.Sky)
            .setOrigin(0);
        this.addAt(this._sky, LAYER_INDEXES.FOREGROUND);

        this._background = scene.add.tileSprite(0, 0, width, height, BackgroundAssets.NAMESPACE, BackgroundAssets.Jungle.Background)
            .setOrigin(0);
        this.addAt(this._background, LAYER_INDEXES.MIDDLEGROUND);

        this._middleground = scene.add.tileSprite(0, 0, width, height, BackgroundAssets.NAMESPACE, BackgroundAssets.Jungle.Middleground)
            .setOrigin(0);
        this.addAt(this._middleground, LAYER_INDEXES.BACKGROUND);

        this._foreground = scene.add.tileSprite(0, 0, width, height, BackgroundAssets.NAMESPACE, BackgroundAssets.Jungle.Foreground)
            .setOrigin(0);
        this.addAt(this._foreground, LAYER_INDEXES.SKY);

        scene.add.existing(this);
    }

    public setTilesPosition(x?: number, y?: number): this
    {
        if (typeof x === "number") { this.tilesPositionX = x; }
        if (typeof y === "number") { this.tilesPositionY = y; }

        return this;
    }
}
