import IScene from './IScene.js';

export default class SpritesMultipleTextures extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Sprites: Multiple Textures (12)';
		this.description = 'There are 12 bunnies all using their own texture. '
		this.description += 'Renderers that cannot support multi-texturing will show a decrease in speed compared to a single texture. '
		this.description += 'Those that do support multi-texturing could reach single texture performance if the GPU has enough texture units.';

		this._bunnyIndex = 1;
	}

	_create(objectCount) {
		for (let i = this._children.length; i < objectCount; ++i) {
			const sprite = PIXI.Sprite.from(`images/bunny${this._bunnyIndex}.png`);
			this._bunnyIndex === 12 ? this._bunnyIndex = 1 : ++this._bunnyIndex;
			sprite.anchor.set(0.5);
			sprite.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);

			this._app.stage.addChild(sprite);
		}
	}
}
