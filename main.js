$(document).ready(function(){
	$.get("http://mi.ecjtu.net/list?count=20&start_from=0", function(result){
		for(var i=0;i<result.length;i++){
			var tmpl = [
			'						<a href=""><li class="main">',
			'				<div class="author">',
								result[i]['author'],
			'				</div>',
			'				<div class="content">',
								result[i]['content'],
			'				</div>',
			'			</li></a>'].join('\n');
			$('ul').append(tmpl);
		}
	},'json');
});



