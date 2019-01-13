/**
 * Convenience class to create a new Phaser application.
 */
export default class App {
    /**
     * @param {function} resolvePromise - call when assets have preloader
     * @param {Object} stats - stats instance
     */
	constructor(resolvePromise, stats) {
		const options = {
			width: 960,
			height: 540,
			backgroundColor: 0x1099bb,
			scene: {
				preload: () => {
					for (let i = 1; i <= 12; ++i) {
						this._game.load.image(`images/bunny${i}.png`, `images/bunny${i}.png`);
					}
					this._game.load.atlas('spritesheets/bunnies.png', 'spritesheets/bunnies.png', 'spritesheets/bunnies.json');
					this._game.load.bitmapFont('Desyrel', 'bitmap-fonts/desyrel.png', 'bitmap-fonts/desyrel.xml');
				},
				create: () => {
					if (resolvePromise) {
						this._game.canvas.classList.add('center');

						this._game.state.preRender = () => {
							this._stats.begin();
						}
						this._game.state.render = () => {
							this._stats.end();
						}

						this._game.stage.backgroundColor = options.backgroundColor;
						this._game.stage.disableVisibilityChange = true;

						resolvePromise(this);
					}
				}
			}
		}

		this._stats = stats;

		this._game = new Phaser.Game(options.width, options.height, Phaser.WEBGL_MULTI || Phaser.AUTO, 'frame', options.scene);

		this._screen = {
			width: options.width,
			height: options.height
		}
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
     * The Phaser game object
	 *
     * @member {Object}
     * @readonly
     */
	get game() {
		return this._game;
	}

	/**
     * The single scene that we use for our tests
	 *
     * @member {Object}
     * @readonly
     */
	get stage() {
		return this._game.stage;
	}
}
