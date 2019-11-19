"use strict";

import isNullLike from "@jasonhk/is-null-like";
import MatterJS from "matter-js";
import Phaser from "phaser";

import { ObjectAssets } from "../../assets/object-assets";

import { ImageButton } from "../../objects/interactive-objects/image-button";
import { MinecartPlayer } from "../../objects/minecart-player";
import { FruitContainer } from "../../objects/fruit-containers/fruit-container";
import { AppleRedContainer } from "../../objects/fruit-containers/apple-red-container";
import { MatterifyObject } from "../../objects/matterify-object";
import {
    BackgroundLayer,
    ForegroundLayer,
} from "../../objects/parallax-layers";

import { joinPhaserNamespaces } from "../../utilities/join-phaser-namespace";

import { SceneStates } from "../scene-states";

import { SCENES_NAMESPACE } from "../constants";
import {
    GAME_SCENE_BUTTONS,
    GAME_SCENE_NAMESPACE,
} from "./constants";

export class GameScene extends Phaser.Scene
    implements
        Phaser.Scene.Init<SceneStates>, Phaser.Scene.Create
{
    private _background: BackgroundLayer;
    private _foreground: ForegroundLayer;
    private _parallaxOffset: number = 0;

    private _fruits: Array<MatterifyObject<FruitContainer>>;
    private _minecart: MinecartPlayer;
    private _player: Phaser.Physics.Matter.Image;

    private _controllable: boolean = false;
    private _cursorButtons: GameScene.CursorButtons;
    private _cursorKeys: GameScene.CursorKeys;

    constructor()
    {
        super({ key: GameScene.NAMESPACE });
    }

    //==================================================================================================
    // Implements: Phaser.Scene.Init
    //==================================================================================================

    public init(states?: SceneStates): void
    {
        if (!isNullLike(states))
        {
            if (!isNullLike(states.parallax)) { this._parallaxOffset = states.parallax.offset; }
        }
    }

    //==================================================================================================
    // Implements: Phaser.Scene.Create
    //==================================================================================================

    public create(): void
    {
        const { height, width } = this.sys.canvas;
        this.matter.world.setBounds(undefined, undefined, width, height, undefined, true, true, false, false);

        const shapes = this.cache.json.get("Shapes.Objects");

        this._background = new BackgroundLayer(this, 0, 0)
            .setDepth(1);
        this._foreground = new ForegroundLayer(this, 0, 0)
            .setDepth(4);

        this._minecart = new MinecartPlayer(this);
        this._minecart.on("fruitcollected", this._onFruitCollected, this);
        
        const apple = this.matter.add.gameObject(new AppleRedContainer(this, 100, 0), { shape: shapes.fruits_apple_red })
            .setPosition(500, 100)
            .setDepth(2);

        this._background.tilesPositionX = this._parallaxOffset;
        this._foreground.tilesPositionX = this._parallaxOffset;

        const cursorButtonsLeft: ImageButton = new ImageButton(this, undefined, undefined, GAME_SCENE_BUTTONS.CURSOR_LEFT)
            .setPosition(100, this.sys.canvas.height - 100)
            .setDepth(5);
        const cursorButtonsRight: ImageButton = new ImageButton(this, undefined, undefined, GAME_SCENE_BUTTONS.CURSOR_RIGHT)
            .setPosition(this.sys.canvas.width - 100, this.sys.canvas.height - 100)
            .setDepth(5);

        this._cursorButtons = {
            left: cursorButtonsLeft,
            right: cursorButtonsRight,
        };

        this.input.addPointer(3);

        this._cursorKeys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        });

        this._controllable = true;
    }

    //==================================================================================================
    // Overrides: Phaser.Scene#update
    //==================================================================================================

    public update(): void
    {
        if (this._controllable)
        {
            let velocity: number = 0;
            if (this._cursorKeys.left.isDown || this._cursorButtons.left.isDown) { velocity += -10; }
            if (this._cursorKeys.right.isDown || this._cursorButtons.right.isDown) { velocity += 10; }
            this._minecart.setVelocityX(velocity);
        }
    }

    //==================================================================================================
    // Methods: Private Methods
    //==================================================================================================

    private _createNewFruit(): void {}

    //==================================================================================================
    // Methods: Event Listeners
    //==================================================================================================

    private _onFruitCollected(fruit: Phaser.Types.Physics.Matter.MatterGameObject<FruitContainer>): void
    {
        //fruit.destroy(true);
    }
}

export namespace GameScene
{
    export const NAMESPACE: string = joinPhaserNamespaces(SCENES_NAMESPACE, GAME_SCENE_NAMESPACE);

    export type CursorButtons = Record<"left" | "right", ImageButton>;
    export type CursorKeyCodes = Record<"left" | "right", number>;
    export type CursorKeys = Phaser.Types.Input.Keyboard.KeysRecord<"left" | "right">;
}
