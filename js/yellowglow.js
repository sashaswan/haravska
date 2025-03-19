var data = [
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/yellowglow/1.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/yellowglow/2.jpg',
		title: 'HARAVSKA',
		circleLeft: 'https://sashaswan.github.io/haravska/images/circle/1.svg'
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/yellowglow/3.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/yellowglow/4.jpg',
		title: 'Yellow Glow',
		circleLeft: ''
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/yellowglow/5.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/yellowglow/6.jpg',
		title: 'HARAVSKA',
		circleLeft: ''
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/yellowglow/7.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/yellowglow/8.jpg',
		title: 'Yellow Glow',
		circleLeft: ''
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/yellowglow/9.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/yellowglow/10.jpg',
		title: 'HARAVSKA',
		circleLeft: ''
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/yellowglow/11.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/yellowglow/12.jpg',
		circleLeft: '',
		title: 'Yellow Glow'
	},
	{
		type: 'center',
		image: 'https://sashaswan.github.io/haravska/images/yellowglow/yellowglow.jpg',
		circleLeft: ''
	}
];
var types = ['center', 'double'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise(function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", 'https://sashaswan.github.io/haravska/yellowglowType/' + types[i] + '.html', false);
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
		$('.yellowglow').append(template);
	}
	console.log(templates);
}