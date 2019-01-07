import "@babel/polyfill";
import 'url-search-params-polyfill';
import 'keyboardevent-key-polyfill';
import '../vendor/polyfill-append.js';

import 'normalize.css';
import '../css/style.css';

import * as dat from 'dat.gui';
import Stats from '../vendor/stats.js';
import loadPixi from './loadPixi.js';
import SceneController from './SceneController.js';

const stats = new Stats();
stats.domElement.id = 'stats';

const gui = new dat.GUI({ autoPlace: false });
gui.domElement.id = 'gui';

const frameDiv = document.createElement('div');
frameDiv.id = 'frame';
frameDiv.classList.add('center');
frameDiv.append(stats.domElement);
frameDiv.append(gui.domElement);
document.body.append(frameDiv);

loadPixi(stats, gui)
    .then((pixiApp) => {
        const sceneController = new SceneController(pixiApp, stats, gui);
        sceneController.start();
    })
