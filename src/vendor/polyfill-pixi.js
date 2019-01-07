export default function pollyfillPixi() {
    if (window.PIXI) {
        if (!PIXI.Sprite.from) {
            PIXI.Sprite.from = PIXI.Sprite.fromFrame;
        }

        if (!PIXI.Loader || !PIXI.Loader.shared) {
            PIXI.Loader = {
                shared: PIXI.loader
            }
        }
    }
}
