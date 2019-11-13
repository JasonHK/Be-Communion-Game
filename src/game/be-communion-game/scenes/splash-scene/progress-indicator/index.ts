"use strict";

import Phaser from "phaser";

import { INDETERMINATE_TEXT, INDICATOR_STYLE } from "./constants";

export class ProgressIndicator extends Phaser.GameObjects.Text
{
    private _indeterminate: boolean = true;
    private _progress: number = 0;

    public get indeterminate(): boolean { return this.getIndeterminate(); }
    public set indeterminate(indeterminate: boolean) { this.setIndeterminate(indeterminate); }

    public get progress(): number { return this.getProgress(); }
    public set progress(progress: number) { this.setProgress(progress); }

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, "", INDICATOR_STYLE);

        this._setIndicatorText();
        scene.add.existing(this);
    }

    public getIndeterminate(): boolean
    {
        return this._indeterminate;
    }

    public getProgress(): number
    {
        return this._progress;
    }

    public setIndeterminate(indeterminate: boolean): this
    {
        this._indeterminate = indeterminate;
        this._setIndicatorText();

        return this;
    }

    public setProgress(progress: number): this
    {
        this._progress = progress;
        this._setIndicatorText();

        return this;
    }

    private _setIndicatorText(): void
    {
        this._indeterminate ? this.setText(INDETERMINATE_TEXT)
                            : this.setText(`${ Math.floor(this._progress) }%`);
    }
}
