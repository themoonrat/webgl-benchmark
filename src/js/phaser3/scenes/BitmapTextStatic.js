import IScene from './IScene.js';

export default class BitmapTextStatic extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Text: Bitmap Static';
		this.description = 'Text created via the Bitmap Fonts. ';
		this.description += 'Advantages: Fastest way to render text. ';
		this.description += 'Disadvantages: Cannot change text style dynamically at run time. ';
	}

	_create(objectCount) {
		for (let i = this._children.length; i < objectCount; ++i) {
			const text = this._app.scene.add.bitmapText(0, 0, 'Desyrel', 'WebGL', 35, 'center');
			text.setOrigin(0.5);
			text.setPosition(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);
		}
	}
}
