import loadScript from '../loadScript.js';
import storage from '../storage.js';
import App from './App.js';

export default function loadPhaser(stats, gui) {
	let resolvePromise;

	const versions = [
		"3.0.0", "3.1.2", "3.2.1", "3.3.0", "3.4.0", "3.5.1", "3.6.1", "3.7.1", "3.8.0", "3.9.0", "3.10.1",
		"3.11.0", "3.12.0", "3.13.0", "3.14.0", "3.15.1", "3.16.2", "3.17.0", "3.18.1", "3.19.0", "3.20.1",
		"3.21.0", "3.22.0", "3.23.0", "3.24.1", "3.52.0"
	].reverse();

	const guiData = {
		version: versions.includes(storage.get('version')) ? storage.get('version') : versions[0]
	};

	storage.set('version', guiData.version);

	const guiController = gui.add(guiData, 'version', versions)
	guiController.onChange((version) => {
		storage.set('version', version);

		window.location.href = storage.url().href;
	});

	let libUrl = `https://cdn.jsdelivr.net/npm/phaser@${guiData.version}/dist/phaser.min.js`;

	loadScript(libUrl)
		.catch(() => {
			console.log(`Could not load Phaser\n[${guiData.version}] from [${libUrl}]\nMay not be a valid version`);
		})
		.then(() => {
			if (window.Phaser) {
				new App(resolvePromise, stats);
			}
		});

	return new Promise((resolve) => {
		resolvePromise = resolve;
	});
}
