"use strict";

import Phaser from "phaser";

import { BackgroundAssets } from "../../../assets/background-assets";

import { PARALLAX_VECTORS } from "../constants";

export class ForegroundLayer extends Phaser.GameObjects.Container
{
    private readonly _ground: Phaser.GameObjects.TileSprite;

    public get tilesPositionX(): number { return this._ground.tilePositionX / PARALLAX_VECTORS.GROUND; }
    public set tilesPositionX(position: number)
    {
        this._ground.tilePositionX = position * PARALLAX_VECTORS.GROUND;
    }

    public get tilesPositionY(): number { return this._ground.tilePositionY / PARALLAX_VECTORS.GROUND; }
    public set tilesPositionY(position: number)
    {
        this._ground.tilePositionY = position * PARALLAX_VECTORS.GROUND;
    }

    constructor(scene: Phaser.Scene, x?: number, y?: number)
    {
        super(scene, x, y);

        const { height, width } = scene.sys.canvas;

        this._ground = scene.add.tileSprite(0, 0, width, height, BackgroundAssets.NAMESPACE, BackgroundAssets.Jungle.Ground)
            .setOrigin(0);
        this.addAt(this._ground, 0);

        scene.add.existing(this);
    }

    public setTilesPosition(x?: number, y?: number): this
    {
        if (typeof x === "number") { this.tilesPositionX = x; }
        if (typeof y === "number") { this.tilesPositionY = y; }

        return this;
    }
}
