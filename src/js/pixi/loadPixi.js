import polyfillPixi from '../../vendor/polyfill-pixi.js';
import loadScript from '../loadScript.js';
import storage from '../storage.js';
import PixiApp from './PixiApp.js';

export default function loadPixi(stats, gui) {
	let resolvePromise;

	const guiData = {
		version: storage.get('version') || 'release'
	};

	storage.set('version', guiData.version);

	const guiController = gui.add(guiData, 'version', [
		"dev", "master", "release",
		"v3.0.11",
		"v4.0.3", "v4.1.1", "v4.2.3",
		"v4.3.5", "v4.4.4", "v4.5.6", "v4.6.2", "v4.7.3", "v4.8.4",
		"v5.0.0-alpha", "v5.0.0-alpha.2", "v5.0.0-alpha.3"
	])
	guiController.onChange((version) => {
		storage.set('version', version);

		window.location.href = storage.url().href;
	});

	const libUrl = `https://pixijs.download/${guiData.version}/pixi.js`;

	loadScript(libUrl)
		.catch(() => {
			console.log(`Could not load Pixi\n[${guiData.version}] from [${libUrl}]\nMay not be a valid version`);
		})
		.then(() => {
			if (window.PIXI) {
				polyfillPixi();
				const loader = PIXI.Loader.shared;
				loader
					.add('images/bunny1.png')
					.add('images/bunny2.png')
					.add('images/bunny3.png')
					.add('images/bunny4.png')
					.add('images/bunny5.png')
					.add('images/bunny6.png')
					.add('images/bunny7.png')
					.add('images/bunny8.png')
					.add('images/bunny9.png')
					.add('images/bunny10.png')
					.add('images/bunny11.png')
					.add('images/bunny12.png')
					.add('spritesheets/bunnies.json')
					.load(onAssetsLoaded);
			}
		});

	return new Promise((resolve) => {
		resolvePromise = resolve;
	});

	function onAssetsLoaded() {
		var app = new PixiApp({}, stats);

		if (resolvePromise) {
			resolvePromise(app);
		}
	}
}
