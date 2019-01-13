import IScene from './IScene.js';

export default class Spritesheet extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Spritesheet';
		this.description = 'There are 12 bunnies, but all on one spritesheet. '
		this.description += 'Since all bunnies come from one texture, the render speed should be comparable to as if just a single texture i used.';

		this._bunnyIndex = 1;
	}

	_create(objectCount) {
		for (let i = this._children.length; i < objectCount; ++i) {
			const sprite = this._app.game.add.sprite(0, 0, `spritesheets/bunnies.png`, `spritesheets/bunny${this._bunnyIndex}.png`);
			this._bunnyIndex === 12 ? this._bunnyIndex = 1 : ++this._bunnyIndex;
			sprite.anchor.set(0.5);
			sprite.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);

			this._app.stage.addChild(sprite);
		}
	}
}
