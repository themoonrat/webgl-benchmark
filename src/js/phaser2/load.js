import polyfillPhaser2 from '../../vendor/polyfill-phaser2.js';

import loadScript from '../loadScript.js';
import storage from '../storage.js';
import App from './App.js';

export default function loadPhaser(stats, gui) {
	let resolvePromise;

	const v2Offical = [
		"2.0.7", "2.1.3", "2.2.2", "2.3.0", "2.4.9", "2.5.0", "2.6.2"
	];
	const v2Community = [
		"2.7.10", "2.8.8", "2.9.4", "2.10.6", "2.11.1", "2.12.1", "2.13.3", "2.14.0", "2.15.0"
	];
	const versions = [
		...v2Offical,
		...v2Community
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

	let versionMatch = guiData.version.match(/(\d+).(\d+).(\d+)/);
	let isOfficialVersion = !versionMatch || versionMatch[2] < 7;
	let libUrl = '';
	if (isOfficialVersion) {
		libUrl = `https://cdnjs.cloudflare.com/ajax/libs/phaser/${guiData.version}/phaser.min.js`;
	} else {
		libUrl = `https://cdn.jsdelivr.net/npm/phaser-ce@${guiData.version}`;
	}

	loadScript(libUrl)
		.catch(() => {
			console.log(`Could not load Phaser\n[${guiData.version}] from [${libUrl}]\nMay not be a valid version`);
		})
		.then(() => {
			if (window.Phaser) {
				polyfillPhaser2();

				new App(resolvePromise, stats);
			}
		});

	return new Promise((resolve) => {
		resolvePromise = resolve;
	});
}
