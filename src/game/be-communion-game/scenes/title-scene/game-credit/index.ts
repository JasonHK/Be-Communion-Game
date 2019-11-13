"use strict";

import isNullLike from "@jasonhk/is-null-like";
import Phaser from "phaser";

import { CREDIT_STYLE } from "./constants";

export class GameCredit extends Phaser.GameObjects.Text
{
    private _author: string;
    private _title: string;
    private _version: string;
    private _year: number;

    constructor(scene: Phaser.Scene, x: number, y: number, config: GameCredit.Config)
    {
        super(scene, x, y, "", CREDIT_STYLE);
        
        this.setPadding(10, 10, 10, 10);

        const { author, title, version, year } = config;
        this._author = author;
        this._title = title;
        this._version = version;
        this._year = year;
        this._setCreditText();

        scene.add.existing(this);
    }

    public setAuthor(author: string): this
    {
        this._author = author;
        this._setCreditText();

        return this;
    }

    public setTitle(title: string): this
    {
        this._title = title;
        this._setCreditText();
        
        return this;
    }

    public setVersion(version: string): this
    {
        this._version = version;
        this._setCreditText();
        
        return this;
    }

    public setYear(year: number): this
    {
        this._year = year;
        this._setCreditText();
        
        return this;
    }

    private _setCreditText(): void
    {
        const info = `${ this._title }${ isNullLike(this._version) ? "" : ` v${ this._version }` }`;
        const copyright = `©${ isNullLike(this._year) ? "" : ` ${ this._year }` } ${ this._author }`;

        this.setText([info, copyright]);
    }
}

export namespace GameCredit
{
    export interface Config
    {
        author: string;
        title: string;
        version?: string;
        year?: number;
    }
}
