"use strict";

import Phaser from "phaser";

import { ImageButton } from "./";

export interface ImageButtonEventsMap extends Phaser.Types.GameObjects.GameObjectEventsMap
{
    buttondown: (button: ImageButton, pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => void;
    buttonup: (button: ImageButton, pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => void;
}
