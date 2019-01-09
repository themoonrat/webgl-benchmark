import IScene from './IScene.js';

export default class SpritesSingleTexture extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Sprites: Single Texture';
		this.description = 'A single bunny texture is used; this scene should test the basic raw sprite rendering power.'
	}

	_create(objectCount) {
		for (let i = this._children.length; i < objectCount; ++i) {
			const sprite = PIXI.Sprite.from('images/bunny1.png');
			sprite.anchor.set(0.5);
			sprite.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);

			this._root.addChild(sprite);
		}
	}
}
