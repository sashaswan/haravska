var data = [
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/valery/1.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/valery/2.jpg',
		title: 'HARAVSKA',
		circleLeft: 'https://sashaswan.github.io/haravska/images/modeltestcircle/6.svg'
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/valery/3.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/valery/4.jpg',
		title: 'VALERY',
		circleLeft: ''
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/valery/5.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/valery/6.jpg',
		title: 'HARAVSKA',
		circleLeft: 'https://sashaswan.github.io/haravska/images/modeltestcircle/6.svg'
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/valery/7.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/valery/8.jpg',
		circleLeft: ''
	}

];
var types = ['double'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise(function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", 'https://sashaswan.github.io/haravska/valeryType/' + types[i] + '.html', false);
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
		$('.valerymodel').append(template);
	}
	console.log(templates);
}