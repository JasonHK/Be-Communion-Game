"use strict";

class Autoscale {
    constructor(canvas, parent, scale) {
        this.scratch = new Float32Array(2);
        
        this.canvas = canvas;
        this.isSvg = (this.canvas.nodeName.toUpperCase() === "SVG");

        this.canvas.style.position = (this.canvas.style.position || "absolute");
        this.canvas.style.top = 0;
        this.canvas.style.left = 0;

        this.scale = (parseFloat(scale || 1));
        this.parent = parent;

        this.resize = this.resize.bind(this);
        this.resize();
    }
    
    resize() {
        let width, height;

        let p = (this.parent || this.canvas.parentNode);
        if (typeof p === "function") {
            let dims   = (p(scratch) || scratch);
            width  = dims[0];
            height = dims[1];
        } else if (p && (p !== document.body)) {
            let pSize  = this.getSize(p);
            width  = (pSize[0] || 0);
            height = (pSize[1] || 0);
        } else {
            width  = window.innerWidth;
            height = window.innerHeight;
        }

        if (this.isSvg) {
            this.canvas.setAttribute("width", `${ width * this.scale }px`);
            this.canvas.setAttribute("height", `${ height * this.scale }px`);
        } else {
            this.canvas.width = width * this.scale;
            this.canvas.height = height * this.scale;
        }

        this.canvas.style.width = `${ width }px`;
        this.canvas.style.height = `${ height }px`;
    }

    getSize(element) {
        let temporary = false;

        if ((element === window) || (element === document.body)) {
            return [window.innerWidth, window.innerHeight];
        }

        if (!element.parentNode) {
            temporary = true;
            document.body.appendChild(element);
        }

        let bounds = element.getBoundingClientRect();
        let styles = getComputedStyle(element);
        let width  = (bounds.width|0) + this.parse(styles.getPropertyValue("margin-left")) + this.parse(styles.getPropertyValue("margin-right"));
        let height = (bounds.height|0) + this.parse(styles.getPropertyValue("margin-top")) + this.parse(styles.getPropertyValue("margin-bottom"));

        if (temporary) {
            document.body.removeChild(element);
        }
      
        return [width, height];
    }

    parse(property) {
        return (parseFloat(property) || 0);
    }
}
