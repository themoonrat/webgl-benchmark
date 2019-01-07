import IScene from './IScene.js';

export default class SingleTextureSingleBaseTexture extends IScene {
	constructor(app, gui) {
		super(app, gui);
	}

	_create() {
		for (let i = this.root.children.length; i < this.objectCount; ++i) {
			const sprite = PIXI.Sprite.from('images/bunny1.png');
			sprite.anchor.set(0.5);
			sprite.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);
			this.root.addChild(sprite);
		}
	}
}
