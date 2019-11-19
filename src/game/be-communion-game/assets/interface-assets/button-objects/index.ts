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

    export const CursorLeft: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.CURSOR_LEFT);
    export const CursorLeftActive: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.CURSOR_LEFT_ACTIVE);
    export const CursorLeftHovered: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.CURSOR_LEFT_HOVERED);

    export const CursorRight: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.CURSOR_RIGHT);
    export const CursorRightActive: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.CURSOR_RIGHT_ACTIVE);
    export const CursorRightHovered: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.CURSOR_RIGHT_HOVERED);

    export const FullscreenEnter: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.FULLSCREEN_ENTER);
    export const FullscreenEnterActive: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.FULLSCREEN_ENTER_ACTIVE);
    export const FullscreenEnterHovered: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.FULLSCREEN_ENTER_HOVERED);

    export const FullscreenExit: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.FULLSCREEN_EXIT);
    export const FullscreenExitActive: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.FULLSCREEN_EXIT_ACTIVE);
    export const FullscreenExitHovered: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.FULLSCREEN_EXIT_HOVERED);

    export const Start: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.START);
    export const StartActive: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.START_ACTIVE);
    export const StartHovered: string = joinAssetsPath(DIRECTORY, BUTTONS_ENTRIES.START_HOVERED);
}
