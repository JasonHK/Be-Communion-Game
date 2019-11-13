"use strict";

import { joinAssetsPath } from "../../../utilities/join-assets-path";

import {
    FRUITS_DIRECTORY,
    FRUITS_ENTRIES,
} from "./constants";

export namespace FruitObjects
{
    const DIRECTORY: string = FRUITS_DIRECTORY;

    export const AppleGreen: string = joinAssetsPath(DIRECTORY, FRUITS_ENTRIES.APPLE_GREEN);
    export const AppleGreenLeaf: string = joinAssetsPath(DIRECTORY, FRUITS_ENTRIES.APPLE_GREEN_LEAF);
    export const AppleRed: string = joinAssetsPath(DIRECTORY, FRUITS_ENTRIES.APPLE_RED);
    export const AppleRedLeaf: string = joinAssetsPath(DIRECTORY, FRUITS_ENTRIES.APPLE_RED_LEAF);
    export const Lemon: string = joinAssetsPath(DIRECTORY, FRUITS_ENTRIES.LEMON);
    export const Orange: string = joinAssetsPath(DIRECTORY, FRUITS_ENTRIES.ORANGE);
    export const Pear: string = joinAssetsPath(DIRECTORY, FRUITS_ENTRIES.PEAR);
}
