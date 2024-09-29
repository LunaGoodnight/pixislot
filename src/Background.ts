import { Sprite, Texture } from "pixi.js";

export class Background extends Sprite {
    constructor(layoutConfig: {
        texture: string;
        width: number;
        height: number;
        isFull: boolean;
    }) {
        super();

        // Set the texture, width, and height from the layout configuration
        this.texture = Texture.from(layoutConfig.texture);

        if (layoutConfig.isFull) {
            this.width = window.innerWidth; // Or some other logic to make it full
            this.height = window.innerHeight;
        } else {
            this.width = layoutConfig.width;
            this.height = layoutConfig.height;
        }
    }
}
