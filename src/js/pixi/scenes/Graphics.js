import IScene from './IScene.js';

export default class Graphics extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this._colours = [0x29BF12, 0xABFF4F, 0x08BDBD, 0xF21B3F, 0xFF9914];
	}

	_create(objectCount) {
		for (let i = this.root.children.length; i < objectCount; ++i) {
			const graphic = new PIXI.Graphics();
			graphic.beginFill(this._colours[this.root.children.length % this._colours.length]);
			const type = this.root.children.length % 3;
			if (type === 0 && graphic.drawStar) { // v3 does not support stars
				graphic.drawStar(0, 0, 5, 30, 20, 1);
			} else if (type === 1) {
				graphic.drawRect(-15, -15, 30, 30);
			} else {
				graphic.drawPolygon([-15, -30, 15, 15, -30, 15]);
			}

			graphic.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);
			this.root.addChild(graphic);
		}
	}

	_createStar() {

	}
}
