"use strict";

import { InterfaceAssets } from "../../assets/interface-assets";

import { ImageButton } from "../../objects/interactive-objects/image-button";

export const TITLE_SCENE_NAMESPACE = "Title";

export namespace TITLE_SCENE_BUTTONS
{
    export const FULLSCREEN_ENTER: ImageButton.ButtonStyles = {
        regular: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.FullscreenEnter,
        },
        hovered: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.FullscreenEnterHovered,
        },
        active: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.FullscreenEnterActive,
        },
    };
    
    export const FULLSCREEN_EXIT: ImageButton.ButtonStyles = {
        regular: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.FullscreenExit,
        },
        hovered: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.FullscreenExitHovered,
        },
        active: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.FullscreenExitActive,
        },
    };

    export const START: ImageButton.ButtonStyles = {
        regular: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.Start,
        },
        hovered: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.StartHovered,
        },
        active: {
            texture: InterfaceAssets.NAMESPACE,
            frame: InterfaceAssets.Buttons.StartActive,
        },
    };
}

export const PARALLAX_LIMIT = 1920;
export const PARALLAX_STEP = 1;

export namespace PARALLAX_VECTORS
{
    export const SKY = 1;
    export const BACKGROUND = 2;
    export const MIDDLEGROUND = 3;
    export const FOREGROUND = 4;
    export const GROUND = 5;
}
