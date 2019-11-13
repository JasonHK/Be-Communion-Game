"use strict";

import Phaser from "phaser";

import { joinAssetsPath } from "../../../utilities/join-assets-path";
import { joinPhaserNamespaces } from "../../../utilities/join-phaser-namespace";

import { BACKGROUNDS_NAMESPACE } from "../constants";
import {
    JUNGLE_BACKGROUND_DIRECTORY,
    JUNGLE_BACKGROUND_FILENAME,
    JUNGLE_BACKGROUND_NAMESPACE,
    JUNGLE_BACKGROUND_LAYERS,
} from "./constants";

export namespace JungleBackgrounds
{
    const DIRECTORY: string = JUNGLE_BACKGROUND_DIRECTORY;

    export const Background: string = joinAssetsPath(DIRECTORY, JUNGLE_BACKGROUND_LAYERS.BACKGROUND);
    export const Foreground: string = joinAssetsPath(DIRECTORY, JUNGLE_BACKGROUND_LAYERS.FOREGROUND);
    export const Ground: string = joinAssetsPath(DIRECTORY, JUNGLE_BACKGROUND_LAYERS.GROUND);
    export const Middleground: string = joinAssetsPath(DIRECTORY, JUNGLE_BACKGROUND_LAYERS.MIDDLEGROUND);
    export const Sky: string = joinAssetsPath(DIRECTORY, JUNGLE_BACKGROUND_LAYERS.SKY);
}
