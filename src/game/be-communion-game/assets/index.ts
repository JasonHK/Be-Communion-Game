"use strict";

import { BackgroundAssets } from "./background-assets";
import { InterfaceAssets } from "./interface-assets";
import { ObjectAssets } from "./object-assets";

import {
    ASSETS_DIRECTORY,
    ASSETS_NAMESPACE,
} from "./constants";

export namespace Assets
{
    export const DIRECTORY: string = ASSETS_DIRECTORY;
    export const NAMESPACE: string = ASSETS_NAMESPACE;
    
    export const Backgrounds: typeof BackgroundAssets = BackgroundAssets;
    export const Interface: typeof InterfaceAssets = InterfaceAssets;
    export const Objects: typeof ObjectAssets = ObjectAssets;
}
