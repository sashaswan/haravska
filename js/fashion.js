var data = [
	{
		type: 'left',
		image: '/images/fashion/1.png',
		title: 'GREEN LINE',
		model: 'Viktoria Rakocha',
		modelAgency: '/ Grace Models',
		modelName: 'Sofia Slobodian',
		style:'Nataliya Novitska',
		slider: '/images/fashion/green/1.jpg',
		slider1: '/images/fashion/green/2.jpg',
		slider2: '/images/fashion/green/3.jpg',
		link:'/greenline',
		mua: 'Mua:',
		styleMark: 'Style:'
	},
	{
		type: 'right',
		image: '/images/fashion/2.jpg',
		title: 'IN BLOOM',
		model: 'Katerina Gyulmamedova',
		modelAgency: '',
		modelName: 'Margo Parashchenko',
		style:'Roman Timofeev',
		designer: 'Rito',
		slider: '/images/fashion/bloom/1.jpg',
		slider1: '/images/fashion/bloom/2.jpg',
		slider2: '/images/fashion/bloom/3.jpg',
		link:'/inbloom',
		mua: 'Mua:',
		styleMark: 'Style:'
	},
	{
		type: 'left',
		image: '/images/fashion/3.png',
		title: 'IN THE MIDDLE OF NOWHERE',
		model: 'Maria Valyukh',
		modelAgency: '/ OK’S Models',
		modelName: '',
		style: 'Natasha Kuzmych',
		slider: '/images/fashion/inthe/1.jpg',
		slider1: '/images/fashion/inthe/2.jpg',
		slider2: '/images/fashion/inthe/3.jpg',
		link:'/nowhere',
		mua: '',
		styleMark: 'Style:'
	},
	{
		type: 'right',
		image: '/images/fashion/4.png',
		title: 'RUSH',	
		model: 'Lilia Datsyk',
		modelAgency: '',
		modelName: '',
		style: '',
		slider: '/images/fashion/rush/1.jpg',
		slider1: '/images/fashion/rush/2.jpg',
		slider2: '/images/fashion/rush/3.jpg',
		link:'/rush',
		mua: '',
		styleMark: ''
	},

	{
		type: 'left',
		image: '/images/fashion/5.png',
		title: 'WANDERLUST',
		model: 'Lidiya Lisova',
		modelAgency: '/ Grace Models',
		modelName: '',
		style: '',
		slider: '/images/fashion/lust/1.jpg',
		slider1: '/images/fashion/lust/2.jpg',
		slider2: '/images/fashion/lust/3.jpg',
		link:'/wanderlust',
		mua: '',
		styleMark: ''
	},
	{
		type: 'right',
		image: '/images/yellowglow/slide1.jpg',
		title: 'YELLOW GLOW',
		model: 'Sofi Krishchuk',
		modelAgency: '/ OK’S Models',
		modelName: '',
		style:'Alina Haravska',
		slider: '/images/fashion/yellow/1.jpg',
		slider1: '/images/fashion/yellow/2.jpg',
		slider2: '/images/fashion/yellow/3.jpg',
		link:'/yellowglow',
		mua: '',
		styleMark: 'Style:'
	}
];
var types = ['left', 'right', 'another'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise (function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", '/fashiontype/' + types[i] + '.html', false);
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
			.replace('{{title}}', data[i].title)
			.replace('{{model}}', data[i].model)
			.replace('{{modelAgency}}', data[i].modelAgency)
			.replace('{{modelName}}', data[i].modelName)
			.replace('{{style}}', data[i].style)
			.replace('{{designer}}', data[i].designer)
			.replace('{{slider}}', data[i].slider)
			.replace('{{slider1}}', data[i].slider1)
			.replace('{{slider2}}', data[i].slider2)
			.replace('{{mua}}', data[i].mua)
			.replace('{{styleMark}}', data[i].styleMark)
			.replace('{{link}}', data[i].link);
		if (data[i].designer === undefined) {
			var start = template.indexOf('{{showdesign}}');
			var end = template.indexOf('{{/showdesign}}') + 14;
			template = template.substr(0, start) + template.substr(end + 1, template.length - end);
		} else {
			template = template
				.replace('{{showdesign}}', '')
				.replace('{{/showdesign}}', '');
		}	
		$('.fashionpage').append(template);
	}
	console.log(templates);
}