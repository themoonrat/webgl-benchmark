import IScene from './IScene.js';

export default class SpritesSingleTexture extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Sprites: Single Texture';
		this.description = 'A single bunny texture is used; this scene should test the basic raw sprite rendering power.'
	}

	_create(objectCount) {
		let bunnyIndex = 1;

		for (let i = this._root.children.length; i < objectCount; ++i) {
			const sprite = PIXI.Sprite.from(`images/bunny${bunnyIndex}.png`);
			sprite.anchor.set(0.5);
			sprite.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);
			this._root.addChild(sprite);
			bunnyIndex === 12 ? bunnyIndex = 1 : ++bunnyIndex;
		}
	}
}
