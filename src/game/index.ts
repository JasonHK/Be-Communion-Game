"use strict";

import { BeCommunionGame } from "./be-communion-game";

const element: HTMLElement = document.getElementById("app");
window["game"] = new BeCommunionGame(element);
