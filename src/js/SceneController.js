import SingleTextureSingleBaseTexture from './scenes/SingleTextureSingleBaseTexture.js';
import MultipleTexturesMultipleBaseTextures from './scenes/MultipleTexturesMultipleBaseTextures.js';
import MultipleTexturesSingleBaseTexture from './scenes/MultipleTexturesSingleBaseTexture.js';

export default class SceneController {
    constructor(pixiApp, stats, gui) {
        this._pixiApp = pixiApp;
        this._pixiApp.ticker.add(this.update, this, 10);

        this._stats = stats;
        this._gui = gui;

        this._scenes = [
            new SingleTextureSingleBaseTexture(pixiApp, gui),
            new MultipleTexturesMultipleBaseTextures(pixiApp, gui),
            new MultipleTexturesSingleBaseTexture(pixiApp, gui)
        ];

        for (const scene of this._scenes) {
            scene.root.visible = false;
            this._pixiApp.stage.addChild(scene.root);
        }

        if (this._pixiApp.renderer.plugins.prepare) {
            this._pixiApp.renderer.plugins.prepare.upload(this._pixiApp.stage);
        }

        this.scene = 0;

        const guiController = this._gui.add(this, 'scene', {
            '1 BaseTexture 1 Texture': 0,
            '12 BaseTextures 12 Textures': 1,
            '1 BaseTexture 12 Texture': 2
        });

        guiController.onChange(() => {
            this.switch(this.scene);
        });

        this.switch(this.scene);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (this.scene === this._scenes.length - 1) {
                    this.switch(0);
                } else {
                    this.switch(this.scene + 1);
                }
            }
        });
    }

    start() {
        this._pixiApp.start();
        this._stats.domElement.style.visibility = 'visible';
        this._gui.domElement.style.visibility = 'visible';
    }

    update(delta) {
        this._scenes[this.scene].update(delta);
    }

    switch(index) {
        if (index >= 0 && index < this._scenes.length) {
            this.scene = index;

            for (const scene of this._scenes) {
                scene.root.visible = false;
                scene.stop();
            }

            const newScene = this._scenes[index];
            newScene.root.visible = true;
            newScene.start();
        }
    }
}
