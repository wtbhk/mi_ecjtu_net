$(document).ready(function(){
	$.get("http://mi.ecjtu.net/list?count=20&start_from=0", function(result){
		for(var i=0;i<result.length;i++){
			var tmpl = [
			'						<a href="javascript:void(0)"><li class="main">',
			'				<div class="author">',
								result[i]['author'],
			'				</div>',
			'				<div class="content">',
								result[i]['content'],
			'				</div>',
			'			</li></a>'].join('\n');
			$('ul').append(tmpl);
			$('ul li:last').css('background-color', calcColor(result[i]['vote']))
		}
	},'json');
});


function calcColor(vote){
	var r = vote * (243-22)/20 + 22;
	var g = 160;
	var b = 133 - vote * (133-18)/20 
	return parserColor("rgb("+r+","+g+","+b+")");
}
	/**
	 * [parserColor 颜色转换为十六进制]
	 * @param  {[String]} value [需要转换的颜色值]
	 * @return {[String]}       [返回转换后的颜色值,#0000FF形式]
	 */
function parserColor (value){
	var
	str      = "",
	arr      = [],
	arri     = "",
	i        = 0,
	vlen     = value.length,
	colorObj = {
		"black":"000000",
		"red":"0000FF",
		"blue":"FF0000",
		"white":"FFFFFF",
		"yellow":"FFFF00",
		"orange":"FFA500"
	};

	//rgb(0,0,255)
	if(/rgb/.test(value)){
		arr = value.match(/\d+/g);
		vlen = arr.length;
		for(; i < vlen ; i++){
			arri = parseInt(arr[i]);
			//转换为十六进制
			str += arri < 10 ? "0" + arri.toString(16) : arri.toString(16);
		}
	}else if(/^#/.test(value)){
		//#00f
		if(vlen == 4){
			str = value.replace(/[A-Za-z0-9]/g,"$&$&");
		}else if(vlen == 7){
			//#FF0000
			str = value.replace(/^#([A-Za-z0-9]*)/,"$1");
		}else{
			str = "FFFFFF";
		}
	}else{
		//red/orange
		value = value.toLowerCase();
		str = colorObj[value] ? colorObj[value] : "FFFFFF";//不匹配默认为白色
	}
	return "#" + str.toUpperCase();
}