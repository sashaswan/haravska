var data = [
	{
		type: 'double',
		image: '/images/rush/1.jpg',
		image2: '/images/rush/2.jpg',
		title: 'HARAVSKA',
		circleLeft:'/images/circle/3.svg'
	},
	{
		type: 'double',
		image: '/images/rush/3.jpg',
		image2: '/images/rush/4.jpg',
		title: 'Rush',
		circleLeft:''
	},
	{
		type: 'double',
		image: '/images/rush/5.jpg',
		image2: '/images/rush/6.jpg',
		title: 'HARAVSKA',
		circleLeft:''
	},
	{
		type: 'double',
		image: '/images/rush/7.jpg',
		image2: '/images/rush/8.jpg',
		title: 'Rush',
		circleLeft:''
	},
	{
		type: 'center',
		image: '/images/rush/9.jpg',
		title: 'Rush',
		circleLeft:''
	},
	{
		type: 'double',
		image: '/images/rush/10.jpg',
		image2: '/images/rush/11.jpg',
		circleLeft:''
	}
	
];
var types = ['center', 'double'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise (function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", '/rushType/' + types[i] + '.html', false);
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
		$('.rushloop').append(template);
	}
	console.log(templates);
}