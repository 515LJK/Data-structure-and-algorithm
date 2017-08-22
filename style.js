//数组  Array

//1.创建一个记录学生成绩的对象，提供一个添加成绩的方法，以及一个显示学生平均成绩的方法

var isArray = Array.isArray,		//存储原生方法
	objPro = Object.prototype;	

var Score = function(){

	this.data = [];		//存储学生成绩的数组
};

Score.prototype = {
	constructor:Score,
	add:function(scoreArray){			//添加学生成绩的方法
		if( isArray(scoreArray) || objPro.toString.call(scoreArray) == '[object Array]' ){
			this.data.push(scoreArray);
		}else{
			alert('传入的学生成绩数据必须为数组')
		};
	},
	average:function(){					//显示学生平均成绩的方法
		var data = this.data,
			len = this.data.length,
			total = 0,
			average = 0.0;
		if( len > 0 ){
			for(var i=0;i<len;i++ ) {
				for(var j=0;j<data[i].length;j++){
					total += data[i][j];
				};
				average = total / data[i].length;
				console.log(average);
				average = 0.0;
				total = 0;
			};
		};
	}
};

//2.将一组单词存储在一个数组中，并按正序和倒序分别显示这些单词
var Order = function(){

	this.data = [];		//存储单词的数组
};

Order.prototype = {
	constructor:Order,
	add:function(){						//添加单词的方法
	    var arg = arguments;
		for( var i=0;i<arg.length;i++ ){
			this.data.push(arg[i]);
		}
	},
	positive:function(){					//正序
		this.data.sort();
		return this.data;
	},
	reverse:function(){						//倒序
		this.data.sort();
		this.data.reverse();
		return this.data;
	}
};


//3.修改weekTemps对象，使它可以使用一个二维数组来存储每月的有用数据。增加一些方法以显示月平均数，具体某一周平均数和所有周的平均数
var WeekTemps = function(){
	this.dataStore = [];
}

WeekTemps.prototype = {
	constructor:WeekTemps,
	add:function(dataArray){
		if( isArray(dataArray) || objPro.toString.call(dataArray) == '[object Array]' ){
			this.dataStore.push(dataArray);
		}else{
			alert('传入的数据必须为数组')
		};
	},
	month:function(){				//月平均数
		var data = this.dataStore,
			average = 0,
			total = 0;

		for( var i=0;i<data.length;i++ ){
			for( var j=0;j<data[i].length;j++ ){
				total += data[i][j];
			};
		};

		average = total / 31;

		return average;

	},
	someWeek:function(num){				//某个周的平均数
		var data = this.dataStore,
			average = 0,
			total = 0,
			num = num>=0?num:0,
			len = data[num].length;

		for( var i=0;i<len;i++ ){
			total += data[num][i];
		}

		average = total / 7;
		return average;
	},
	allWeek:function(){					//所有周的平均数
		var data = this.dataStore,
			average = 0,
			total = 0,
			num = 0;

		for( var i=0;i<data.length;i++ ){
			for( var j=0;j<data[i].length;j++ ){
				total += data[i][j];
			};
			num++;
		};

		average = total / num;

		return average;
	}
}



//创建一个对象，它将字母存储在一个数组中，并且用一个方法可以将字符连在一起,显示成一个单词

var Connect = function(){
	this.data = [];		//存储字母的数组
}

Connect.prototype.connect = function(){
	var newStr = this.data.reduce(function(start,now){
		return start + now;
	});
	return newStr;
}

Connect.prototype.add = function(){
	var arg = arguments;

	for(var i=0;i<arg.length;i++){
		this.data.push(arg[i]);
	}

}

//队列 List

function List(){
	this.listSize = 0;
	this.pos = 0;
	this.dataStore = [];  //初始化一个空数组来保存列表元素
	this.clear = clear;
	this.find = find;
	this.toString = toString;
	this.insert = insert;
	this.append = append;
	this.remove = remove;
	this.front = front;
	this.end = end;
	this.prev = prev;
	this.next = next;
	this.length = length;
	this.currPos = currPos;
	this.moveTo = moveTo;
	this.getElement = getElement;
	this.length = length;
	this.contains = contains;
	this.addThan = addThan;
	this.addLess = addLess;
}

function append(element){
	this.dataStore[this.listSize++] = element;
};

function find(element){
	for( var i=0;i<this.dataStore.length;i++ ){
		if( this.dataStore[i] == element ){
			return i;
		};
	};
	return -1;
};

function remove(element){
	var foundAt = this.find(element);
	if(foundAt>-1){
		this.dataStore.splice(foundAt,1);
		--this.listSize;
		return true;
	};
	return false;
};

function length(){
	return this.listSize;
};

function toString(){
	return this.dataStore;
};

function insert(element,after){
	var insertPos = this.find(after);
	if( insertPos > -1 ){
		this.dataStore.splice(insertPos+1,0,element);
		++this.listSize;
		return true;
	};
	return false;
};

function clear(){
	delete this.dataStore;
	this.dataStore = [];
	this.listSize = this.pos = 0;
};

function contains(element){
	for(var i=0;i<this.dataStore.length;i++){
		if(this.dataStore[i] == element){
			return true;
		};
	};
	return false;
};

function front(){
	this.pos = 0;
};

function end(){
	this.pos = this.listSize-1;
};

function prev(){
	if(this.pos>0){
		--this.pos;
	};
};

function next(){
	if(this.pos < this.listSize -1){
		++this.pos;
	};
};

function currPos(){
	return this.pos;
};

function moveTo(position){
	this.pos = position;
};

function getElement(){
	return this.dataStore[this.pos];
};


//增加一个向列表中插入元素的方法，该方法只在待插元素大于列表中的所有元素时才执行插入操作。这里的大于有多重含义，对于数字，它是指数值上的大小；对于字母，它是指在字母表中出现的先后顺序

function addThan(element){

	var onOff =true,
		data = this.dataStore,
		index;

	for( var i=0;i<data.length;i++ ){
		if( element <= data[i] ){
			onOff = false;
			index = this.find(data[i]);
		};
	};

	if(onOff){
		data.splice(index,0,element);
		this.listSize++;
	}else{
		alert( element + '并不是大于列表中的所有数据')
	};

};

//增加一个向列表中插入元素的方法，该方法只在待插元素小于列表中的所有元素时才执行插入操作。


function addLess(element){

	var onOff =true,
		data = this.dataStore,
		index;

	for( var i=0;i<data.length;i++ ){
		if( element>data[i] ){
			onOff = false;
			index = this.find(data[i]);
		};
	};

	if(onOff){
		data.splice(index,0,element);
		this.listSize++;
	}else{
		alert( element + '并不是小于列表中的所有数据')
	};

};

//创建Person类，该类用于保存人的姓名和性别信息。创建一个至少包含10个Person对象的列表。写一个函数显示列表中所有拥有相同性*别的人。

var Person = function(name,sex){
	this.name = name;
	this.sex = sex;
};


var list = new List();

list.append(new Person('1','man'));
list.append(new Person('2','female'));
list.append(new Person('3','man'));
list.append(new Person('4','female'));
list.append(new Person('5','man'));
list.append(new Person('6','female'));
list.append(new Person('7','man'));
list.append(new Person('8','female'));
list.append(new Person('9','man'));
list.append(new Person('10','female'));

function identicalSex(list){

	var man = '';
	var female = '';

	for( var i=0;i<list.listSize;i++ ){
		var cur = list.getElement();
		if( cur.sex == 'man' ){
			man += JSON.stringify(cur);
			list.next();
		}else{
			female += JSON.stringify(cur);
			list.next();
		}
	}

	console.log('男生有'+man);
	console.log('女生有'+female);


}

identicalSex(list);