import IScene from './IScene.js';

export default class SpritesAndGraphics extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Sprites and Graphics';
		this.description = 'A mix of individual sprites, sprites from a spritesheet and graphics';

		this._colors = [0x29BF12, 0xABFF4F, 0x08BDBD, 0xF21B3F, 0xFF9914];
		this._bunnyIndex = 1;
		this._shapeIndex = 0;
	}

	_create(objectCount) {
		for (let i = this._children.length; i < objectCount; ++i) {
			if (i % 20 < 7) {
				const sprite = PIXI.Sprite.from(`images/bunny${this._bunnyIndex}.png`);
				this._bunnyIndex === 12 ? this._bunnyIndex = 1 : ++this._bunnyIndex;
				sprite.anchor.set(0.5);
				sprite.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);

				this._app.stage.addChild(sprite);
			} else if (i % 20 < 14) {
				const sprite = PIXI.Sprite.from(`spritesheets/bunny${this._bunnyIndex}.png`);
				this._bunnyIndex === 12 ? this._bunnyIndex = 1 : ++this._bunnyIndex;
				sprite.anchor.set(0.5);
				sprite.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);

				this._app.stage.addChild(sprite);
			} else if ( i % 20 < 18 ) {
				const color = this._colors[this._children.length % this._colors.length];
				const graphic = new PIXI.Graphics();
				graphic.beginFill(color);
				graphic.drawRect(-15, -15, 30, 30);
				graphic.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);

				this._app.stage.addChild(graphic);
			} else {
				const color = this._colors[this._children.length % this._colors.length];
				const graphic = new PIXI.Graphics();
				graphic.beginFill(color);

				if (this._shapeIndex === 0) {
					graphic.drawStar(0, 0, 5, 30, 20, 1);
				} else if (this._shapeIndex === 1) {
					graphic.drawPolygon([-15, -30, 15, 15, -30, 15]);
				} else if (this._shapeIndex === 2) {
					graphic.drawPolygon([-15, -30, -15, 0, 15, 15, -30, 15]);
				} else {
					graphic.drawEllipse(0, 0, 30, 15);
				}

				this._shapeIndex === 4 ? this._shapeIndex = 0 : ++this._shapeIndex;

				graphic.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);

				this._app.stage.addChild(graphic);
			}
		}
	}
}
