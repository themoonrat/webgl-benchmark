export default class IScene {
	constructor(app, gui) {
		this._app = app;
		this._gui = gui;

		this._children = this._app.stage.children;

		this.title = '';
		this.description = '';

		this._last

		this._targetMS = 1000 / 60;
	}

	start(objectCount) {
		console.log(`Scene Changed: ${this.title}`);
		console.log(this.description);

		this._app.game.state.update = () => {
			// 2.0.x and 2.1.x have used elapsed rather than elapsedMS
			const delta = (this._app.game.time.elapsedMS || this._app.game.time.elapsed) / this._targetMS;
			this._update(delta);
		}

		this._create(objectCount);
	}

	stop() {
		this._app.game.state.update = () => { };

		this._destroy();
	}

	changeObjectCount(objectCount) {
		if (objectCount > this._children.length) {
			this._create(objectCount);
		} else if (objectCount < this._children.length) {
			this._destroy(objectCount)
		}
	}

	_update(delta = 0) {
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
