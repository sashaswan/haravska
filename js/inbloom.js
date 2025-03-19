var data = [
	{
		type: 'center',
		image: '/images/inbloom/1.jpg',
		title: 'HARAVSKA',
		circleLeft: '/images/circle/1.svg'
	},
	{
		type: 'center',
		image: '/images/inbloom/2.jpg',
		title: 'In Bloom',
		circleLeft: ''
	},
	{
		type: 'double',
		image: '/images/inbloom/3.jpg',
		image2: '/images/inbloom/4.jpg',
		title: 'HARAVSKA',
		circleLeft: '/images/circle/1.svg'
	},
	{
		type: 'center',
		image: '/images/inbloom/5.jpg',
		circleLeft: ''
	}
];
var types = ['center', 'double'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise (function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", '/inbloomType/' + types[i] + '.html', false);
	    rawFile.onreadystatechange = function () {
	        if(rawFile.readyState === 4) {
	            if(rawFile.status === 200 || rawFile.status == 0) {
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
			.replace('{{title}}', data[i].title)
			.replace('{{circleLeft}}', data[i].circleLeft);
		if (data[i].title === undefined) {
			var start = template.indexOf('{{showdesign}}');
			var end = template.indexOf('{{/showdesign}}') + 14;
			template = template.substr(0, start) + template.substr(end + 1, template.length - end);
		} else {
			template = template
				.replace('{{showdesign}}', '')
				.replace('{{/showdesign}}', '');
		}		
		$('.bloomloop').append(template);
	}
	console.log(templates);
}