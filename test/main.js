$.ajax({
  type:'GET',
  url:'https://baroqoo.com:8000/api/v1/products',
  
  success:function(data) {
  	count = data.length;
	    for (var i = 0; i < data.length; i++) {
			 $('body').append('<div class="products">' + data[i].products + '</div>');				    
	        console.log(data);
	    }
  },
});