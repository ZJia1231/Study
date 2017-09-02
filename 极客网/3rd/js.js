$(document).ready(function() {
	var $Input_0 = $("#input_0");
	var $Div_1 = $("#div_1");
	var $Li = $("#ul_1 li");
		$Li.click(function () {
			var index = $Li.index(this);
			$.ajax({
				type : "GET",
				url : "http://rapapi.org/mockjsdata/14169/geek",
				datatype : "json",
				success : function(result) {
					$Div_1.html('<h2>'+result.list[index]+'</h2>');
				},
				error : function() {
					$Div_1.html("<h1>请求出错</h1>");
				}
			})
		})
}) 

