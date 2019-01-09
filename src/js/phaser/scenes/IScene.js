export default class IScene {
	constructor(app, gui) {
		this._app = app;
		this._gui = gui;

		this._title = '';
		this._description = '';

		this._root = this._app.scene.add.container()
	}

	update(delta) {
		for (let i = 0; i < this._root.list.length; ++i) {
			this._root.list[i].rotation += 0.1 * delta;
		}
	}

	start(objectCount) {
		console.log(`Scene Changed: ${this.title}`);
		console.log(this.description);

		//this._app.scene.add(this._root);
		//		this._app.ticker.add(this.update, this);

		this._create(objectCount);
	}

	stop() {
		//this._app.scene.remove(this._root);
		//		this._app.ticker.remove(this.update, this);

		this._destroy();
	}

	changeObjectCount(target) {
		if (target === this._root.list.length) {
			return;
		}

		if (target > this._root.list.length) {
			this._create(target);
		} else {
			this._destroy(target)
		}
	}

	_create() {
		throw new Error('IScene _create function must be overridden');
	}

	_destroy(objectCount = 0) {
		for (let i = objectCount; i < this._root.list.length; ++i) {
			this._root.list[i].destroy();
			this._root.list[i] = null;
		}
		this._root.list.length = objectCount;
	}
}
