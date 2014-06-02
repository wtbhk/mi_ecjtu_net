$(document).ready(function(){
	redraw();
});

$("ul li").bind("click", function(){
	$.get("http://mi.ecjtu.net/"+$(this).attr('id')+"/vote", function(result){
		redraw();
	});
});

function redraw(){
	$.get("http://mi.ecjtu.net/list?count=20&start_from=0", function(result){
		for(var i=0;i<result.length;i++){
			var tmpl = [
			'						<a href="javascript:void(0)"><li class="main" id="'+result[i]['id']+'">',
			'				<div class="author">',
								result[i]['author'],
			'				</div>',
			'				<div class="content">',
								result[i]['content'],
			'				</div>',
			'			</li></a>'].join('\n');
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
	str += r < 10 ? "0" + r.toString(16) : r.toString(16);
	str += g < 10 ? "0" + g.toString(16) : g.toString(16);
	str += b < 10 ? "0" + b.toString(16) : b.toString(16);
	return str;
}