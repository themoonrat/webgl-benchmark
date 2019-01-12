import loadScript from '../loadScript.js';
import storage from '../storage.js';
import PhaserApp from './PhaserApp.js';

export default function loadPhaser(stats, gui) {
	let resolvePromise;

	const validVersions = [
		// "2.6.2",
		"3.0.0", "3.1.2", "3.2.1", "3.3.0", "3.4.0", "3.5.1", "3.6.1", "3.7.1", "3.8.0", "3.9.0",
		"3.10.1", "3.11.0", "3.12.0", "3.13.0", "3.14.0", "3.15.1"
	].reverse();

	const guiData = {
		version: validVersions.includes(storage.get('version')) ? storage.get('version') : validVersions[0]
	};

	storage.set('version', guiData.version);

	const guiController = gui.add(guiData, 'version', validVersions)
	guiController.onChange((version) => {
		storage.set('version', version);

		window.location.href = storage.url().href;
	});

	const libUrl = `https://cdnjs.cloudflare.com/ajax/libs/phaser/${guiData.version}/phaser.min.js`;

	loadScript(libUrl)
		.catch(() => {
			console.log(`Could not load Phaser\n[${guiData.version}] from [${libUrl}]\nMay not be a valid version`);
		})
		.then(() => {
			if (window.Phaser) {
				var app = new PhaserApp({
					scene: {
						preload: function () {
							for (let i = 1; i <= 12; ++i) {
								this.load.image(`images/bunny${i}.png`, `images/bunny${i}.png`);
							}
							this.load.atlas('spritesheets/bunnies.png', 'spritesheets/bunnies.png', 'spritesheets/bunnies.json');
							this.load.bitmapFont('Desyrel', 'bitmap-fonts/desyrel.png', 'bitmap-fonts/desyrel.xml');
						},
						create: function () {
							if (resolvePromise) {
								resolvePromise(app);
							}
						}
					}
				}, stats);
			}
		});

	return new Promise((resolve) => {
		resolvePromise = resolve;
	});
}
