export default function (url) {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.async = true;
		script.addEventListener("load", resolve)
		script.addEventListener("error", reject)
		document.body.appendChild(script);
	});
}
