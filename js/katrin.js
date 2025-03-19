var data = [
	{
		type: 'double',
		image: '/images/katrin/1.jpg',
		image2: '/images/katrin/2.jpg',
		title: 'HARAVSKA',
		circleLeft: '/images/modeltestcircle/1.svg'
	},
	{
		type: 'double',
		image: '/images/katrin/3.jpg',
		image2: '/images/katrin/4.jpg',
		title: 'KATRIN',
		circleLeft: ''
	},
	{
		type: 'double',
		image: '/images/katrin/5.jpg',
		image2: '/images/katrin/6.jpg',
		title: 'HARAVSKA',
		circleLeft: '/images/modeltestcircle/1.svg'
	},
	{
		type: 'double',
		image: '/images/katrin/7.jpg',
		image2: '/images/katrin/8.jpg',
		title: 'KATRIN',
		circleLeft: ''
	},
	{
		type: 'double',
		image: '/images/katrin/9.jpg',
		image2: '/images/katrin/10.jpg',
		title: 'HARAVSKA',
		circleLeft: ''
	},
	{
		type: 'double',
		image: '/images/katrin/11.jpg',
		image2: '/images/katrin/12.jpg',
		title: 'KATRIN',
		circleLeft: ''
	},
	{
		type: 'double',
		image: '/images/katrin/13.jpg',
		image2: '/images/katrin/14.jpg',
		title: 'HARAVSKA',
		circleLeft: ''
	},
		{
		type: 'double',
		image: '/images/katrin/15.jpg',
		image2: '/images/katrin/16.jpg',
		title: 'KATRIN',
		circleLeft: ''
	},
		{
		type: 'double',
		image: '/images/katrin/17.jpg',
		image2: '/images/katrin/18.jpg',
		circleLeft: ''
	}
];
var types = ['double'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise (function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", '/katrinType/' + types[i] + '.html', false);
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
		$('.katrinmodel').append(template);
	}
	console.log(templates);
}