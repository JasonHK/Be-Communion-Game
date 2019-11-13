"use strict";

import Phaser from "phaser";

import { ObjectAssets } from "../../../assets/object-assets";

import { LABEL_STYLE } from "./constants";

export class FruitContainer extends Phaser.GameObjects.Container
{
    protected readonly _fruit: Phaser.GameObjects.Image;
    protected readonly _label: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, fruit: string, x?: number, y?: number, label?: string, style?: Phaser.Types.GameObjects.Text.TextStyle)
    {
        super(scene, x, y);

        this._fruit = scene.add.image(undefined, undefined, ObjectAssets.NAMESPACE, fruit);
            //.setOrigin(0.5, 0.58);
        this.addAt(this._fruit, 0);

        this._label = scene.add.text(undefined, undefined, label || "", Object.assign({}, LABEL_STYLE, style))
            .setOrigin(0.5);
        this.addAt(this._label, 1);

        scene.add.existing(this);
    }

    public setLabelText(text: string | string[]): this
    {
        this._label.setText(text);
        return this;
    }
}
