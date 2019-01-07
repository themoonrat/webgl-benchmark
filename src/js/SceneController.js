import SingleTextureSingleBaseTexture from './scenes/SingleTextureSingleBaseTexture.js';
import MultipleTexturesMultipleBaseTextures from './scenes/MultipleTexturesMultipleBaseTextures.js';
import MultipleTexturesSingleBaseTexture from './scenes/MultipleTexturesSingleBaseTexture.js';

export default class SceneController {
	constructor(app, stats, gui) {
		this._app = app;
		this._stats = stats;
		this._gui = gui;

		this._scenes = [
			new SingleTextureSingleBaseTexture(app, gui),
			new MultipleTexturesMultipleBaseTextures(app, gui),
			new MultipleTexturesSingleBaseTexture(app, gui)
		];

		this.scene = 0;

		const guiController = this._gui.add(this, 'scene', {
			'1 BaseTexture 1 Texture': 0,
			'12 BaseTextures 12 Textures': 1,
			'1 BaseTexture 12 Texture': 2
		});

		guiController.onChange(() => {
			this.switch(this.scene);
		});

		this.switch(this.scene);

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				if (this.scene === this._scenes.length - 1) {
					this.switch(0);
				} else {
					this.switch(this.scene + 1);
				}
			}
		});
	}

	start() {
		this._app.start();
		this._stats.domElement.style.visibility = 'visible';
		this._gui.domElement.style.visibility = 'visible';
	}

	switch(index) {
		if (index >= 0 && index < this._scenes.length) {
			this.scene = index;

			for (const scene of this._scenes) {
				scene.stop();
			}

			this._scenes[index].start();
		}
	}
}
