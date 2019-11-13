"use strict";

import isNullLike from "@jasonhk/is-null-like";
import MatterJS from "matter-js";
import Phaser from "phaser";

import { ObjectAssets } from "../../assets/object-assets";

import { ControllableMinecart } from "../../objects/controllable-minecart";
import { FruitContainer } from "../../objects/fruit-containers/fruit-container";
import { Matterify } from "../../objects/matterify";
import {
    BackgroundLayer,
    ForegroundLayer,
} from "../../objects/parallax-layers";

import { joinPhaserNamespaces } from "../../utilities/join-phaser-namespace";

import { SceneStates } from "../scene-states";

import { SCENES_NAMESPACE } from "../constants";
import {
    GAME_SCENE_NAMESPACE,
} from "./constants";

export class GameScene extends Phaser.Scene
{
    private _background: BackgroundLayer;
    private _foreground: ForegroundLayer;
    private _parallaxOffset: number = 0;

    private _fruits: Array<Matterify<FruitContainer>>;
    private _minecart: ControllableMinecart;
    private _player: Phaser.Physics.Matter.Image;

    private _controllable: boolean = false;
    private _keys: GameScene.Keys;

    constructor()
    {
        super({ key: GameScene.NAMESPACE });
    }

    public init(states?: SceneStates): void
    {
        if (!isNullLike(states))
        {
            if (!isNullLike(states.parallax)) { this._parallaxOffset = states.parallax.offset; }
        }
    }

    public preload(): void {}

    public create(): void
    {
        const { height, width } = this.sys.canvas;
        this.matter.world.setBounds(undefined, undefined, width, height, undefined, true, true, false, false);

        const shapes = this.cache.json.get("Shapes.Objects");

        this._background = new BackgroundLayer(this, 0, 0)
            .setDepth(1);
        this._foreground = new ForegroundLayer(this, 0, 0)
            .setDepth(4);

        this._minecart = new ControllableMinecart(this);

        //this._minecart = this.matter.add.image(0, 0, ObjectAssets.NAMESPACE, ObjectAssets.Minecart, { shape: shapes.minecart })
        //    //.setOrigin(0.5, 0.4)
        //    .setX(500)
        //    .setY(835)
        //    .setDepth(3);
        //this._minecart.setIgnoreGravity(true);

        //console.log(ObjectAssets.Fruits);
        //const apple = this.matter.add.image(0, 0, ObjectAssets.NAMESPACE, ObjectAssets.Fruits.AppleRed, { shape: shapes.fruits_apple_red })
        //    .setX(500)
        //    .setY(100)
        //    .setDepth(2);
        //(apple.body as MatterJS.Body).collisionFilter = {
        //    category: 0b100,
        //    group: 0b000,
        //    mask: 0b110,
        //};
        
        const apple = (this.matter.add.gameObject(new FruitContainer(this, ObjectAssets.Fruits.AppleRed, 100, 0, "Test"), { shape: shapes.fruits_apple_red }) as Matterify<FruitContainer>)
            .setX(500)
            .setY(100)
            .setDepth(2);

        //this._player = this.matter.add.image(0, 0, ObjectAssets.NAMESPACE, ObjectAssets.Minecart, { shape: shapes.player })
        //    .setX(500)
        //    .setY(835)
        //    .setDepth(3);
        //this._player.setIgnoreGravity(true);
        //(this.matter.body as typeof MatterJS.Body).setInertia(this._player.body as MatterJS.Body, Infinity);

        this._background.tilesPositionX = this._parallaxOffset;
        this._foreground.tilesPositionX = this._parallaxOffset;

        this._keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        } as GameScene.KeyCodes) as GameScene.Keys;

        this._controllable = true;
    }

    public update(): void
    {
        //this._player.setY(835);
        //this._minecart.setY(835);
        ////this._minecart.setX(this._player.x);
        //if (this._controllable)
        //{
        //    let velocity: number = 0;
        //    if (this._keys.left.isDown) { velocity += -10; }
        //    if (this._keys.right.isDown) { velocity += 10; }
        //    this._player.setVelocityX(velocity);
        //    this._minecart.setX(this._player.x);
        //}
        if (this._controllable)
        {
            let velocity: number = 0;
            if (this._keys.left.isDown) { velocity += -10; }
            if (this._keys.right.isDown) { velocity += 10; }
            this._minecart.setVelocityX(velocity);
        }
    }

    private _createNewFruit(): void {}
}

export namespace GameScene
{
    export const NAMESPACE: string = joinPhaserNamespaces(SCENES_NAMESPACE, GAME_SCENE_NAMESPACE);

    export type KeyCodes = Record<"left" | "right", number>;
    export type Keys = Record<"left" | "right", Phaser.Input.Keyboard.Key>;
}
