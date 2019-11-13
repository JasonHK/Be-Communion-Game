"use strict";

import Phaser from "phaser";

import { ProgressIndicator } from "./";

export const INDETERMINATE_TEXT = "Loading...";

export const INDICATOR_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    color: "#FFFFFF",
    fontFamily: "unifont",
    fontSize: "100px",
};
