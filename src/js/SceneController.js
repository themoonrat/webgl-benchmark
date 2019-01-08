import storage from './storage.js';

import GraphicsComplex from './pixi/scenes/GraphicsComplex.js';
import GraphicsSimple from './pixi/scenes/GraphicsSimple.js';
import Spritesheet from './pixi/scenes/Spritesheet.js';
import SpritesMultipleTextures from './pixi/scenes/SpritesMultipleTextures.js';
import SpritesSingleTexture from './pixi/scenes/SpritesSingleTexture.js';

export default class SceneController {
	constructor(app, stats, gui) {
		this._app = app;
		this._stats = stats;
		this._gui = gui;

		this._scenes = [
			new SpritesSingleTexture(app, gui),
			new SpritesMultipleTextures(app, gui),
			new Spritesheet(app, gui),
			new GraphicsSimple(app, gui),
			new GraphicsComplex(app, gui)
		];


		this._guiData = {
			scene: parseInt(storage.get('scene'), 10),
			objectCount: parseInt(storage.get('objectCount'), 10)
		};

		if (Number.isNaN(this._guiData.scene)) {
			this._guiData.scene = 0;
		}

		if (Number.isNaN(this._guiData.objectCount)) {
			this._guiData.objectCount = 10000;
		}

		storage.set('scene', this._guiData.scene);
		storage.set('objectCount', this._guiData.objectCount);

		const guiEntries = {};
		this._scenes.forEach((scene, index) => {
			guiEntries[scene.title] = index;
		})

		const guiSceneController = this._gui.add(this._guiData, 'scene', guiEntries);

		guiSceneController.onChange((value) => {
			storage.set('scene', value);
			this.switch(value);
		});

		const guiObjectCountController = this._gui.add(this._guiData, 'objectCount', 0, 100000, 1000);
		guiObjectCountController.onChange((value) => {
			storage.set('objectCount', value);
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
