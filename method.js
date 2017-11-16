function getRandom(min,max){
	var range = max - min;
	var rand = Math.random();
	return (min + Math.round(rand * range))
}
function setCookie(name,value,time){
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + time);
	document.cookie = name + '=' + value + ';expires=' + oDate;
}
function getCookie(key) {
	var arr = document.cookie.split('; ');
	for(var i = 0, len = arr.length; i < len; i++) {
		var temp = arr[i].split('=');
		if(temp[0] == key) {
			return temp[1];
		}
	}
}
function removeCookie (key) {
	setCookie(key, '', -1);
}