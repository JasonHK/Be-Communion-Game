"use strict";

import Phaser from "phaser";

import { InterfaceAssets } from "../../assets/interface-assets";

import {
    BackgroundLayer,
    ForegroundLayer,
} from "../../objects/parallax-layers";

import { joinPhaserNamespaces } from "../../utilities/join-phaser-namespace";
import { updateParallax } from "../utilities/update-parallax";

import { GameScene } from "../";
import { SceneStates } from "../scene-states";

import { GameCredit } from "./game-credit";

import { SCENES_NAMESPACE } from "../constants";
import {
    PARALLAX_LIMIT,
    PARALLAX_STEP,
    TITLE_SCENE_NAMESPACE,
} from "./constants";

export class TitleScene extends Phaser.Scene
{
    private _credit: GameCredit;
    private _creditConfig: GameCredit.Config;

    private _backgroundLayer: BackgroundLayer;
    private _foregroundLayer: ForegroundLayer;
    private _parallaxEnabled: boolean = true;
    private _parallaxOffset: number = 0;

    private _isPointerDown: boolean = false;
    private _isPointerOver: boolean = false;
    private _startButton: Phaser.GameObjects.Image;

    constructor()
    {
        super({ key: TitleScene.NAMESPACE });
    }

    public init(): void {}

    public preload(): void
    {
        const { gameTitle, gameVersion } = this.sys.game.config;
        this._creditConfig = {
            author: "Jason Kwok",
            title: gameTitle,
            version: gameVersion,
            year: 2019,
        };
    }

    public create(): void
    {
        this._backgroundLayer = new BackgroundLayer(this, 0, 0)
            .setDepth(1);
        this._foregroundLayer = new ForegroundLayer(this, 0, 0)
            .setDepth(4);

        this.add.image(0, 0, "Objects.Minecart")
            .setOrigin(0.5, 1)
            .setX(500)
            .setY(935)
            .setDepth(2);

        this._credit = new GameCredit(this, 0, 0, this._creditConfig)
            .setOrigin(0, 1)
            .setY(this.sys.canvas.height)
            .setDepth(5);

        this._startButton = this.add.image(0, 0, InterfaceAssets.NAMESPACE, InterfaceAssets.Buttons.Start)
            .setOrigin(0.5)
            .setX(this.sys.canvas.width / 2)
            .setY(650)
            .setDepth(5)
            .setInteractive({ useHandCursor: true });

        this.input
            .on("pointerdown", () => { this._isPointerDown = true; })
            .on("pointerdownoutside", () => { this._isPointerDown = true; })
            .on("pointerup", () => { this._isPointerDown = false; })
            .on("pointerupoutside", () => { this._isPointerDown = false; })

        this._startButton
            .on("pointerover", () => {
                const frame: string = this._isPointerDown ? InterfaceAssets.Buttons.StartActive
                                                          : InterfaceAssets.Buttons.StartHover;
                this._startButton.setFrame(frame);
            })
            .on("pointerout", () => { this._startButton.setFrame(InterfaceAssets.Buttons.Start); })
            .on("pointerdown", () => { this._startButton.setFrame(InterfaceAssets.Buttons.StartActive); })
            .on("pointerup", this._startNewGame.bind(this));
    }

    public update(): void
    {
        if (this._parallaxEnabled)
        {
            this._backgroundLayer.tilesPositionX = this._parallaxOffset;
            this._foregroundLayer.tilesPositionX = this._parallaxOffset;
            this._parallaxOffset = updateParallax(this._parallaxOffset, PARALLAX_STEP, PARALLAX_LIMIT);
        }
    }

    private _onPointerOver(): void
    {}

    private _startNewGame(): void
    {
        this._parallaxEnabled = false;
        setTimeout((): void => {
            const states: SceneStates = {
                parallax: {
                    offset: this._parallaxOffset,
                },
            };

            this.scene.start(GameScene.NAMESPACE, states);
        }, 100);
    }
}

export namespace TitleScene
{
    export const NAMESPACE: string = joinPhaserNamespaces(SCENES_NAMESPACE, TITLE_SCENE_NAMESPACE);
}
