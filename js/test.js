var count;
$.ajax({
    type: 'GET',
    url: 'https://baroqoo.com:8000/api/v1/categories',

    success: function (data) {
	    count = data.length;
	    for (var i = 0; i < data.length; i++) {
		    $('body').append('<div page="' + Math.floor(i / 25) + '" class="category">' + data[i].title + '</div>');
		    data[i].title
		    
	        console.log(data);
        }
        $ ('.category').hide();
        $('[page=0]').show();
   },
    contentType: "application/json",
    dataType: 'json'
});
var page = 0;

function next() {
	if (page < Math.floor( count / 25)){
		page++;
		$ ('.category').hide();
		$('[page='+ page +']').show();
	}
}
function prev() {
	if (page > 0 ) {
		page--;
		$ ('.category').hide();
		$('[page='+ page +']').show();
	}
}

