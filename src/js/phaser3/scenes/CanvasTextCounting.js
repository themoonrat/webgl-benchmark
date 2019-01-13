import IScene from './IScene.js';

export default class CanvasTextCounting extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Text: Canvas Counting';
		this.description = 'Text created via the Canvas API, with the canvas then used as a texture for a sprite. ';
		this.description += 'Only 1 in a hundred of the visible texts update each frame. ';
		this.description += 'Advantages: Dynamic and flexible styling. ';
		this.description += 'Disadvantages: Textures have to be re-created and uploaded to the GPU each time the text or style changes, which can be slow. ';
		this.description += 'Also, because each text has its own texture, the GPU is swapping between them a lot. ';

		this._colors = [0x29BF12, 0xABFF4F, 0x18BDBD, 0xF21B3F, 0xFF9914];

		this._frameCount = 0;
	}

	_update(delta) {
		super._update(delta);

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
			const color = this._colors[this._children.length % this._colors.length];
			const text = this._app.scene.add.text(0, 0, 'WebGL', {
				fontFamily: 'Arial',
				fontSize: 30,
				color: `#${color.toString(16)}`,
				shadow: {
					offsetX: 1,
					offsetY: 1,
					color: '#000000',
					blur: 1,
					stroke: true,
					fill: true
				}
			});
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
