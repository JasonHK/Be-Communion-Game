"use strict";

document.title = `${ GameConfig.name }`;

let doDrop = false;
let doCount = false;

let mainGame = new Phaser.Game(PhaserConfig);

let centerDelay;
let mainCanvas = document.querySelector("canvas#game");
window.addEventListener("load", centerCanvas, { once: true });
window.addEventListener("resize", centerCanvas, false);
window.addEventListener("orientationchange", centerCanvas, false);

function centerCanvas() {
    if (centerDelay) {
        clearTimeout(centerDelay);
    }
    centerDelay = setTimeout(() => {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let canvasScale = getScale(mainCanvas);
        let canvasWidth = parseInt(mainCanvas.width * canvasScale);
        let canvasHeight = parseInt(mainCanvas.height * canvasScale);

        let canvasTop = ((windowHeight / 2) - (canvasHeight / 2));
        let canvasLeft = ((windowWidth / 2) - (canvasWidth / 2));
        mainCanvas.style.top = `${ canvasTop }px`;
        mainCanvas.style.left = `${ canvasLeft }px`;
    }, 100);
}

function getScale(canvas) {
    const regexp = /scale\(\d+?(.\d+?)\)/gi;

    let transform = (mainCanvas.style.transform || "");
    let scale = ((regexp.test(transform)) ? parseFloat(transform.match(regexp)[0].split("(")[1].split(")")[0]) : parseFloat("1.0"));
    return scale;
}
