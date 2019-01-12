export default function pollyfillPixi() {
	if (window.PIXI) {
		// v3 does not have .from, so since we preload assets, use fromFrame instead
		if (!PIXI.Sprite.from) {
			PIXI.Sprite.from = PIXI.Sprite.fromFrame;
		}

		// move v3 and v4 loaders to the v5 area
		if (!PIXI.Loader || !PIXI.Loader.shared) {
			PIXI.Loader = {
				shared: PIXI.loader
			}
		}

		// move v3 and v4 BitmapText to the v5 area
		if (!PIXI.BitmapText) {
			PIXI.BitmapText = PIXI.extras.BitmapText;
		}

		// v3 does not contain this function natively
		if (!PIXI.Graphics.prototype.drawStar) {
			PIXI.Graphics.prototype.drawStar = function (x, y, points, radius, innerRadius, rotation = 0) {
				innerRadius = innerRadius || radius / 2;

				const startAngle = (-1 * Math.PI / 2) + rotation;
				const len = points * 2;
				const delta = PIXI.PI_2 / len;
				const polygon = [];

				for (let i = 0; i < len; i++) {
					const r = i % 2 ? innerRadius : radius;
					const angle = (i * delta) + startAngle;

					polygon.push(
						x + (r * Math.cos(angle)),
						y + (r * Math.sin(angle))
					);
				}

				return this.drawPolygon(polygon);
			}
		}
	}
}
