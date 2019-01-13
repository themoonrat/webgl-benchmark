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
import loadPixi from './pixi/load.js';
import loadPhaser2 from './phaser2/load.js';
import loadPhaser3 from './phaser3/load.js';

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

const validLibraries = ['Pixi', 'Phaser2', 'Phaser3'];

const guiData = {
	library: validLibraries.includes(storage.get('library')) ? storage.get('library') : validLibraries[0]
};

storage.set('library', guiData.library);

const guiController = gui.add(guiData, 'library', validLibraries)
guiController.onChange((library) => {
	storage.set('library', library);

	window.location.href = storage.url().href;
});

let loadLibrary;
if (storage.get('library') === 'Phaser2') {
	loadLibrary = loadPhaser2;
} else if (storage.get('library') === 'Phaser3') {
	loadLibrary = loadPhaser3;
} else {
	loadLibrary = loadPixi;
}

// only start the scene controller when the correct version of pixi has loaded
loadLibrary(stats, gui)
	.then((app) => {
		new SceneController(app, stats, gui);
		frameDiv.style.visibility = 'visible';

		resize(app);
		window.addEventListener('resize', (e) => {
			resize(app);
		})
	})


function resize(app) {
	let width = Math.min(window.innerWidth, 960);
	let height = Math.min(window.innerHeight, 540);

	const ratio = width / height;
	const requiredRatio = 960 / 540;

	if (ratio > requiredRatio) {
		width = height * requiredRatio;
	} else {
		height = width / requiredRatio;
	}

	frameDiv.style.width = app.canvas.style.width = `${width}px`;
	frameDiv.style.height = app.canvas.style.height = `${height}px`;
}
