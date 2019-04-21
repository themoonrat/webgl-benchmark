import polyfillPixi from '../../vendor/polyfill-pixi.js';
import loadScript from '../loadScript.js';
import storage from '../storage.js';
import App from './App.js';

export default function loadPixi(stats, gui) {
	let resolvePromise;

	const versions = [
		"v3.0.11",
		"v4.0.3", "v4.1.1", "v4.2.3", "v4.3.5", "v4.4.4", "v4.5.6", "v4.6.2", "v4.7.3", "v4.8.7",
		"v5.0.0-rc.3",
		"dev"
	].reverse();

	const guiData = {
		version: versions.includes(storage.get('version')) ? storage.get('version') : 'dev'
	};

	storage.set('version', guiData.version);

	const guiController = gui.add(guiData, 'version', versions)
	guiController.onChange((version) => {
		storage.set('version', version);

		window.location.href = storage.url().href;
	});

	const libUrl = `https://pixijs.download/${guiData.version}/pixi.min.js`;

	loadScript(libUrl)
		.catch(() => {
			console.log(`Could not load Pixi\n[${guiData.version}] from [${libUrl}]\nMay not be a valid version`);
		})
		.then(() => {
			if (window.PIXI) {
				polyfillPixi();

				new App(resolvePromise, stats);
			}
		});

	return new Promise((resolve) => {
		resolvePromise = resolve;
	});
}
