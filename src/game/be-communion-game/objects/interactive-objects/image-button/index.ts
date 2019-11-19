"use strict";

import isNullLike from "@jasonhk/is-null-like";
import Phaser from "phaser";
import StrictEventEmitter from "strict-event-emitter-types";

import { GameObjectEmitter } from "../../../phaser/event-emitters/game-object-emitter";

import { InteractiveState } from "../interactive-state";

import { ImageButtonEventsMap } from "./image-button-events-map";

export class ImageButton extends Phaser.GameObjects.Image
{
    private readonly _scene: Phaser.Scene;

    private _activeStyle: ImageButton.ButtonStyle;
    private _disabledStyle: ImageButton.ButtonStyle;
    private _hoveredStyle: ImageButton.ButtonStyle;
    private _regularStyle: ImageButton.ButtonStyle;

    private _buttonState: InteractiveState = InteractiveState.REGULAR;

    private _isPointerDown: boolean = false;
    private _isPointerOver: boolean = false;
    private _isScenePointerDown: boolean = false;

    //==================================================================================================
    // Accessors: Public Accessors
    //==================================================================================================

    public get buttonState(): InteractiveState { return this.getButtonState(); }

    public get isDown(): boolean { return (this._buttonState === InteractiveState.ACTIVE); }

    public get isDisabled(): boolean { return (this._buttonState === InteractiveState.DISABLED); }
    public set isDisabled(disabled: boolean)
    {
        this._setButtonState(this._isPointerDown ? InteractiveState.ACTIVE :
                             this._isPointerOver ? InteractiveState.HOVERED :
                                                   InteractiveState.REGULAR);
    }

    //==================================================================================================
    // Constructor: Public Constructor
    //==================================================================================================

    constructor(scene: Phaser.Scene, x: number, y: number, styles: ImageButton.ButtonStyles)
    {
        super(scene, x, y, styles.regular.texture, styles.regular.frame);

        this.setInteractive({ useHandCursor: true });

        this.on("pointerover", this._onPointerOver)
            .on("pointerout", this._onPointerOut)
            .on("pointerdown", this._onPointerDown)
            .on("pointerup", this._onPointerUp);

        scene.input
            .on("pointerdown", this._onScenePointerDown, this)
            .on("pointerdownoutside", this._onScenePointerDown, this)
            .on("pointerup", this._onScenePointerUp, this)
            .on("pointerupoutside", this._onScenePointerUp, this);

        this._scene = scene;
        this._setButtonStyles(styles, false);

        scene.add.existing(this);
    }

    //==================================================================================================
    // Overrides: Phaser.Events.EventEmitter
    //==================================================================================================

    public listenerCount<K extends keyof ImageButtonEventsMap>(event: K): number;
    public listenerCount(event: string | symbol): number;
    public listenerCount<K extends keyof ImageButtonEventsMap>(event: K): number
    {
        return super.listenerCount(event);
    }

    public listeners<K extends keyof ImageButtonEventsMap>(event: K): Function[];
    public listeners(event: string | symbol): Function[];
    public listeners<K extends keyof ImageButtonEventsMap>(event: K): Function[]
    {
        return super.listeners(event);
    }

    public on<K extends keyof ImageButtonEventsMap>(event: K, fn: ImageButtonEventsMap[K], context?: any): this;
    public on(event: string | symbol, fn: Function, context?: any): this;
    public on<K extends keyof ImageButtonEventsMap>(event: K, fn: ImageButtonEventsMap[K], context?: any): this
    {
        return super.on(event, fn, context);
    }

    public once<K extends keyof ImageButtonEventsMap>(event: K, fn: ImageButtonEventsMap[K], context?: any): this;
    public once(event: string | symbol, fn: Function, context?: any): this;
    public once<K extends keyof ImageButtonEventsMap>(event: K, fn: ImageButtonEventsMap[K], context?: any): this
    {
        return super.once(event, fn, context);
    }

    public addListener<K extends keyof ImageButtonEventsMap>(event: K, fn: ImageButtonEventsMap[K], context?: any): this;
    public addListener(event: string | symbol, fn: Function, context?: any): this;
    public addListener<K extends keyof ImageButtonEventsMap>(event: K, fn: ImageButtonEventsMap[K], context?: any): this
    {
        return super.addListener(event, fn, context);
    }

    public off<K extends keyof ImageButtonEventsMap>(event: K, fn: ImageButtonEventsMap[K], context?: any, once?: boolean): this;
    public off(event: string | symbol, fn?: Function, context?: any, once?: boolean): this;
    public off<K extends keyof ImageButtonEventsMap>(event: K, fn: ImageButtonEventsMap[K], context?: any, once?: boolean): this
    {
        return super.off(event, fn, context, once);
    }

    public removeListener<K extends keyof ImageButtonEventsMap>(event: K, fn: ImageButtonEventsMap[K], context?: any, once?: boolean): this;
    public removeListener(event: string | symbol, fn?: Function, context?: any, once?: boolean): this;
    public removeListener<K extends keyof ImageButtonEventsMap>(event: K, fn: ImageButtonEventsMap[K], context?: any, once?: boolean): this
    {
        return super.removeListener(event, fn, context, once);
    }

    public removeAllListeners<K extends keyof ImageButtonEventsMap>(event?: K): this;
    public removeAllListeners(event?: string | symbol): this;
    public removeAllListeners<K extends keyof ImageButtonEventsMap>(event?: K): this
    {
        return super.removeAllListeners(event);
    }

    public emit<K extends keyof ImageButtonEventsMap>(event: K, ...args: Phaser.Types.Events.EmitArguments<ImageButtonEventsMap[K]>): boolean;
    public emit(event: string | symbol, ...args: any[]): boolean;
    public emit<K extends keyof ImageButtonEventsMap>(event: K, ...args: Phaser.Types.Events.EmitArguments<ImageButtonEventsMap[K]>): boolean
    {
        return super.emit(event, ...args);
    }

    //==================================================================================================
    // Methods: Public Methods
    //==================================================================================================

    public getButtonState(): InteractiveState
    {
        return this._buttonState;
    }

    public setButtonStyles(styles: ImageButton.ButtonStyles): this
    {
        this._setButtonStyles(styles, true);
        return this;
    }

    //==================================================================================================
    // Methods: Private Methods
    //==================================================================================================
    
    private _applyButtonStyle(style: ImageButton.ButtonStyle): void
    {
        const { frame, texture } = style;
        (this.texture.key === texture) ? !isNullLike(frame) && this.setFrame(frame)
                                       : this.setTexture(texture, frame);
    }

    private _setButtonState(state: InteractiveState): this
    {
        this._buttonState = state;
        this._updateButtonStyle(state);

        return this;
    }
    
    private _setButtonStyles(styles: ImageButton.ButtonStyles, update: boolean): this
    {
        const { active, disabled, hovered, regular } = styles;
        this._activeStyle = active;
        this._disabledStyle = disabled;
        this._hoveredStyle = hovered;
        this._regularStyle = regular;

        if (update) { this._updateButtonStyle(); }
        return this;
    }

    private _updateButtonStyle(state?: InteractiveState): void
    {
        state = isNullLike(state) ? this._buttonState : state;

        switch (state)
        {
            case InteractiveState.DISABLED:
                this._applyButtonStyle(this._disabledStyle);
                break;
            case InteractiveState.REGULAR:
                this._applyButtonStyle(this._regularStyle);
                break;
            case InteractiveState.HOVERED:
                this._applyButtonStyle(this._hoveredStyle);
                break;
            case InteractiveState.ACTIVE:
                this._applyButtonStyle(this._activeStyle);
                break;
        }
    }

    //==================================================================================================
    // Methods: Event Listeners
    //==================================================================================================

    private _onPointerDown(): void
    {
        this._isPointerDown = true;
        if (!this.isDisabled) { this._setButtonState(InteractiveState.ACTIVE); }
    }

    private _onPointerOut(): void
    {
        this._isPointerOver = false;
        if (!this.isDisabled) { this._setButtonState(InteractiveState.REGULAR); }
    }

    private _onPointerOver(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData): void
    {
        this._isPointerOver = true;
        if (!this.isDisabled)
        {
            this._setButtonState(this._isPointerDown ? InteractiveState.ACTIVE
                                                    : InteractiveState.HOVERED);
            this.emit<"buttondown">("buttondown", this, pointer, localX, localY, event);
        }
    }

    private _onPointerUp(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData): void
    {
        this._isPointerDown = false;
        if (!this.isDisabled)
        {
            this._setButtonState(this._isPointerOver ? InteractiveState.HOVERED
                                                    : InteractiveState.REGULAR);
            this.emit<"buttonup">("buttonup", this, pointer, localX, localY, event);
        }
    }

    private _onScenePointerDown(): void
    {
        this._isScenePointerDown = true;
    }

    private _onScenePointerUp(): void
    {
        this._isScenePointerDown = false;
    }
}

export namespace ImageButton
{
    export interface ButtonStyle
    {
        texture: string;
        frame?: string | number;
        options?: {
            updateOrigin?: boolean;
            updateSize?: boolean;
        };
    }

    export interface ButtonStyles
    {
        regular: ButtonStyle;
        active?: ButtonStyle;
        disabled?: ButtonStyle;
        hovered?: ButtonStyle;
    }
}
