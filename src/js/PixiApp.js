/**
 * Convenience class to create a new PIXI application.
 */
export default class PixiApp {
    /**
     * @param {object} [options] - The optional renderer parameters
     * @param {number} [options.width=960] - the width of the renderers view
     * @param {number} [options.height=540] - the height of the renderers view
     * @param {boolean} [options.transparent=false] - If the render view is transparent, default false
     * @param {boolean} [options.antialias=false] - sets antialias (only applicable in chrome at the moment)
     * @param {boolean} [options.preserveDrawingBuffer=false] - enables drawing buffer preservation, enable this if you
     *  need to call toDataUrl on the webgl context
     * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the renderer, retina would be 2
     * @param {boolean} [options.forceCanvas=false] - prevents selection of WebGL renderer, even if such is present
     * @param {number} [options.backgroundColor=0x1099bb] - The background color of the rendered area
     *  (shown if not transparent).
     * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear the canvas or
     *   not before the new render pass.
     * @param {boolean} [options.roundPixels=false] - If true PixiJS will Math.floor() x/y values when rendering,
     *  stopping pixel interpolation.
     * @param {boolean} [options.forceFXAA=false] - forces FXAA antialiasing to be used over native.
     *  FXAA is faster, but may not always look as great **webgl only**
     * @param {boolean} [options.legacy=false] - `true` to ensure compatibility with older / less advanced devices.
     *  If you experience unexplained flickering try setting this to true. **webgl only**
     * @param {string} [options.powerPreference] - Parameter passed to webgl context, set to "high-performance"
     *  for devices with dual graphics card **webgl only**
     */
    constructor(options, stats) {
        /**
         * The default options, so we mixin functionality later.
         * @member {object}
         * @protected
         */
        this._options = options = Object.assign({
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
            powerPreference: ''
        }, options);

        this._stats = stats;

        const RendererType = PIXI.utils.isWebGLSupported() ? PIXI.Renderer || PIXI.WebGLRenderer : PIXI.CanvasRender;
        if (!RendererType) {
            return window.alert("No valid renderer found");
        }

        /**
         * WebGL renderer if available, otherwise CanvasRenderer
         * @member {PIXI.WebGLRenderer|PIXI.CanvasRenderer}
         */
        this.renderer = new RendererType(this._options.width, this._options.height, this._options);

        /**
         * The root display container that's rendered.
         * @member {PIXI.Container}
         */
        this.stage = new PIXI.Container();

        if (!this.renderer.screen) {
            this.renderer.screen = new PIXI.Rectangle(0, 0, options.width, options.height);
        }

        /**
         * Ticker for doing render updates.
         * @member {PIXI.ticker.Ticker}
         * @default PIXI.ticker.shared
         */
        this.ticker = PIXI.Ticker ? new PIXI.Ticker() : new PIXI.ticker.Ticker();
        this.ticker.add(this.render, this);

        this.view.classList.add('center');
        document.getElementById('frame').appendChild(this.view);
    }

    /**
     * Render the current stage.
     */
    render() {
        this._stats.begin();
        this.renderer.render(this.stage);
        this._stats.end();
    }

    /**
     * Convenience method for stopping the render.
     */
    stop() {
        this.ticker.stop();
    }

    /**
     * Convenience method for starting the render.
     */
    start() {
        this.ticker.start();
    }

    /**
     * Reference to the renderer's canvas element.
     * @member {HTMLCanvasElement}
     * @readonly
     */
    get view() {
        return this.renderer.view;
    }

    /**
     * Reference to the renderer's screen rectangle. Its safe to use as filterArea or hitArea for whole screen
     * @member {PIXI.Rectangle}
     * @readonly
     */
    get screen() {
        return this.renderer.screen;
    }

    /**
     * Destroy and don't use after this.
     * @param {boolean} [removeView=false] Automatically remove canvas from DOM.
     * @param {object|boolean} [stageOptions] - Options parameter. A boolean will act as if all options
     *  have been set to that value
     * @param {boolean} [stageOptions.children=false] - if set to true, all the children will have their destroy
     *  method called as well. 'stageOptions' will be passed on to those calls.
     * @param {boolean} [stageOptions.texture=false] - Only used for child Sprites if stageOptions.children is set
     *  to true. Should it destroy the texture of the child sprite
     * @param {boolean} [stageOptions.baseTexture=false] - Only used for child Sprites if stageOptions.children is set
     *  to true. Should it destroy the base texture of the child sprite
     */
    destroy(removeView, stageOptions) {
        if (this._ticker) {
            const oldTicker = this._ticker;
            this.ticker = null;
            oldTicker.destroy();
        }
        this.stage.destroy(stageOptions);
        this.stage = null;
        this.renderer.destroy(removeView);
        this.renderer = null;
        this._options = null;
    }
}
