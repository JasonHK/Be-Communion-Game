"use strict";

import Phaser from "phaser";

import { ObjectAssets } from "../../assets/object-assets";

import { FruitContainer } from "./fruit-container";

export class AppleRedContainer extends FruitContainer
{
    constructor(scene: Phaser.Scene, x?: number, y?: number)
    {
        super(scene, ObjectAssets.Fruits.AppleRed, x, y);

        this._fruit.setOrigin(0.5, 0.58);
    }
}
