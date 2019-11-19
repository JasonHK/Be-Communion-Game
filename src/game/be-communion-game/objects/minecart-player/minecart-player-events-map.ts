"use strict";

import Phaser from "phaser";

import { FruitContainer } from "../fruit-containers/fruit-container";

export interface MinecartPlayerEventsMap
{
    fruitcollected: (fruit: Phaser.Types.Physics.Matter.MatterGameObject<FruitContainer>) => void;
}
