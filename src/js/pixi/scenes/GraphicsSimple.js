import IScene from './IScene.js';

export default class GraphicsSimple extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Graphics: Simple';
		this.description = 'Only a single square graphic type is created; this scene should test the basic raw graphics rendering power.';

		this._colours = [0x29BF12, 0xABFF4F, 0x08BDBD, 0xF21B3F, 0xFF9914];
	}

	_create(objectCount) {
		for (let i = this._root.children.length; i < objectCount; ++i) {
			const graphic = new PIXI.Graphics();
			graphic.beginFill(this._colours[this._root.children.length % this._colours.length]);
			graphic.drawRect(-15, -15, 30, 30);
			graphic.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);
			this._root.addChild(graphic);
		}
	}
}
