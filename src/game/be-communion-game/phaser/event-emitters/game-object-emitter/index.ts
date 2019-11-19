"use strict";

import Phaser from "phaser";
import StrictEventEmitter from "strict-event-emitter-types";

import { GameObjectEvents } from "./game-object-events";

export type GameObjectEmitter<GameObject extends Phaser.GameObjects.GameObject = Phaser.GameObjects.GameObject> = StrictEventEmitter<GameObject, GameObjectEvents>;

