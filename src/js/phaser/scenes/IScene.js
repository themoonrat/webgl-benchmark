export default class IScene {
	constructor(app, gui) {
		this._app = app;
		this._gui = gui;

		this._children = this._app.scene.children.list;

		this.title = '';
		this.description = '';

		this._targetMS = 1000 / 60;
	}

	update(time, deltaMS) {
		const delta = deltaMS / this._targetMS;

		for (let i = 0; i < this._children.length; ++i) {
			this._children[i].rotation += 0.1 * delta;
		}
	}

	start(objectCount) {
		console.log(`Scene Changed: ${this.title}`);
		console.log(this.description);

		this._app.scene.sys.events.on('update', this.update, this);

		this._create(objectCount);
	}

	stop() {
		this._app.scene.sys.events.off('update', this.update, this);

		this._destroy();
	}

	changeObjectCount(objectCount) {
		if (objectCount > this._children.length) {
			this._create(objectCount);
		} else if (objectCount < this._children.length) {
			this._destroy(objectCount)
		}
	}

	_create() {
		throw new Error('IScene _create function must be overridden');
	}

	_destroy(objectCount = 0) {
		this._children.length = objectCount;
	}
}
