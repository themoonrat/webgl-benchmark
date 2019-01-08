import IScene from './IScene.js';

export default class SpritesMultipleTextures extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Sprites: Multiple Textures (12)';
		this.description = 'There are 12 bunnies all using their own texture. '
		this.description += 'Renderers that cannot support multi-texturing will show a decrease in speed compared to a single texture. '
		this.description += 'Those that do support multi-texturing could reach single texture performance if the GPU has enough texture units.';
	}

	_create(objectCount) {
		let bunnyIndex = 1;

		for (let i = this._root.children.length; i < objectCount; ++i) {
			const sprite = PIXI.Sprite.from(`spritesheets/bunny${bunnyIndex}.png`);
			sprite.anchor.set(0.5);
			sprite.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);
			this._root.addChild(sprite);
			bunnyIndex === 12 ? bunnyIndex = 1 : ++bunnyIndex;
		}
	}
}
