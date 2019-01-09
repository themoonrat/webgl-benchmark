export default class IScene {
	constructor(app, gui) {
		this._app = app;
		this._gui = gui;

		this._title = '';
		this._description = '';

	}

	update(time, delta) {
		for (let i = 0; i < this._app.scene.children.list.length; ++i) {
			this._app.scene.children.list[i].rotation += 0.016 * delta;
		}
	}

	start(objectCount) {
		console.log(`Scene Changed: ${this.title}`);
		console.log(this.description);

		this._app.scene.sys.events.on('update', this.update, this);

		this._create(objectCount);
	}

	stop() {
		//this._app.scene.remove(this._root);
		this._app.scene.sys.events.off('update', this.update, this);

		this._destroy();
	}

	changeObjectCount(target) {
		if (target === this._app.scene.children.list.length) {
			return;
		}

		if (target > this._app.scene.children.list.length) {
			this._create(target);
		} else {
			this._destroy(target)
		}
	}

	_create() {
		throw new Error('IScene _create function must be overridden');
	}

	_destroy(objectCount = 0) {
		this._app.scene.children.list.length = objectCount;
	}
}
