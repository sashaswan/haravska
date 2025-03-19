var data = [
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/wanderlust/1.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/wanderlust/2.jpg',
		title: 'HARAVSKA',
		circleLeft: 'https://sashaswan.github.io/haravska/images/circle/4.svg'
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/wanderlust/3.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/wanderlust/4.jpg',
		title: 'Wanderlust',
		circleLeft: ''
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/wanderlust/5.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/wanderlust/6.jpg',
		title: 'HARAVSKA',
		circleLeft: ''
	},
	{
		type: 'double',
		image: 'https://sashaswan.github.io/haravska/images/wanderlust/7.jpg',
		image2: 'https://sashaswan.github.io/haravska/images/wanderlust/8.jpg',
		title: 'Wanderlust',
		circleLeft: ''
	},
	{
		type: 'center',
		image: 'https://sashaswan.github.io/haravska/images/wanderlust/9.jpg',
		circleLeft: ''
	}

];
var types = ['center', 'double'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise(function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", 'https://sashaswan.github.io/haravska/wanderlustType/' + types[i] + '.html', false);
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
			.replace('{{title}}', data[i].title)
		if (data[i].title === undefined) {
			var start = template.indexOf('{{showdesign}}');
			var end = template.indexOf('{{/showdesign}}') + 14;
			template = template.substr(0, start) + template.substr(end + 1, template.length - end);
		} else {
			template = template
				.replace('{{showdesign}}', '')
				.replace('{{/showdesign}}', '');
		}
		$('.wanderlust').append(template);
	}
	console.log(templates);
}