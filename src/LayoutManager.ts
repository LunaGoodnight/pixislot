import { Container, Sprite } from "pixi.js";
import { NormalSpin } from "./NormalSpin.ts";
import { FreeSpin } from "./FreeSpin.ts";
import { Background } from "./Background.ts";
import { EnumGameStatus } from "./EnumGameStatus.ts";

// A mapping of class constructors to their keys
const classMap: {
    [key: string]: typeof NormalSpin | typeof FreeSpin | typeof Background;
} = {
    NormalSpin: NormalSpin,
    FreeSpin: FreeSpin,
    Background: Background,
};

export class LayoutManager extends Container {
    private layoutConfig: any;
    private currentState: EnumGameStatus;

    constructor({ layoutConfig }: { layoutConfig: any }) {
        super();
        this.layoutConfig = layoutConfig;
        this.currentState = EnumGameStatus.NormalSpin;
    }

    init(): void {
        this.updateLayout(this.currentState); // Start by loading the default state
    }

    // Function to update the layout dynamically based on the game state
    updateLayout(state: EnumGameStatus): void {
        // this.removeChildren(); // Clear the container before updating

        const layoutData = this.layoutConfig.classes[state]; // Get the layout based on state
        const rootElement = this.createElement(state, layoutData);
        this.addChild(rootElement);
    }

    // Recursively create elements based on JSON structure
    createElement(key: string, elementData: any): Container | Sprite {
        const ClassConstructor = classMap[key];
        if (!ClassConstructor) {
            throw new Error(`Unknown class: ${key}`);
        }

        // Dynamically create the object using the class constructor and pass the layoutConfig
        const element = new ClassConstructor(elementData) as Container | Sprite;

        // Recursively create child elements if it's an object
        if (elementData?.child) {
            Object.keys(elementData.child).forEach((childKey) => {
                const childElement = this.createElement(
                    childKey,
                    elementData.child[childKey]
                );
                element.addChild(childElement as Container | Sprite);
            });
        }

        return element;
    }

    // Method to change the state and update the layout (e.g., switch to FreeSpin)
    setState(state: EnumGameStatus): void {
        this.currentState = state;
        this.updateLayout(state); // Re-render the layout based on the new state
    }
}
