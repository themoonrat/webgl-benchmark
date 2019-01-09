import IScene from './IScene.js';

export default class GraphicsComplex extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Graphics: Complex';
		this.description = 'One of four complex shapes types are used, making more advanced techniques are used to keep performance up.';

		this._colours = [0x29BF12, 0xABFF4F, 0x08BDBD, 0xF21B3F, 0xFF9914];
	}

	_create(objectCount) {
		for (let i = this._children.length; i < objectCount; ++i) {
			const graphic = new PIXI.Graphics();
			graphic.beginFill(this._colours[this._children.length % this._colours.length]);
			const type = this._children.length % 4;
			if (type === 0) {
				graphic.drawStar(0, 0, 5, 30, 20, 1);
			} else if (type === 1) {
				graphic.drawPolygon([-15, -30, 15, 15, -30, 15]);
			} else if (type === 2) {
				graphic.drawPolygon([-15, -30, -15, 0, 15, 15, -30, 15]);
			} else {
				graphic.drawEllipse(0, 0, 30, 15);
			}

			graphic.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);

			this._app.stage.addChild(graphic);
		}
	}

	_createStar() {

	}
}
