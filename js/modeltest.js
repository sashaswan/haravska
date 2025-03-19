var data = [
	{
		type: 'left',
		image: '/images/modeltest/1.jpg',
		title: 'KATRIN',
		model: 'Katrin',
		modelAgency: '/ Talents Models Munich',
		modelName: '',
		style:'',
		slider: '/images/modeltest/katrin/1.jpg',
		slider2: '/images/modeltest/katrin/2.jpg',
		slider3: '/images/modeltest/katrin/3.jpg',
		link:'/katrin',
		mua: '',
		styleMark: ''
	},
	{
		type: 'right',
		image: '/images/modeltest/2.jpg',
		title: 'MARY',
		model: 'Mary Nemzer',
		modelAgency: '/ Charme de la Mode',
		modelName: '',
		style:'',
		slider: '/images/modeltest/mary/1.jpg',
		slider2: '/images/modeltest/mary/2.jpg',
		slider3: '/images/modeltest/mary/3.jpg',
		link:'/mary',
		mua: '',
		styleMark: ''
	},
	{
		type: 'left',
		image: '/images/modeltest/3.jpg',
		title: 'GINGER',
		model: 'Kateryna Sitak',
		modelAgency: '/ 1 Mother Agency',
		modelName: 'Sofi Slobodian',
		style:'',
		slider: '/images/modeltest/ginger/1.jpg',
		slider2: '/images/modeltest/ginger/2.jpg',
		slider3: '/images/modeltest/ginger/3.jpg',
		link:'/ginger',
		mua: 'Mua:',
		styleMark: ''
	},
	{
		type: 'right',
		image: '/images/modeltest/4.jpg',
		title: 'VICKY',	
		model: 'Viktoria Rakocha',
		modelAgency: '/ Grace Models',
		modelName: 'Sofi Slobodian',
		style: 'Nataliya Novitska',
		slider: '/images/modeltest/vicky/1.jpg',
		slider2: '/images/modeltest/vicky/2.jpg',
		slider3: '/images/modeltest/vicky/3.jpg',
		link:'/vicky',
		mua: 'Mua:',
		styleMark: 'Style:'
	},

	{
		type: 'left',
		image: '/images/modeltest/5.jpg',
		title: 'DIANA',
		model: 'Diana',
		modelAgency: '/ Grace Models',
		modelName: 'Olga Zayarnaya',
		style: 'Yanina Gor',
		slider: '/images/modeltest/diana/1.jpg',
		slider2: '/images/modeltest/diana/2.jpg',
		slider3: '/images/modeltest/diana/3.jpg',
		link:'/diana',
		mua: 'Mua:',
		styleMark: 'Style:'
	},
	{
		type: 'right',
		image: '/images/modeltest/6.jpg',
		title: 'VALERY',	
		model: 'Valeria',
		modelAgency: '/ OK’S Models',
		modelName: '',
		style:'',
		slider: '/images/modeltest/valery/1.jpg',
		slider2: '/images/modeltest/valery/2.jpg',
		slider3: '/images/modeltest/valery/3.jpg',
		link:'/valery',
		mua: '',
		styleMark: ''
	}
];
var types = ['left', 'right'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise (function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", '/modeltestType/' + types[i] + '.html', false);
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
			.replace('{{slider2}}', data[i].slider2)
			.replace('{{slider3}}', data[i].slider3)
			.replace('{{mua}}', data[i].mua)
			.replace('{{styleMark}}', data[i].styleMark)
			.replace('{{link}}', data[i].link)
		$('.modelloop').append(template);
	}
	console.log(templates);
}