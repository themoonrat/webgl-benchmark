import "@babel/polyfill";
import 'url-search-params-polyfill';
import 'keyboardevent-key-polyfill';
import '../vendor/polyfill-append.js';

import 'normalize.css';
import '../css/style.css';

import * as dat from 'dat.gui';
import Stats from '../vendor/stats.js';

import SceneController from './SceneController.js';
import loadPixi from './pixi/loadPixi.js';

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

// only start the scene controller when the correct version of pixi has loaded
loadPixi(stats, gui)
	.then((app) => {
		const sceneController = new SceneController(app, stats, gui);
		sceneController.start();
	})
	.catch((error) => {
		console.error(error.toString());
	})
