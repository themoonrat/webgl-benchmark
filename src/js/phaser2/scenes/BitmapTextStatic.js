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
			const text = this._app.game.add.bitmapText(0, 0, 'Desyrel', 'WebGL', 35);
			text.align = 'center';
			if (text.anchor) {
				text.anchor.set(0.5);
			} else { // for early v2
				for (let i = 0; i < text.children.length; ++i) {
					text.children[i].x -= text.textWidth * 0.5;
					text.children[i].y -= text.textHeight * 0.5;
				}
			}
			text.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);

			this._app.stage.addChild(text);
		}
	}
}
