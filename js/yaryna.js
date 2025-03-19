var data = [
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/yaryna/1.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/yaryna/2.jpg',
		title: 'HARAVSKA',
		circleLeft: 'https://sashaswan.github.io/haravska/images/yaryna/circle.png'
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/yaryna/3.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/yaryna/4.jpg',
		title: 'YARYNA',
		circleLeft: ''
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/yaryna/5.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/yaryna/6.jpg',
		title: 'HARAVSKA',
		circleLeft: 'https://sashaswan.github.io/haravska/images/yaryna/circle.png'
	},
	{
		type: 'center',
		image: 'https://sashaswan.github.io/haravska/images/yaryna/7.jpg',
		circleLeft: '',
		title: 'YARYNA'
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/yaryna/8.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/yaryna/9.jpg',
		circleLeft: ''
	}
];
var types = ['center', 'double'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise(function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", 'https://sashaswan.github.io/haravska/yarynaType/' + types[i] + '.html', false);
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
		if (data[i].title === undefined) {
			var start = template.indexOf('{{showdesign}}');
			var end = template.indexOf('{{/showdesign}}') + 14;
			template = template.substr(0, start) + template.substr(end + 1, template.length - end);
		} else {
			template = template
				.replace('{{showdesign}}', '')
				.replace('{{/showdesign}}', '');
		}
		$('.yarynaloop').append(template);
	}
	console.log(templates);
}