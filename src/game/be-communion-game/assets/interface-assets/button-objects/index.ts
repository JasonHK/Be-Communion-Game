"use strict";

import { joinAssetsPath } from "../../../utilities/join-assets-path";

import { InterfaceAssets } from "..";

import {
    BUTTONS_DIRECTORY,
    BUTTONS_ENTRIES,
} from "./constants";

export namespace ButtonObjects
{
    const DIRECTORY: string = BUTTONS_DIRECTORY;

    export const Start: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.START);
    export const StartActive: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.START_ACTIVE);
    export const StartHover: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.START_HOVER);
}
