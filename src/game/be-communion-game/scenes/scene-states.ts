"use strict";

export interface SceneStates
{
    parallax?: SceneStates.Parallax;
}

export namespace SceneStates
{
    export interface Parallax
    {
        offset: number;
    }
}
