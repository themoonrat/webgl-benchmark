/**
 * @typedef {object} RenderConfig
 *
 * @property {boolean} [antialias=false] - When set to `true`, WebGL uses linear interpolation to draw scaled or rotated textures, giving a smooth appearance. When set to `false`, WebGL uses nearest-neighbor interpolation, giving a crisper appearance. `false` also disables antialiasing of the game canvas itself, if the browser supports it, when the game canvas is scaled.
 * @property {boolean} [pixelArt=false] - Sets `antialias` and `roundPixels` to true. This is the best setting for pixel-art games.
 * @property {boolean} [autoResize=false] - Automatically resize the Game Canvas if you resize the renderer.
 * @property {boolean} [roundPixels=false] - Draw texture-based Game Objects at only whole-integer positions. Game Objects without textures, like Graphics, ignore this property.
 * @property {boolean} [transparent=false] - Whether the game canvas will be transparent.
 * @property {boolean} [clearBeforeRender=true] - Whether the game canvas will be cleared between each rendering frame.
 * @property {boolean} [premultipliedAlpha=true] - In WebGL mode, the drawing buffer contains colors with pre-multiplied alpha.
 * @property {boolean} [preserveDrawingBuffer=false] - In WebGL mode, the drawing buffer won't be cleared automatically each frame.
 * @property {boolean} [failIfMajorPerformanceCaveat=false] - Let the browser abort creating a WebGL context if it judges performance would be unacceptable.
 * @property {string} [powerPreference='default'] - "high-performance", "low-power" or "default". A hint to the browser on how much device power the game might use.
 * @property {integer} [batchSize=2000] - The default WebGL batch size.
 */

/**
 * @typedef {object} PhaserConfig
 *
 * @property {(integer|string)} [width=1024] - The width of the game, in game pixels.
 * @property {(integer|string)} [height=768] - The height of the game, in game pixels.
 * @property {number} [resolution=1] - The size of each game pixel, in canvas pixels. Values larger than 1 are "high" resolution.
 * @property {object} [scene=null] - A scene or scenes to add to the game. If several are given, the first is started; the remainder are started only if they have { active: true }.
 * @property {RenderConfig} [render] - Game renderer configuration.
 * @property {(string|number)} [backgroundColor=0x1099bb] - The background color of the game canvas. The default is black.
 */

/**
 * Convenience class to create a new Phaser application.
 */
export default class PhaserApp {
    /**
     * @param {PhaserConfig} options - The renderer parameters
     * @param {Object} stats - stats instance
     */
	constructor(options, stats) {
		this._options = options = Object.assign({
			width: 960,
			height: 540,
			resolution: 1,
			render: {
				antialias: false,
				pixelArt: false,
				autoResize: false,
				roundPixels: false,
				transparent: false,
				clearBeforeRender: true,
				premultipliedAlpha: true,
				preserveDrawingBuffer: false,
				failIfMajorPerformanceCaveat: false,
				powerPreference: 'high-performance'
			},
			backgroundColor: 0x1099bb,
		}, options);

		this._stats = stats;

		this._game = new Phaser.Game(this._options);

		this._screen = {
			width: this._options.width,
			height: this._options.height
		}

		this._game.canvas.classList.add('center');
		document.getElementById('frame').appendChild(this._game.canvas);
	}

    /**
     * Render the current stage.
     */
	_render() {
		this._stats.begin();
		this._renderer.render(this.stage);
		this._stats.end();
	}

    /**
     * Reference to the renderer's screen rectangle. Its safe to use as filterArea or hitArea for whole screen
	 *
     * @member {Object}
     * @readonly
     */
	get screen() {
		return this._screen;
	}

	/**
     * The single scene that we use for our tests
	 *
     * @member {Object}
     * @readonly
     */
	get scene() {
		return this._game.scene.scenes[0];
	}
}
