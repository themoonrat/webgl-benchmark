export default class IScene {
	constructor(app, gui) {
		this._app = app;
		this._gui = gui;

		this._children = this._app.stage.children;

		this.title = '';
		this.description = '';
	}

	start(objectCount) {
		console.log(`Scene Changed: ${this.title}`);
		console.log(this.description);

		this._app.ticker.add(this._update, this);

		this._create(objectCount);
	}

	stop() {
		this._app.ticker.remove(this._update, this);

		this._destroy();
	}

	changeObjectCount(objectCount) {
		if (objectCount > this._children.length) {
			this._create(objectCount);
		} else if (objectCount < this._children.length) {
			this._destroy(objectCount)
		}
	}

	_update(delta) {
		for (let i = 0; i < this._children.length; ++i) {
			this._children[i].rotation += 0.05 * delta;
		}
	}

	_create() {
		throw new Error('IScene _create function must be overridden');
	}

	_destroy(objectCount = 0) {
		this._children.length = objectCount;
	}
}
