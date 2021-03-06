$(document).ready(function(){
	redraw();
	$("ul").on('click','li', function(){
		var id = $(this).attr('id');
		$.get("http://mi.ecjtu.net/"+id+"/vote", function(result){
			console.log(result,result['id'],result['vote'])
			changeColor(result['id'], calcColor(result['vote']));
		},'json');
	});
	$(".new button").click( function(){
		var author = $("#college option:selected").text() + $("#grade option:selected").text();
		var content = $("#content").val();
		$.post("http://mi.ecjtu.net/new", {'author':author, 'content':content}, function(result){
			redraw();
		});
	});
});


function changeColor(id, color){
	console.log(id,color)
	$('ul li[id='+id+']').css('background-color', color);
}

function redraw(){
	$('ul').html('');
	$.get("http://mi.ecjtu.net/list?count=30&start_from=0", function(result){
		for(var i=0;i<result.length;i++){
			var tmpl = [
			'						<li class="main" id="'+result[i]['id']+'"><a href="javascript:void(0)">',
			'				<div class="author">',
								result[i]['author'],
			'				</div>',
			'				<div class="content">',
								result[i]['content'],
			'				</div>',
			'			</a></li>'].join('\n');
			$('ul').append(tmpl);
			$('ul li:last').css('background-color', calcColor(result[i]['vote']));
			console.log(calcColor(result[i]['vote']));
		}
	},'json');
}

function calcColor(vote){
	var str = '#';
	var r = parseInt(vote * (243-22)/20 + 22);
	var g = parseInt(160);
	var b = parseInt(133 - vote * (133-18)/20);
	r = r > 254 ? 254 : r;
	b = b < 16 ? 16 : b;
	//10 to 16
	str += r < 10 ? "0" + r.toString(16) : r.toString(16);
	str += g < 10 ? "0" + g.toString(16) : g.toString(16);
	str += b < 10 ? "0" + b.toString(16) : b.toString(16);
	return str;
}