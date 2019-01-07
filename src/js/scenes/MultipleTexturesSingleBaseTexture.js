import IScene from './IScene.js';

export default class MultipleTextureSingleBaseTexture extends IScene {
	constructor(app, gui) {
		super(app, gui);
	}

	_create() {
		let bunnyIndex = 1;

		for (let i = this.root.children.length; i < this.objectCount; ++i) {
			const sprite = PIXI.Sprite.from(`spritesheets/bunny${bunnyIndex}.png`);
			sprite.anchor.set(0.5);
			sprite.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);
			this.root.addChild(sprite);
			bunnyIndex === 12 ? bunnyIndex = 1 : ++bunnyIndex;
		}
	}
}
