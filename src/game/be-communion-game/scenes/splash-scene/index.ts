"use strict";

import Phaser from "phaser";

import { Assets } from "../../assets";
import { InterfaceAssets } from "../../assets/interface-assets";

import { joinPhaserNamespaces } from "../../utilities/join-phaser-namespace";

import { TitleScene } from "../";

import { ProgressIndicator } from "./progress-indicator";

import { SCENES_NAMESPACE } from "../constants";
import { SPLASH_SCENE_NAMESPACE } from "./constants";

import "phaser-plugin-webfont-loader/lib/phaser";

export class SplashScene extends Phaser.Scene
    implements
        Phaser.Scene.Preload, Phaser.Scene.Create
{
    private _indicator: ProgressIndicator;

    constructor()
    {
        super({ key: SplashScene.NAMESPACE });
    }

    //==================================================================================================
    // Implements: Phaser.Scene.Preload
    //==================================================================================================

    public preload(): void
    {
        this.load.webfont("Webfonts", {
            custom: {
                urls: ["assets/fonts/unifont.css"],
                families: [
                    "unifont",
                ],
            },
        });
    }

    //==================================================================================================
    // Implements: Phaser.Scene.Create
    //==================================================================================================

    public create(): void
    {
        this._indicator = new ProgressIndicator(this, 0, 0)
            .setOrigin(0.5)
            .setPosition(this.sys.canvas.width / 2, this.sys.canvas.height / 2);

        this.load
            .on("progress", this._onLoadProgress, this)
            .once("complete", this._onLoadComplete, this)
            .once("start", this._onLoadStart, this);

        this.load.webfont("Webfonts", {
            google: {
                families: [
                    "Noto Sans TC",
                    "Righteous",
                ],
            },
        });

        this.load
            .multiatlas(Assets.Backgrounds.NAMESPACE, Assets.Backgrounds.SPRITES, Assets.Backgrounds.DIRECTORY)
            .multiatlas(Assets.Interface.NAMESPACE, Assets.Interface.SPRITES, Assets.Interface.DIRECTORY)
            .multiatlas(Assets.Objects.NAMESPACE, Assets.Objects.SPRITES, Assets.Objects.DIRECTORY);
            
        this.load.json("Shapes.Objects", "assets/objects/shapes.json");

        this.load.start();
    }

    //==================================================================================================
    // Methods: Private Methods
    //==================================================================================================

    private _loadTitleScene(): void
    {
        this.scene.start(TitleScene.NAMESPACE);
        this.scene.stop();
    }

    //==================================================================================================
    // Methods: Event Listeners
    //==================================================================================================

    private _onLoadComplete(): void
    {
        this._indicator.setProgress(100);
        setTimeout(this._loadTitleScene.bind(this), 1000);
    }

    private _onLoadProgress(progress: number): void
    {
        this._indicator.setProgress(Math.floor(progress * 100));
    }

    private _onLoadStart(): void
    {
        this._indicator.setIndeterminate(false);
    }
}

export namespace SplashScene
{
    export const NAMESPACE: string = joinPhaserNamespaces(SCENES_NAMESPACE, SPLASH_SCENE_NAMESPACE);
}
