"use strict";

import { joinAssetsPath } from "../../utilities/join-assets-path";

import { FruitObjects } from "./fruit-objects";

import { ASSETS_DIRECTORY } from "../constants";
import {
    OBJECTS_DIRECTORY,
    OBJECTS_ENTRIES,
    OBJECTS_NAMESPACE,
    OBJECTS_SHAPES,
    OBJECTS_SPRITES,
} from "./constants";

export namespace ObjectAssets
{
    export const DIRECTORY: string = joinAssetsPath(ASSETS_DIRECTORY, OBJECTS_DIRECTORY);
    export const NAMESPACE: string = OBJECTS_NAMESPACE;
    export const SHAPES: string = joinAssetsPath(DIRECTORY, OBJECTS_SHAPES);
    export const SPRITES: string = joinAssetsPath(DIRECTORY, OBJECTS_SPRITES);

    export const Fruits: typeof FruitObjects = FruitObjects;

    export const Minecart: string = OBJECTS_ENTRIES.MINECART;
}
