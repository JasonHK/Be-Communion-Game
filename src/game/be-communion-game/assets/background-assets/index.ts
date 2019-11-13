"use strict";

import { joinAssetsPath } from "../../utilities/join-assets-path";

import { JungleBackgrounds } from "./jungle-backgrounds";

import { ASSETS_DIRECTORY } from "../constants";
import {
    BACKGROUNDS_DIRECTORY,
    BACKGROUNDS_NAMESPACE,
    BACKGROUNDS_SPRITES,
} from "./constants";

export namespace BackgroundAssets
{
    export const DIRECTORY: string = joinAssetsPath(ASSETS_DIRECTORY, BACKGROUNDS_DIRECTORY);
    export const NAMESPACE: string = BACKGROUNDS_NAMESPACE;
    export const SPRITES: string = joinAssetsPath(DIRECTORY, BACKGROUNDS_SPRITES);

    export const Jungle: typeof JungleBackgrounds = JungleBackgrounds;
}
