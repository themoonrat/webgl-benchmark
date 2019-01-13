import IScene from './IScene.js';

export default class CanvasTextStatic extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Text: Canvas Static';
		this.description = 'Text created via the Canvas API, with the canvas then used as a texture for a sprite. ';
		this.description += 'Advantages: Dynamic and flexible styling. ';
		this.description += 'Disadvantages: Textures have to be re-created and uploaded to the GPU each time the text or style changes, which can be slow. ';
		this.description += 'Also, because each text has its own texture, the GPU is swapping between them a lot. ';

		this._colors = [0x29BF12, 0xABFF4F, 0x18BDBD, 0xF21B3F, 0xFF9914];
	}

	_create(objectCount) {
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
}
