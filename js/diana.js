var data = [
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/diana/1.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/diana/2.jpg',
		title: 'HARAVSKA',
		circleLeft: 'https://sashaswan.github.io/haravska/images/modeltestcircle/5.svg'
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/diana/3.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/diana/4.jpg',
		title: 'DIANA',
		circleLeft: ''
	},
	{
		type: 'center',
		image: 'https://sashaswan.github.io/haravska/images/diana/5.jpg',
		circleLeft: ''
	}
];
var types = ['center', 'double'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise(function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", 'https://sashaswan.github.io/haravska/dianaType/' + types[i] + '.html', false);
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
			.replace('{{image2}}', data[i].image2)
			.replace('{{circleLeft}}', data[i].circleLeft)
			.replace('{{title}}', data[i].title);
		$('.dianamodel').append(template);
	}
	console.log(templates);
}