import IScene from './IScene.js';

export default class GraphicsSimple extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Graphics: Simple';
		this.description = 'Only a single square graphic type is created; this scene should test the basic raw graphics rendering power.';

		this._colors = [0x29BF12, 0xABFF4F, 0x08BDBD, 0xF21B3F, 0xFF9914];
	}

	_create(objectCount) {
		for (let i = this._children.length; i < objectCount; ++i) {
			const color = this._colors[this._children.length % this._colors.length];
			const graphic = new PIXI.Graphics();
			graphic.beginFill(color);
			graphic.drawRect(-15, -15, 30, 30);
			graphic.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);

			this._app.stage.addChild(graphic);
		}
	}
}
