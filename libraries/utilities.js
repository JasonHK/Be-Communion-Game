"use strict";

class Utilities {
    static random(min, max) {
        return (Math.floor(Math.random() * (Math.floor(max) - Math.floor(min))) + Math.floor(min));
    }
}
