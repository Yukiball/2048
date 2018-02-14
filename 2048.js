var list = {
	init: function(){
		this.getDom();
		this.grade();
	},
	getDom: function(){
		this.con = $('.con');
		this.now = $('.now .rem');
		$('html').css('height',window.screen.height+ 'px')
		this.now.text(0) 
		this.his = $('.history .rem')
		this.score = 0;
		this.key = false;
		this.setDom()
		this.getNum()
		this.count = 0
	},
	setDom: function(){
		for(var i = 1; i < 5; i++){
			for(var j = 1; j < 5; j++){
				var li = $('<li class="numbox" count='+i+","+j+' line='+i+' list='+j+'><span></span></li>');
				this.con.append(li);
			}
		}
		this.txt = $('.numbox span');
		this.txt.text('0');
		this.show()
	},
	getNum: function(){
		var newArr = [];
		var ran = getRandom(2,4);//一开始生成几个块
		for(var i = 0;i < 100;i++){
			var num = getRandom(1,16);
			newArr.push(num);
			this.rem = Array.from(new Set(newArr));
			if (this.rem.length == ran) {
				this.addNum()//初始化
			};
		}		
	},
	addNum: function(){
		this.show()
		for(var i = 0; i < this.rem.length; i++){
			let rand = Math.round(Math.random() + 1) * 2;
			var numrem = this.rem[i] - 1;//rem是1-16 arr是0-15
			this.arr[numrem].text(String(rand))
		}
		this.show()
		this.boxcolor()
		this.gameStart()
	},
	show: function(){
		this.arr = []
		for(let every of this.txt){
			this.arr.push($(every))
			if ($(every).text() == '0') {
				$(every).css('display','none')
			}else{
				$(every).css('display','block')
			}
		}
	},
	gameStart: function(){
		var that = this;
		$(document).on('keydown',function(e){
			switch(e.which){
				case 37: that.onkeydown(37);break;//左
			　　case 38: that.onkeydown(38);break;//上
			　　case 39: that.onkeydown(39);break;//右
			　　case 40: that.onkeydown(40);break;//下
			}
		})
		$(document).on('touchstart',function(e){
			that.touchstart(e)
		})
		$(document).on('touchmove',function(e){
			that.touchmove(e)
		})
		$(document).on('touchend',function(e){
			that.touchend(e)
		})
		
	},
	touchstart:function(e){
		e.preventDefault();
        var touch = e.touches[0];
        this.startY = touch.clientY; 
        this.startX = touch.clientX; 
	},
	touchmove:function(e){
		e.preventDefault();
        var touch = e.touches[0];
        this.endY = touch.clientY; 
        this.endX = touch.clientX; 
	},
	touchend:function(){
		console.log(this.endY)
		if(this.endY - this.startY > 30){
			this.onkeydown(40)
		}else if(this.endY - this.startY < -30){
			this.onkeydown(38)
		}else if(this.endX - this.startX > 30){
			this.onkeydown(39)
		}else if(this.endX - this.startX < -30){
			this.onkeydown(37)
		}
	},
	boxcolor:function(){
		for(let span of this.txt){
			if ($(span).text() == "2") {
				$(span).attr('class' , 'num2')
			}else if($(span).text() == "4"){
				$(span).attr('class' , 'num4')
			}else if($(span).text() == "8"){
				$(span).attr('class' , 'num8')
			}else if($(span).text() == "16"){
				$(span).attr('class' , 'num16')
			}else if($(span).text() == "32"){
				$(span).attr('class' , 'num32')
			}else if($(span).text() == "64"){
				$(span).attr('class' , 'num64')
			}else if($(span).text() == "128"){
				$(span).attr('class' , 'num128')
			}else if($(span).text() == "256"){
				$(span).attr('class' , 'num256')
			}else if($(span).text() == "512"){
				$(span).attr('class' , 'num512')
			}else if($(span).text() == "1024"){
				$(span).attr('class' , 'num1024')
			}else if($(span).text() == "2048"){
				$(span).attr('class' , 'num2048')
			}
		}
	},
	onkeydown:function(num){
		this.numbox = $('.numbox')
		var savearr1 = [];
		var savearr2 = [];
		var savearr3 = [];
		var savearr4 = [];	
		var arrlist1 = [];	
		var arrlist2 = [];	
		var arrlist3 = [];	
		var arrlist4 = [];

		if (num == 37) {
			this.leftright();
			for(var i = 0; i < 4;i ++){
				savearr1.push($(this.arr1[i]).children().text());
				savearr2.push($(this.arr2[i]).children().text());
				savearr3.push($(this.arr3[i]).children().text());
				savearr4.push($(this.arr4[i]).children().text());
			}
			for(var i = 0; i < 4; i++){
				 arrlist1[i] = savearr1[i]
				 arrlist2[i] = savearr2[i]
				 arrlist3[i] = savearr3[i]
				 arrlist4[i] = savearr4[i]
			}
			this.save1 = this.array(savearr1);
			this.save2 = this.array(savearr2);
			this.save3 = this.array(savearr3);
			this.save4 = this.array(savearr4);
			for(var j = 0; j < 4;j ++){
				$(this.arr1[j]).children().text(this.save1[j]);
				$(this.arr2[j]).children().text(this.save2[j]);
				$(this.arr3[j]).children().text(this.save3[j]);
				$(this.arr4[j]).children().text(this.save4[j]);
			}
			this.show()		
			if (String(arrlist1) == String(savearr1) && String(arrlist2) == String(savearr2) && String(arrlist3) == String(savearr3) && String(arrlist4) == String(savearr4)) {
			}else{
				this.born()
			}
			this.boxcolor()
			this.grade()
			this.gameover(37)
			this.win()
		}else if(num == 38){
			this.updown()
			for(var i = 0; i < 4;i ++){
				savearr1.push($(this.newarr1[i]).children().text());
				savearr2.push($(this.newarr2[i]).children().text());
				savearr3.push($(this.newarr3[i]).children().text());
				savearr4.push($(this.newarr4[i]).children().text());
			}
			for(var i = 0; i < 4; i++){
				 arrlist1[i] = savearr1[i]
				 arrlist2[i] = savearr2[i]
				 arrlist3[i] = savearr3[i]
				 arrlist4[i] = savearr4[i]
			}
			this.save1 = this.array(savearr1);
			this.save2 = this.array(savearr2);
			this.save3 = this.array(savearr3);
			this.save4 = this.array(savearr4);
			for(var j = 0; j < 4;j ++){
				$(this.newarr1[j]).children().text(this.save1[j]);
				$(this.newarr2[j]).children().text(this.save2[j]);
				$(this.newarr3[j]).children().text(this.save3[j]);
				$(this.newarr4[j]).children().text(this.save4[j]);
			}
			this.show()
			if (String(arrlist1) == String(savearr1) && String(arrlist2) == String(savearr2) && String(arrlist3) == String(savearr3) && String(arrlist4) == String(savearr4)) {
			}else{
				this.born()
			}
			this.boxcolor()
			this.grade()
			this.gameover(38)
			this.win()
		}else if(num == 39){
			this.leftright()
			for(var x = 3; x > -1 ;x--){
				savearr1.push($(this.arr1[x]).children().text());
				savearr2.push($(this.arr2[x]).children().text());
				savearr3.push($(this.arr3[x]).children().text());
				savearr4.push($(this.arr4[x]).children().text());
			}
			for(var i = 0; i < 4; i++){
				 arrlist1[i] = savearr1[i]
				 arrlist2[i] = savearr2[i]
				 arrlist3[i] = savearr3[i]
				 arrlist4[i] = savearr4[i]
			}
			this.save1 = this.array(savearr1).reverse();
			this.save2 = this.array(savearr2).reverse();
			this.save3 = this.array(savearr3).reverse();
			this.save4 = this.array(savearr4).reverse();
			for(var j = 3; j > -1 ;j --){
				$(this.arr1[j]).children().text(this.save1[j]);
				$(this.arr2[j]).children().text(this.save2[j]);
				$(this.arr3[j]).children().text(this.save3[j]);
				$(this.arr4[j]).children().text(this.save4[j]);
			}
			this.show()
			if (String(arrlist1.reverse()) == String(savearr1) && String(arrlist2.reverse()) == String(savearr2) && String(arrlist3.reverse()) == String(savearr3) && String(arrlist4.reverse()) == String(savearr4)) {
			}else{
				this.born()
			}
			this.boxcolor()
			this.grade()
			this.gameover(39)
			this.win()
		}else if(num == 40){
			this.updown()
			for(var x = 3; x > -1 ;x--){
				savearr1.push($(this.newarr1[x]).children().text());
				savearr2.push($(this.newarr2[x]).children().text());
				savearr3.push($(this.newarr3[x]).children().text());
				savearr4.push($(this.newarr4[x]).children().text());
			}
			for(var i = 0; i < 4; i++){
				 arrlist1[i] = savearr1[i]
				 arrlist2[i] = savearr2[i]
				 arrlist3[i] = savearr3[i]
				 arrlist4[i] = savearr4[i]
			}
			this.save1 = this.array(savearr1).reverse();
			this.save2 = this.array(savearr2).reverse();
			this.save3 = this.array(savearr3).reverse();
			this.save4 = this.array(savearr4).reverse();
			for(var j = 3; j > -1 ;j --){
				$(this.newarr1[j]).children().text(this.save1[j]);
				$(this.newarr2[j]).children().text(this.save2[j]);
				$(this.newarr3[j]).children().text(this.save3[j]);
				$(this.newarr4[j]).children().text(this.save4[j]);
			}
			this.show()
			if (String(arrlist1.reverse()) == String(savearr1) && String(arrlist2.reverse()) == String(savearr2) && String(arrlist3.reverse()) == String(savearr3) && String(arrlist4.reverse()) == String(savearr4)) {
			}else{
				this.born()
			}
			this.boxcolor()
			this.grade()
			this.gameover(40)
			this.win()
		}
	},
	//按下左右之后
	leftright:function(){
		this.arr1=[];this.arr2=[];this.arr3=[];this.arr4=[]
		for(let prop of this.numbox){
			var saveline = $(prop).attr('line')
			if (saveline == 1) {
				this.arr1.push(prop)
			}else if(saveline == 2){
				this.arr2.push(prop)
			}else if(saveline == 3){
				this.arr3.push(prop)
			}else if(saveline == 4){
				this.arr4.push(prop)
			}
		}
	},
	//按下上下之后
	updown:function(){
		this.newarr1=[];this.newarr2=[];this.newarr3=[];this.newarr4=[];
		for(let prop of this.numbox){
			var savelist = $(prop).attr('list')
			if (savelist == 1) {
				this.newarr1.push(prop)
			}else if(savelist == 2){
				this.newarr2.push(prop)
			}else if(savelist == 3){
				this.newarr3.push(prop)
			}else if(savelist == 4){
				this.newarr4.push(prop)
			}
		}
	},
	//算法
	array:function(array){
		var newarray = array;
		for(var i= 0; i < 4;i++){
			if(array[i] == '0'){
				array.splice(i,1);
				i --;
			}
		}
		if (array.length == 0) {
			array.push("0","0","0","0");
		}else if(array.length == 1){
			array.push("0","0","0");
		}else if(array.length == 2){
			if (array[0] == array[1]) {
				array[0] = String(Number(array[0]) * 2);
				array[1] = "0";
				this.score += Number(array[0])
				this.now.text(this.score)
			}
			array.push('0','0');
		} else if(array.length == 3){
			if (array[0] == array[1]) {
				array[0] = String(parseInt(array[0]) * 2);
				array[1] = array[2];
				array[2] = "0";		
				this.score += Number(array[0])
				this.now.text(this.score)
			}else if(array[0] !== array[1] && array[1] == array[2]){
				array[1] = String(parseInt(array[1])*2);
				array[2] = "0";
				this.score += Number(array[1])
				this.now.text(this.score)
			}
			array.push('0');
		} else if(array.length == 4){
			if (array[0] == array[1]) {
				array[0] = String(parseInt(array[0])*2);
				this.score += Number(array[0])
				this.now.text(this.score)
				if (array[2] == array[3]) {
					array[2] = String(Number(array[2]) * 2);
					array[3] = '0';
					this.score += Number(array[2])
					this.now.text(this.score)
				}
				array[1] = array[2];
				array[2] = array[3];
				array[3] = '0';
			}else if(array[0] !== array[1]){
				if (array[1] == array[2]) {
					array[1] = String(parseInt(array[1])*2);
					array[2] = array[3];
					array[3] = '0';	
					this.score += Number(array[1])
					this.now.text(this.score)
				}else if (array[2] == array[3]) {
					array[2] = String(Number(array[2]) * 2);
					array[3] = '0';
					this.score += Number(array[2])
					this.now.text(this.score);
				};
			}
		}
		return newarray
	},
	//每动一下生成一个新的
	born:function(){
		this.savespan = []
		for(let span of this.txt){
			if ($(span).text() == "0") {
				this.savespan.push($(span))
			};
		}
		let spannum = getRandom(0,this.savespan.length - 1);
		let rand = Math.round(Math.random() + 1) * 2;
		this.savespan[spannum].text(String(rand))
		this.show()
	},
	grade:function(){
		if(!window.localStorage){
            console.log("浏览器不支持localstorage,采用cookie");
            this.cookie = window.cookie;
            if(!this.cookie){
            	this.cookie.setCookie(score,0,80);
            	this.his.text(this.cookie.getCookie(score));
            }else{
            	this.his.text(this.cookie.getCookie(score));
            	if (Number(this.now.text()) > Number(this.his.text())) {
            		this.cookie.removeCookie(score);
					this.cookie.setCookie(score,Number(this.now.text()),80);
            		this.his.text(this.cookie.getCookie(score));
				};
            }
        }else{
            this.storage = window.localStorage;
            if(!this.storage.score){
            	this.storage.score = 0;
            	this.his.text(this.storage.score);
            }else{
            	this.his.text(this.storage.score);
            	if (Number(this.now.text()) > Number(this.his.text())) {
					this.storage.score = Number(this.now.text())
            		this.his.text(this.storage.score);
				};
            }
        }
	},
	win:function(){
		var that = this
		for(let prop of this.txt){
			if ($(prop).text() == '2048') {
				setTimeout(function(){
					$(document).off('keydown');
					var nDiv = '<div class="aleart"><span class="over">恭喜您通关~</span><span class="score">您的分数为:'+'<br>'+ String($(that.now).text()) +'</span><span class="agin">再来一次</span></div>'
					$('body').prepend(nDiv);
					that.grade()
					$('.agin').on('click',function(e){
						$('.con').empty();
						$('.aleart').remove()
						that.init()
					})
				},100)
			};
		}
	},
	gameover: function(num){
		var that = this;
		let proparr = [];
		let truelist = [];
		let savearr1 = [];
		let savearr2 = [];
		let savearr3 = [];
		let savearr4 = [];
		let savearr5 = [];
		let savearr6 = [];
		let savearr7 = [];
		let savearr8 = [];	
		for(let prop of this.txt){
			proparr.push(Number($(prop).text()))
		}
		for(var i= 0; i < proparr.length; i++){
			if(proparr[i] == 0){
				proparr.splice(i,1);
				i --;
			}
		}
		this.updown()
		this.leftright()
		for(var i = 0; i < 4;i ++){
			savearr1.push($(this.newarr1[i]).children().text());
			savearr2.push($(this.newarr2[i]).children().text());
			savearr3.push($(this.newarr3[i]).children().text());
			savearr4.push($(this.newarr4[i]).children().text());
			savearr5.push($(this.arr1[i]).children().text());
			savearr6.push($(this.arr2[i]).children().text());
			savearr7.push($(this.arr3[i]).children().text());
			savearr8.push($(this.arr4[i]).children().text());
		}
		if(proparr.length == 16 && savearr1[0] !== savearr1[1] && savearr1[1] !== savearr1[2] && savearr1[2] !== savearr1[3]
			&&savearr2[0] !== savearr2[1] && savearr2[1] !== savearr2[2] && savearr2[2] !== savearr2[3]
			&&savearr3[0] !== savearr3[1] && savearr3[1] !== savearr3[2] && savearr3[2] !== savearr3[3]
			&&savearr4[0] !== savearr4[1] && savearr4[1] !== savearr4[2] && savearr4[2] !== savearr4[3]
			&&savearr5[0] !== savearr5[1] && savearr5[1] !== savearr5[2] && savearr5[2] !== savearr5[3]
			&&savearr6[0] !== savearr6[1] && savearr6[1] !== savearr6[2] && savearr6[2] !== savearr6[3]
			&&savearr7[0] !== savearr7[1] && savearr7[1] !== savearr7[2] && savearr7[2] !== savearr7[3]
			&&savearr8[0] !== savearr8[1] && savearr8[1] !== savearr8[2] && savearr8[2] !== savearr8[3]
		){
			this.count++
		}
		if(this.count == 1){
			$(document).off('keydown');
			setTimeout(function(){
				console.log(1)
				var nDiv = '<div class="aleart"><span class="over">游戏结束!</span><span class="score">您的分数为:'+'<br>'+ String($(that.now).text()) +'</span><span class="agin">再来一次</span></div>'
				$('body').prepend(nDiv);
				that.grade()
				$('.agin').on('click',function(e){
					$('.con').empty();
					$('.aleart').remove()
					that.init()
				})
				$('.agin').on('ontouchstart',function(e){
					$('.con').empty();
					$('.aleart').remove()
					that.init()
				})
			},100)
		}
	}
}
list.init()