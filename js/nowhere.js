var data = [
	{
		type: 'double',
		image: '/images/nowhere/1.jpg',
		image2: '/images/nowhere/2.jpg',
		title: 'HARAVSKA',
		circleLeft: '/images/circle/2.svg'
	},
	{
		type: 'double',
		image: '/images/nowhere/3.jpg',
		image2: '/images/nowhere/4.jpg',
		title: 'In the Middle of Nowhere',
		circleLeft: ''
	},
	{
		type: 'double',
		image: '/images/nowhere/5.jpg',
		image2: '/images/nowhere/6.jpg',
		title: 'HARAVSKA',
		circleLeft: '/images/circle/2.svg'
	},
	{
		type: 'double',
		image: '/images/nowhere/7.jpg',
		image2: '/images/nowhere/8.jpg',
		title: 'In the Middle of Nowhere',
		circleLeft: ''
	},
	{
		type: 'center',
		image: '/images/nowhere/9.jpg',
		title: 'HARAVSKA',
		circleLeft: '/images/circle/2.svg'
	},
	{
		type: 'double',
		image: '/images/nowhere/10.jpg',
		image2: '/images/nowhere/11.jpg',
		circleLeft: ''
	}
	
];
var types = ['center', 'double'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise (function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", '/nowhereType/' + types[i] + '.html', false);
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
		$('.nowhereloop').append(template);
	}
	console.log(templates);
}