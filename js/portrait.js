var data = [
	{
		type: 'left',
		image: 'https://sashaswan.github.io/haravska/images/portrait/2.jpg',
		title: 'YARYNA',
		link: '/yaryna'
	},
	{
		type: 'right',
		image: 'https://sashaswan.github.io/haravska/images/portrait/1.png',
		title: 'MARKO',
		link: '/marko'
	}
];
var types = ['left', 'right'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise(function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", 'https://sashaswan.github.io/haravska/portraitType/' + types[i] + '.html', false);
		rawFile.onreadystatechange = function () {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					templates[types[i]] = rawFile.responseText;
					resolve();
				}
			}
		}
		rawFile.send(null);
	});
	promises.push(promise);
}
Promise.all(promises).then(buildHtml);

function buildHtml() {
	for (var i = 0; i < data.length; i++) {
		var template = templates[data[i].type]
			.replace('{{image}}', data[i].image)
			.replace('{{title}}', data[i].title)
			.replace('{{link}}', data[i].link)
		$('.portraitpage').append(template);
	}
	console.log(templates);
}