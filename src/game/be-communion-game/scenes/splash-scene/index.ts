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
{
    private _indicator: ProgressIndicator;

    constructor()
    {
        super({ key: SplashScene.NAMESPACE });
    }

    public init(): void {}

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

    public create(): void
    {
        this._indicator = new ProgressIndicator(this, 0, 0)
            .setOrigin(0.5)
            .setX(this.sys.canvas.width / 2)
            .setY(this.sys.canvas.height / 2);

        this.load.once("complete", this._onLoadComplete.bind(this));
        this.load.once("start", this._onLoadStart.bind(this));

        this.load.on("progress", this._onLoadProgress.bind(this));

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

        this.load.image("Objects.Minecart", "assets/objects/minecart.png");
        this.load.image("Objects.Fruits.Apple", "assets/objects/fruits/apple.png");
        this.load.json("Shapes.Objects", "assets/objects/shapes.json");

        this.load.start();
    }

    public update(): void {}

    private _loadTitleScene(): void
    {
        this.scene.start(TitleScene.NAMESPACE);
        this.scene.stop();
    }

    private _onLoadComplete(): void
    {
        this._indicator.setProgress(100);
        setTimeout((): void => { this._loadTitleScene(); }, 1000);
    }

    private _onLoadProgress(progress: number): void
    {
        this._indicator.setProgress(progress);
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
