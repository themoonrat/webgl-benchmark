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

	update(delta) {
		for (let i = 0; i < this.root.children.length; ++i) {
			this.root.children[i].rotation += 0.1 * delta;
		}
	}

	start(objectCount) {
		this._app.stage.addChild(this.root);
		this._app.ticker.add(this.update, this);

		this._create(objectCount);

		if (this._app.renderer.plugins.prepare) {
			this._app.renderer.plugins.prepare.upload(this._app.stage);
		}
	}

	stop() {
		this._app.ticker.remove(this.update, this);

		this._destroy();
	}

	changeObjectCount(target) {
		if (target === this.root.children.length) {
			return;
		}

		if (target > this.root.children.length) {
			this._create(target);
		} else {
			this._destroy(target)
		}
	}

	_create() {
		throw new Error('IScene _create function must be overridden');
	}

	_destroy(objectCount = 0) {
		for (let i = objectCount; i < this.root.children.length; ++i) {
			this.root.children[i].destroy();
			this.root.children[i] = null;
		}
		this.root.children.length = objectCount;
	}
}
