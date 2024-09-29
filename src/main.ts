import "./style.css";

import { Application, Assets } from "pixi.js";
import layoutConfig from "./../layoutConfig.json";
import { LayoutManager } from "./LayoutManager.ts";
import { EnumGameStatus } from "./EnumGameStatus.ts";
// Asynchronous IIFE
(async () => {
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container
    const app = new Application();

    // Wait for the Renderer to be available
    await app.init({ background: "#1099bb", resizeTo: window });

    // The application will create a canvas element for you that you
    // can then insert into the DOM
    document.body.appendChild(app.canvas);
    const arr = layoutConfig.assets;
    // load the texture we need
    await Assets.load([...arr]);
    const layoutManager = new LayoutManager({ layoutConfig });
    layoutManager.updateLayout(EnumGameStatus.NormalSpin);
    app.stage.addChild(layoutManager);
})();
