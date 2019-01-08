export default class IScene {
	constructor(app, gui) {
		this._app = app;
		this._gui = gui;

		this.title = '';
		this.description = '';

		this._root = new PIXI.Container();
	}

	update(delta) {
		for (let i = 0; i < this._root.children.length; ++i) {
			this._root.children[i].rotation += 0.1 * delta;
		}
	}

	start(objectCount) {
		console.log(`Scene Changed: ${this.title}`);
		console.log(this.description);

		this._app.stage.addChild(this._root);
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
		if (target === this._root.children.length) {
			return;
		}

		if (target > this._root.children.length) {
			this._create(target);
		} else {
			this._destroy(target)
		}
	}

	_create() {
		throw new Error('IScene _create function must be overridden');
	}

	_destroy(objectCount = 0) {
		for (let i = objectCount; i < this._root.children.length; ++i) {
			this._root.children[i].destroy();
			this._root.children[i] = null;
		}
		this._root.children.length = objectCount;
	}
}
