"use strict";

import Phaser from "phaser";

export interface GameObjectEvents
{
    drag: (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => void;
    dragend: (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => void;
    dragenter: (pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject) => void;
    dragleave: (pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject) => void;
    dragover: (pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject) => void;
    dragstart: (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => void;
    drop: (pointer: Phaser.Input.Pointer, target: Phaser.GameObjects.GameObject) => void;
    pointerdown: (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => void;
    pointermove: (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => void;
    pointerout: (pointer: Phaser.Input.Pointer, event: Phaser.Types.Input.EventData) => void;
    pointerover: (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => void;
    pointerup: (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => void;
    wheel: (pointer: Phaser.Input.Pointer, deltaX: number, deltaY: number, deltaZ: number, event: Phaser.Types.Input.EventData) => void;
}
