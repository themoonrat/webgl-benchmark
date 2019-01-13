import storage from './storage.js';

import pixiScenes from './pixi/scenes.js'
import phaser2Scenes from './phaser2/scenes.js'
import phaser3Scenes from './phaser3/scenes.js'

export default class SceneController {
	constructor(app, stats, gui) {
		this._app = app;
		this._stats = stats;
		this._gui = gui;

		this._scenes = [];

		let sceneList;
		if (storage.get('library') === 'Phaser2') {
			sceneList = phaser2Scenes;
		} else if (storage.get('library') === 'Phaser3') {
			sceneList = phaser3Scenes;
		} else {
			sceneList = pixiScenes;
		}

		for (const Scene of sceneList) {
			this._scenes.push(new Scene(app, gui));
		}

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
			this._switch(value);
		});

		const guiObjectCountController = this._gui.add(this._guiData, 'objectCount', 0, 100000, 1000);
		guiObjectCountController.onChange((value) => {
			storage.set('objectCount', value);
			this._scenes[this._guiData.scene].changeObjectCount(value);
		});

		this._switch(this._guiData.scene);

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				if (this.scene === this._scenes.length - 1) {
					this._switch(0);
				} else {
					this._switch(this.scene + 1);
				}
			}
		});
	}

	_switch(index) {
		if (index >= 0 && index < this._scenes.length) {
			for (const scene of this._scenes) {
				scene.stop();
			}

			this._scenes[index].start(this._guiData.objectCount);
		}
	}
}
