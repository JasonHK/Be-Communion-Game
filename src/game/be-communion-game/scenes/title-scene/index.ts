"use strict";

import Phaser from "phaser";

import { InterfaceAssets } from "../../assets/interface-assets";

import { ImageButton } from "../../objects/interactive-objects/image-button";
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
    TITLE_SCENE_BUTTONS,
} from "./constants";

export class TitleScene extends Phaser.Scene
    implements
        Phaser.Scene.Init, Phaser.Scene.Preload, Phaser.Scene.Create
{
    private _credit: GameCredit;
    private _creditConfig: GameCredit.Config;

    private _backgroundLayer: BackgroundLayer;
    private _foregroundLayer: ForegroundLayer;
    private _parallaxEnabled: boolean = true;
    private _parallaxOffset: number = 0;

    private _fullscreenButton: ImageButton;
    private _startButton: ImageButton;

    //==================================================================================================
    // Constructor: Public Constructor
    //==================================================================================================

    constructor()
    {
        super({ key: TitleScene.NAMESPACE });
    }

    //==================================================================================================
    // Implements: Phaser.Scene.Init
    //==================================================================================================

    public init(): void {}

    //==================================================================================================
    // Implements: Phaser.Scene.Preload
    //==================================================================================================

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

    //==================================================================================================
    // Implements: Phaser.Scene.Create
    //==================================================================================================

    public create(): void
    {
        this._backgroundLayer = new BackgroundLayer(this, 0, 0)
            .setDepth(1);
        this._foregroundLayer = new ForegroundLayer(this, 0, 0)
            .setDepth(4);

        console.log(this._foregroundLayer.body);

        this.add.image(0, 0, "Objects.Minecart")
            .setOrigin(0.5, 1)
            .setX(500)
            .setY(935)
            .setDepth(2);

        this._credit = new GameCredit(this, 0, 0, this._creditConfig)
            .setOrigin(0, 1)
            .setY(this.sys.canvas.height)
            .setDepth(5);

        this._startButton = new ImageButton(this, undefined, undefined, TITLE_SCENE_BUTTONS.START)
            .setPosition(this.sys.canvas.width / 2, 650)
            .setDepth(5);

        this._fullscreenButton = new ImageButton(this, undefined, undefined, TITLE_SCENE_BUTTONS.FULLSCREEN_ENTER)
            .setPosition(this.sys.canvas.width - 75, 75)
            .setDepth(5);
            
        this._fullscreenButton.on("buttonup", this._onImageButtonUp, this);
        this._startButton.on("buttonup", this._onImageButtonUp, this);

        console.log(this._credit);
    }

    //==================================================================================================
    // Overrides: Phaser.Scene#update
    //==================================================================================================

    public update(): void
    {
        if (this._parallaxEnabled)
        {
            this._backgroundLayer.tilesPositionX = this._parallaxOffset;
            this._foregroundLayer.tilesPositionX = this._parallaxOffset;
            this._parallaxOffset = updateParallax(this._parallaxOffset, PARALLAX_STEP, PARALLAX_LIMIT);
        }
    }

    //==================================================================================================
    // Methods: Private Methods
    //==================================================================================================

    private _loadGameScene(): void
    {
        const states: SceneStates = {
            parallax: {
                offset: this._parallaxOffset,
            },
        };

        this.scene.start(GameScene.NAMESPACE, states);
    }

    //==================================================================================================
    // Methods: Event Listeners
    //==================================================================================================

    private _onImageButtonUp(button: ImageButton): void
    {
        if (button === this._fullscreenButton)
        {
            if (this.scale.isFullscreen)
            {
                this._fullscreenButton.setButtonStyles(TITLE_SCENE_BUTTONS.FULLSCREEN_ENTER);
                this.scale.stopFullscreen();
            }
            else
            {
                this._fullscreenButton.setButtonStyles(TITLE_SCENE_BUTTONS.FULLSCREEN_EXIT);
                this.scale.startFullscreen();
            }
        }
        else if (button === this._startButton)
        {
            this._parallaxEnabled = false;
            setTimeout(this._loadGameScene.bind(this), 100);
        }
    }
}

export namespace TitleScene
{
    export const NAMESPACE: string = joinPhaserNamespaces(SCENES_NAMESPACE, TITLE_SCENE_NAMESPACE);
}
