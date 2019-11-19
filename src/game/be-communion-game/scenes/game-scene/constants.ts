"use strict";

import { InterfaceAssets } from "../../assets/interface-assets";

import { ImageButton } from "../../objects/interactive-objects/image-button";

export const GAME_SCENE_NAMESPACE = "Game";

export namespace GAME_SCENE_BUTTONS
{
    export const CURSOR_LEFT: ImageButton.ButtonStyles = {
        regular: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.CursorLeft,
        },
        hovered: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.CursorLeftHovered,
        },
        active: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.CursorLeftActive,
        },
    };
    
    export const CURSOR_RIGHT: ImageButton.ButtonStyles = {
        regular: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.CursorRight,
        },
        hovered: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.CursorRightHovered,
        },
        active: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.CursorRightActive,
        },
    };
}
