import SingleTextureSingleBaseTexture from './pixi/scenes/SingleTextureSingleBaseTexture.js';
import MultipleTexturesMultipleBaseTextures from './pixi/scenes/MultipleTexturesMultipleBaseTextures.js';
import MultipleTexturesSingleBaseTexture from './pixi/scenes/MultipleTexturesSingleBaseTexture.js';

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

		this._guiData = {
			scene: 0,
			objectCount: 10000
		};

		const guiSceneController = this._gui.add(this._guiData, 'scene', {
			'1 BaseTexture 1 Texture': 0,
			'12 BaseTextures 12 Textures': 1,
			'1 BaseTexture 12 Texture': 2
		});

		guiSceneController.onChange((value) => {
			this.switch(value);
		});

		const guiObjectCountController = this._gui.add(this._guiData, 'objectCount', 0, 100000, 1000);
		guiObjectCountController.onChange((value) => {
			this._scenes[this._guiData.scene].changeObjectCount(value);
		});

		this.switch(this._guiData.scene);

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
			for (const scene of this._scenes) {
				scene.stop();
			}

			this._scenes[index].start(this._guiData.objectCount);
		}
	}
}
