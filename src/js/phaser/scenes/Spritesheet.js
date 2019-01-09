import IScene from './IScene.js';

export default class Spritesheet extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Spritesheet';
		this.description = 'There are 12 bunnies, but all on one spritesheet. '
		this.description += 'Since all bunnies come from one texture, the render speed should be comparable to as if just a single texture i used.';
	}

	_create(objectCount) {
		let bunnyIndex = 1;

		for (let i = this._children.length; i < objectCount; ++i) {
			const sprite = this._app.scene.add.sprite(0, 0, `spritesheets/bunnies.png`, `spritesheets/bunny${bunnyIndex}.png`);
			bunnyIndex === 12 ? bunnyIndex = 1 : ++bunnyIndex;
			sprite.setPosition(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);
		}
	}
}
