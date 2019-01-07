export default class SingleTextureSingleBaseTexture {
    constructor(app, gui) {
        this._app = app;
        this._gui = gui;

        this._minObjects = 0;
        this._defaultObjects = 10000;
        this._maxObjects = 100000;

        this.objectCount = this._defaultObjects;

        this.guiController = null;

        this.root = new PIXI.Container();

        this._create();
    }

    update() {
    }

    start() {
        this._app.stage.addChild(this.root);

        this._create();

        if (!this.guiController) {
            this.guiController = this._gui.add(this, 'objectCount', this._minObjects, this._maxObjects, Math.round(this._maxObjects / 100));
            this.guiController.onChange(this._onGuiChange.bind(this));
        }
    }

    stop() {
        if (this.guiController) {
            this._gui.remove(this.guiController);
            this.guiController = null;
        }

        this._destroy();
    }

    _create() {
        throw new Error('IScene _create function must be overridden');
    }

    _destroy(){
        if (this.root) {
            this.root.destroy({children: true});
            this.root = new PIXI.Container();
        }
    }

    _onGuiChange(value) {
        for (let i = 0; i < this.root.children.length; ++i) {
            this.root.children[i].visible = i <= value;
        }
    }
}
