"use strict";

import Phaser from "phaser";

import { ObjectAssets } from "../../assets/object-assets";

import { FruitContainer } from "../fruit-containers/fruit-container";
import { PhaserifyBody } from "../phaserify-body";

import { MinecartPlayerEventsMap } from "./minecart-player-events-map";

import {
    MATTER_BODY_LABELS,
    MINECART_VERTICAL_POSITION
} from "./constants";

export class MinecartPlayer extends Phaser.Events.EventEmitter
        implements Phaser.Physics.Matter.Components.Velocity
{
    private readonly _scene: Phaser.Scene;

    private _minecart: Phaser.Physics.Matter.Image;
    private _player: Phaser.Physics.Matter.Image;
    private _sensor: Phaser.Physics.Matter.Image;

    //==================================================================================================
    // Constructor: Public Constructor
    //==================================================================================================

    constructor(scene: Phaser.Scene)
    {
        super();

        this._scene = scene;

        const shapes = scene.cache.json.get("Shapes.Objects");

        this._player = scene.matter.add.image(0, 0, ObjectAssets.NAMESPACE, ObjectAssets.Minecart, { shape: shapes.player })
            .setPosition(500, MINECART_VERTICAL_POSITION)
            .setDepth(3)
            .setIgnoreGravity(true);
        scene.matter.body.setInertia(this._player.body, Infinity);

        this._sensor = scene.matter.add.image(0, 0, ObjectAssets.NAMESPACE, ObjectAssets.Minecart, { shape: shapes.player_sensor })
            .setPosition(500, MINECART_VERTICAL_POSITION - 47)
            .setDepth(3)
            .setVisible(false)
            .setIgnoreGravity(true);

        this._minecart = scene.matter.add.image(0, 0, ObjectAssets.NAMESPACE, ObjectAssets.Minecart, { shape: shapes.minecart })
            .setPosition(500, MINECART_VERTICAL_POSITION)
            .setDepth(3)
            .setVisible(false)
            .setIgnoreGravity(true);

        scene.events.on("update", this._onUpdate, this);

        scene.matter.world.on("collisionstart", this._onCollisionStart, this);
    }

    //==================================================================================================
    // Overrides: Phaser.Events.EventEmitter
    //==================================================================================================

    public listenerCount<K extends keyof MinecartPlayerEventsMap>(event: K): number;
    public listenerCount(event: string | symbol): number;
    public listenerCount<K extends keyof MinecartPlayerEventsMap>(event: K): number
    {
        return super.listenerCount(event);
    }

    public listeners<K extends keyof MinecartPlayerEventsMap>(event: K): Function[];
    public listeners(event: string | symbol): Function[];
    public listeners<K extends keyof MinecartPlayerEventsMap>(event: K): Function[]
    {
        return super.listeners(event);
    }

    public on<K extends keyof MinecartPlayerEventsMap>(event: K, fn: MinecartPlayerEventsMap[K], context?: any): this;
    public on(event: string | symbol, fn: Function, context?: any): this;
    public on<K extends keyof MinecartPlayerEventsMap>(event: K, fn: MinecartPlayerEventsMap[K], context?: any): this
    {
        return super.on(event, fn, context);
    }

    public once<K extends keyof MinecartPlayerEventsMap>(event: K, fn: MinecartPlayerEventsMap[K], context?: any): this;
    public once(event: string | symbol, fn: Function, context?: any): this;
    public once<K extends keyof MinecartPlayerEventsMap>(event: K, fn: MinecartPlayerEventsMap[K], context?: any): this
    {
        return super.once(event, fn, context);
    }

    public addListener<K extends keyof MinecartPlayerEventsMap>(event: K, fn: MinecartPlayerEventsMap[K], context?: any): this;
    public addListener(event: string | symbol, fn: Function, context?: any): this;
    public addListener<K extends keyof MinecartPlayerEventsMap>(event: K, fn: MinecartPlayerEventsMap[K], context?: any): this
    {
        return super.addListener(event, fn, context);
    }

    public off<K extends keyof MinecartPlayerEventsMap>(event: K, fn: MinecartPlayerEventsMap[K], context?: any, once?: boolean): this;
    public off(event: string | symbol, fn?: Function, context?: any, once?: boolean): this;
    public off<K extends keyof MinecartPlayerEventsMap>(event: K, fn: MinecartPlayerEventsMap[K], context?: any, once?: boolean): this
    {
        return super.off(event, fn, context, once);
    }

    public removeListener<K extends keyof MinecartPlayerEventsMap>(event: K, fn: MinecartPlayerEventsMap[K], context?: any, once?: boolean): this;
    public removeListener(event: string | symbol, fn?: Function, context?: any, once?: boolean): this;
    public removeListener<K extends keyof MinecartPlayerEventsMap>(event: K, fn: MinecartPlayerEventsMap[K], context?: any, once?: boolean): this
    {
        return super.removeListener(event, fn, context, once);
    }

    public removeAllListeners<K extends keyof MinecartPlayerEventsMap>(event?: K): this;
    public removeAllListeners(event?: string | symbol): this;
    public removeAllListeners<K extends keyof MinecartPlayerEventsMap>(event?: K): this
    {
        return super.removeAllListeners(event);
    }

    public emit<K extends keyof MinecartPlayerEventsMap>(event: K, ...args: Phaser.Types.Events.EmitArguments<MinecartPlayerEventsMap[K]>): boolean;
    public emit(event: string | symbol, ...args: any[]): boolean;
    public emit<K extends keyof MinecartPlayerEventsMap>(event: K, ...args: Phaser.Types.Events.EmitArguments<MinecartPlayerEventsMap[K]>): boolean
    {
        return super.emit(event, ...args);
    }

    //==================================================================================================
    // Implements: Phaser.Physics.Matter.Components.Velocity
    //==================================================================================================

    public setAngularVelocity(): this
    {
        return this;
    }

    public setVelocity(x: number): this
    {
        this.setVelocityX(x);
        return this;
    }

    public setVelocityX(velocity: number): this
    {
        this._player.setVelocityX(velocity);
        this._sensor.setX(this._player.x);
        this._minecart.setX(this._player.x);

        return this;
    }

    public setVelocityY(): this
    {
        return this;
    }

    //==================================================================================================
    // Methods: Event Listeners
    //==================================================================================================

    private _onCollisionStart(event: Phaser.Physics.Matter.Events.CollisionStartEvent, bodyA: Phaser.Physics.Matter.Body, bodyB: Phaser.Physics.Matter.Body): void
    {
        if (bodyA.label === MATTER_BODY_LABELS.FRUITS_SENSOR)
        {
            if ((bodyB.label === MATTER_BODY_LABELS.FRUIT_BODY) && (bodyB.gameObject instanceof FruitContainer))
            {
                this.emit<"fruitcollected">("fruitcollected", bodyB.gameObject as any);
            }
        }
        else if (bodyB.label === MATTER_BODY_LABELS.FRUITS_SENSOR)
        {
            if ((bodyA.label === MATTER_BODY_LABELS.FRUIT_BODY) && (bodyB.gameObject instanceof FruitContainer))
            {
                this.emit<"fruitcollected">("fruitcollected", bodyB.gameObject as any);
            }
        }
    }

    private _onUpdate(): void
    {
        this._player.setY(MINECART_VERTICAL_POSITION);
        this._sensor.setY(MINECART_VERTICAL_POSITION - 47);
        this._minecart.setY(MINECART_VERTICAL_POSITION);

        this._sensor.setX(this._player.x);
        this._minecart.setX(this._player.x);
    }
}
