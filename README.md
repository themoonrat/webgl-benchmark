# webgl-benchmark
> Benchmark WebGL performance using different JavaScript rendering/game engines, such as Pixi and Phaser

https://themoonrat.github.io/webgl-benchmark/

## Background

There are 2 common questions when developing contents using WebGL
1. Which library should I choose?
2. What is the most efficient way to construct a scene to be rendered?

Question number 1 is impossible to answer, as there are many questions and considerations outside of pure rendering performance. But this project does allow you to make a like-for-like performance comparison across scenes that are set up to be as similar as possible.

Question number 2 can be helped with this project by comparing scenes within the same engine, and discovering what is most efficient.

Libraries currently covered are Pixi, Phaser 2 and Phaser 3.

Scenes covered range from testing raw sprite rendering performance, to testing graphics & shapes rendering performance.

## Usage

You can find the latest build at https://themoonrat.github.io/webgl-benchmark/

You can also clone this repo and run `npm run start` for a development build, or `npm run build` for a production build.

There are 4 options you can change
* Library: Switch between different rendering libraries. This will refresh the browser, as it cannot be changed on the fly.
* Version: Switch between different versions of the currently selected rendering library. This too will refresh the browser.
* Scene: Switch between different 'scenes' on the fly. Each scene stress tests a different aspect of the rendering library and the ability of the hardware you are running.
* ObjectCount: Change how many objects are currently being rendered at once. Some libraries are quicker at adding / removing objects than others, so be patient, especially at the very high end.

## License

MIT
