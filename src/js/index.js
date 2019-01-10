import "@babel/polyfill";
import 'url-search-params-polyfill';
import 'keyboardevent-key-polyfill';
import '../vendor/polyfill-append.js';
import '../vendor/polyfill-fixedSeedRandom.js';

import 'normalize.css';
import '../css/style.css';

import * as dat from 'dat.gui';
import Stats from '../vendor/stats.js';

import storage from './storage.js';
import SceneController from './SceneController.js';
import loadPixi from './pixi/loadPixi.js';
import loadPhaser from './phaser/loadPhaser.js';

// setup shared stats instance
const stats = new Stats();
stats.domElement.id = 'stats';

// setup shared gui instance
const gui = new dat.GUI({ autoPlace: false });
gui.domElement.id = 'gui';
gui.width = 300;

// create a centralised div for other elements to sit within
const frameDiv = document.createElement('div');
frameDiv.id = 'frame';
frameDiv.classList.add('center');
frameDiv.append(stats.domElement);
frameDiv.append(gui.domElement);
document.body.append(frameDiv);

const validLibraries = ['Pixi', 'Phaser'];

const guiData = {
	library: validLibraries.includes(storage.get('library')) ? storage.get('library') : validLibraries[0]
};

storage.set('library', guiData.library);

const guiController = gui.add(guiData, 'library', validLibraries)
guiController.onChange((library) => {
	storage.set('library', library);

	window.location.href = storage.url().href;
});

const loadLibrary = guiData.library === 'Phaser' ? loadPhaser : loadPixi;

// only start the scene controller when the correct version of pixi has loaded
loadLibrary(stats, gui)
	.then((app) => {
		new SceneController(app, stats, gui);
		frameDiv.style.visibility = 'visible';
	})
