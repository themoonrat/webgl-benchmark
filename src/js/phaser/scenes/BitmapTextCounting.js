import IScene from './IScene.js';

export default class BitmapTextCounting extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Text: Bitmap Counting';
		this.description = 'Text created via the Bitmap Fonts. ';
		this.description += 'Only 1 in a hundred of the visible texts update each frame. ';
		this.description += 'Advantages: Fastest way to render text. Changing text does not effect rendering performance. ';
		this.description += 'Disadvantages: Cannot change text style dynamically at run time. ';

		this._frameCount = 0;
	}

	_update(time, deltaMS) {
		super._update(time, deltaMS);

		const childrenToCount = this._children.length / 100 || 0;
		++this._frameCount;

		for (let i = this._children.length - childrenToCount; i < this._children.length; ++i) {
			this._children[i].text = this._frameCount;
		}
	}

	_create(objectCount) {
		for (let i = 0; i < this._children.length; ++i) {
			this._children[i].text = 'WebGL';
		}

		for (let i = this._children.length; i < objectCount; ++i) {
			const text = this._app.scene.add.bitmapText(0, 0, 'Desyrel', 'WebGL', 35, 'center');
			text.setOrigin(0.5);
			text.setPosition(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);
		}
	}

	_destroy(objectCount = 0) {
		super._destroy(objectCount);
		for (let i = 0; i < this._children.length; ++i) {
			this._children[i].text = 'WebGL';
		}
	}
}
