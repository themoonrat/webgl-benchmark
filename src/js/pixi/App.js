/**
 * @typedef {Object} PixiConfig
 *
 * @property {number} [width=960] - the width of the renderers view
 * @property {number} [height=540] - the height of the renderers view
 * @property {boolean} [transparent=false] - If the render view is transparent, default false
 * @property {boolean} [antialias=false] - sets antialias (only applicable in chrome at the moment)
 * @property {boolean} [preserveDrawingBuffer=false] - enables drawing buffer preservation, enable this if you
 *  need to call toDataUrl on the webgl context
 * @property {number} [resolution=1] - The resolution / device pixel ratio of the renderer, retina would be 2
 * @property {boolean} [forceCanvas=false] - prevents selection of WebGL renderer, even if such is present
 * @property {number} [backgroundColor=0x1099bb] - The background color of the rendered area
 *  (shown if not transparent).
 * @property {boolean} [clearBeforeRender=true] - This sets if the renderer will clear the canvas or
 *   not before the new render pass.
 * @property {boolean} [roundPixels=false] - If true PixiJS will Math.floor() x/y values when rendering,
 *  stopping pixel interpolation.
 * @property {boolean} [forceFXAA=false] - forces FXAA antialiasing to be used over native.
 *  FXAA is faster, but may not always look as great **webgl only**
 * @property {boolean} [legacy=false] - `true` to ensure compatibility with older / less advanced devices.
 *  If you experience unexplained flickering try setting this to true. **webgl only**
 * @property {string} [powerPreference=high-performance] - Parameter passed to webgl context, set to "high-performance"
 *  for devices with dual graphics card **webgl only**
 */

/**
 * Convenience class to create a new PIXI application.
 */
export default class App {
    /**
     * @param {function} resolvePromise - call when assets have preloader
     * @param {Object} stats - stats instance
     */
	constructor(resolvePromise, stats) {
		PIXI.Loader.shared
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
			.add('bitmap-fonts/desyrel.xml')
			.load(() => {
				resolvePromise(this);
			});

		const options = {
			width: 960,
			height: 540,
			transparent: false,
			antialias: false,
			preserveDrawingBuffer: false,
			resolution: 1,
			forceCanvas: false,
			backgroundColor: 0x1099bb,
			clearBeforeRender: true,
			roundPixels: false,
			forceFXAA: false,
			legacy: false,
			powerPreference: 'high-performance'
		};

		this._stats = stats;

		const RendererType = PIXI.utils.isWebGLSupported() ? PIXI.Renderer || PIXI.WebGLRenderer : PIXI.CanvasRender;
		if (!RendererType) {
			return window.alert("No valid renderer found");
		}

        /**
         * WebGL renderer if available, otherwise CanvasRenderer
		 *
         * @member {PIXI.WebGLRenderer|PIXI.CanvasRenderer}
         */
		this._renderer = new RendererType(options.width, options.height, options);

        /**
         * The root display container that's rendered.
		 *
         * @member {PIXI.Container}
         */
		this._stage = new PIXI.Container();

		this._screen = {
			width: options.width,
			height: options.height
		}

        /**
         * Ticker for doing render updates.
		 *
         * @member {PIXI.ticker.Ticker}
         */
		this.ticker = PIXI.Ticker ? new PIXI.Ticker() : new PIXI.ticker.Ticker();
		this.ticker.add(this._render, this);
		this.ticker.start();

		this._renderer.view.classList.add('center');
		document.getElementById('frame').appendChild(this._renderer.view);
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
     * The root display container that's rendered.
	 *
     * @member {PIXI.Container}
     * @readonly
     */
	get stage() {
		return this._stage;
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
}
