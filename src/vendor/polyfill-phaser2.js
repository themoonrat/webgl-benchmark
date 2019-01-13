export default function pollyfillPhaser2() {
	if (window.Phaser) {
		// convert 2.0.x phaser drawPolygon function to accept straight array of indices, rather than x and y points
		if (Phaser.VERSION.includes("2.0.")) {
			Phaser.Graphics.prototype.drawPolygonOld = Phaser.Graphics.prototype.drawPolygon;
			Phaser.Graphics.prototype.drawPolygon = function (points) {
				const convertedPoints = [];
				for (let i = 0; i < points.length; i += 2) {
					const x = points[i] || 0;
					const y = points[i + 1] || 0;
					convertedPoints.push({
						x,
						y
					});
				}
				this.drawPolygonOld({ points: convertedPoints });
			}
		}
	}
}
