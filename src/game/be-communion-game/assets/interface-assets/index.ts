"use strict";

import { joinAssetsPath } from "../../utilities/join-assets-path";

import { ButtonObjects } from "./button-objects";

import { ASSETS_DIRECTORY } from "../constants";
import {
    INTERFACE_DIRECTORY,
    INTERFACE_NAMESPACE,
    INTERFACE_SPRITES,
} from "./constants";

export namespace InterfaceAssets
{
    export const DIRECTORY: string = joinAssetsPath(ASSETS_DIRECTORY, INTERFACE_DIRECTORY);
    export const NAMESPACE: string = INTERFACE_NAMESPACE;
    export const SPRITES: string = joinAssetsPath(DIRECTORY, INTERFACE_SPRITES);

    export const Buttons: typeof ButtonObjects = ButtonObjects;
}
