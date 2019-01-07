import IScene from './IScene.js';

export default class SingleTextureSingleBaseTexture extends IScene {
    constructor(app, gui) {
        super(app, gui);
    }

    update(delta) {
        for (let i = 0; i < this.root.children.length; ++i) {
            this.root.children[i].rotation += 0.1 * delta;
        }
    }

    _create() {
        const rows = Math.floor(Math.sqrt(this.objectCount));
        const columns = rows;

        const spacingRows = this._app.screen.width / rows;
        const spacingColumns = this._app.screen.height / columns;

        // Try to space out sprites evenly across the screen
        for (let r = 0; r < rows; ++r) {
            for (let c = 0; c < columns; ++c) {
                const sprite = PIXI.Sprite.from('images/bunny1.png');
                sprite.anchor.set(0.5);
                sprite.position.set(spacingRows / 2 + spacingRows * r, spacingColumns / 2 + spacingColumns * c);
                this.root.addChild(sprite);
            }
        }

        // Add any not evenly spaced out in the middle
        for (let i = this.root.children.length; i < this.objectCount; ++i) {
            const sprite = PIXI.Sprite.from('images/bunny1.png');
            sprite.anchor.set(0.5);
            sprite.position.set(screen.width / 2, screen.height / 2);
            this.root.addChild(sprite);
        }
    }
}
