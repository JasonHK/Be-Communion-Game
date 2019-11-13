"use strict";

import MatterJS from "matter-js";
import Phaser from "phaser";

import { ObjectAssets } from "../../assets/object-assets";

import { FruitContainer } from "../../objects/fruit-containers/fruit-container";
import { Matterify } from "../../objects/matterify";
import {
    BackgroundLayer,
    ForegroundLayer,
} from "../../objects/parallax-layers";

import { MINECART_VERTICAL_POSITION } from "./constants";

export class ControllableMinecart
{
    private readonly _scene: Phaser.Scene;

    private _minecart: Phaser.Physics.Matter.Image;
    private _player: Phaser.Physics.Matter.Image;

    constructor(scene: Phaser.Scene)
    {
        this._scene = scene;

        const shapes = scene.cache.json.get("Shapes.Objects");

        this._player = scene.matter.add.image(0, 0, ObjectAssets.NAMESPACE, ObjectAssets.Minecart, { shape: shapes.player })
            .setX(500)
            .setY(835)
            .setDepth(3);
        this._player.setIgnoreGravity(true);
        (scene.matter.body as typeof MatterJS.Body).setInertia(this._player.body as MatterJS.Body, Infinity);

        this._minecart = scene.matter.add.image(0, 0, ObjectAssets.NAMESPACE, ObjectAssets.Minecart, { shape: shapes.minecart })
            .setX(500)
            .setY(835)
            .setDepth(3);
        this._minecart.setIgnoreGravity(true);

        scene.events.on("update", this._onUpdate.bind(this));
    }

    public setVelocityX(velocity: number)
    {
        this._player.setVelocityX(velocity);
        this._minecart.setX(this._player.x);
    }

    private _onUpdate(): void
    {
        this._player.setY(MINECART_VERTICAL_POSITION);
        this._minecart.setY(MINECART_VERTICAL_POSITION);

        this._minecart.setX(this._player.x);
    }
}
