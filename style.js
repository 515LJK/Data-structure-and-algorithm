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


//栈 Stack
function Stack(){
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.length = length;
    this.clear = clear;
}

function push(element){
    this.dataStore.push(element);
}

function pop(){
    return this.dataStore.pop();
}

function peek(){
    return this.dataStore[this.dataStore.length -1];
}

function length(){
    return this.dataStore.length;
}

function clear(){
    this.top = 0;
}

//栈可以用来判断一个算术表达式中的括号是否匹配。编写一个函数，该函数接收一个算术表达式作为参数，返回括号缺失的位置。下面是一个括号不匹配的算术表达式的例子：2.3+23/12 + (3.14159*0.24;

function judge(express){
	var s = new Stack(),
		index;

	for( var i=0;i<express.length;i++ ){

		if( ['[','{','('].indexOf(express[i]) !== -1 ){
			s.push(express[i]);
		}else if([']','}',')'].indexOf(express[i]) !== -1){
			s.push(express[i]);
		}
	}

	var word = '';

	if( s.length() == 2 ){
		return -1;
	}else{
		word = s.pop();
		if( ['[','{','('].indexOf(word) !== -1 ){
			return express.length+1;
		}else if([']','}',')'].indexOf(word) !== -1){
			return 0;
		}
	}

}

judge('2.3+23/12+3.14159*0.24)');

//一个算术表达式的后缀表达式形式如下：op1 op2 operator:使用两个栈，一个用来存储操作数，另外一个用来存储操作符，设计并实现一个JavaScript函数，该函数可以将中缀表达式转换为后缀表达式，然后利用栈对该表达式求值

function transfer(express){
	var s1 = new Stack(),
		s2 = new Stack(),
		s3 = new Stack(),
		arr,
		value,
		top,
		secondTop;

	for(var i=0;i<express.length;i++){
		if(Number(express[i])){
			s1.push(express[i])
		}else if( ['+','-','×','/','('].indexOf(express[i]) !== -1 ){
			var peek2 = s2.peek();
			switch(express[i]){
				case '+':
					if( ['+','-','/','×'].indexOf(peek2) !== -1 ){
						s1.push(s2.pop());
					}
					break;
				case '-':
					if( ['+','-','/','×'].indexOf(peek2) !== -1 ){
						s1.push(s2.pop());
					}
					break;
				case '×':
					if( ['/','×'].indexOf(peek2) !== -1 ){
						s1.push(s2.pop());
					}
					break;
				case '/':
					if( ['/','×'].indexOf(peek2) !== -1 ){
						s1.push(s2.pop());
					}
					break;
			};

			s2.push(express[i]);

		}else if( ')' === express[i] ){
			var onOff = true;
			while(s2.length()>0 && onOff){
				var pop2 = s2.peek();
				if(pop2 != '('){
					s1.push(s2.pop());
				}else{
					s2.pop();
					onOff = false;
				}
			}
		}

	}

	while(s2.length()>0){
		s1.push(s2.pop());
	}

	arr = s1.dataStore;
	for(var i=0;i<arr.length;i++){
		if(Number(arr[i])){
			s3.push(Number(arr[i]));			
		}else{
			switch(arr[i]){
				case '+':
					top = s3.pop();
					secondTop = s3.pop();
					s3.push(secondTop + top);
					break;
				case '-':
					top = s3.pop();
					secondTop = s3.pop();
					s3.push(secondTop - top);
					break;
				case '×':
					top = s3.pop();
					secondTop = s3.pop();
					s3.push(secondTop * top);
					break;
				case '/':
					top = s3.pop();
					secondTop = s3.pop();
					s3.push(secondTop / top);
					break;
			}
		}

	}

	return s3.pop();
}


console.log(transfer("1+((2+3)×4)-5"));


//二叉树
function Node(data,left,right){
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}

function show(){
    return this.data;
}

//Node对象既保存数据，也保持和其他节点的链接

function BST(){
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
}

function insert(data){
    var n = new Node(data,null,null);
    if(this.root == null){
        this.root = n;
    }else{
        var current = this.root;
        var parent;
        while(true){
            parent = current;
            if(data<current.data){
                current = current.left;
                if(current == null){
                    parent.left = n;
                    break;
                }
            }else{
                  current = current.right;
                  if(current == null){
                      parent.right = n;
                      break;
                  }
            }
        }
    }
}

//有三种遍历BST的方式：中序、先序和后序。中序遍历按照节点上的键值，以升序访问BST上的所有节点。先序遍历先访问根节点，然后以同样方式访问左字树和右字树。后序遍历先访问叶子节点，从左子树到右子树，再到根节点

//中序遍历
function inOrder(node){
    if(!(node == null)){
        inOrder(node.left);
        console.log(node.show()+"");
        inOrder(node.right);
    }
}

//先序遍历
function preOrder(node){
    if(!(node == null)){
        console.log(node.show()+"");
        preOrder(node.left);
        preOrder(node.right)
    }
}

//后序遍历
function postOrder(node){
    if(!(node==null)){
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.show()+"");
    }
}

//二叉查找

//找最小值

function getMin(){
     var current = this.root;
     while(!(current.left === null)){
          current = current.left;
     }
     return current.data;
}

//找给定值

function find(data){
     var current = this.root;
     while(current!=null){
          if(current.data == data){
               return current;
          }else if(data<current.data){
               current = curent.left;
          }else{
               current = current.right;
          }
     }

     return null;
     
}



//四种基本算法
//冒泡排序：
function bubbleSort(arr){
    var temp;
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){
                temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return arr;
}

//选择排序
function selectSort(arr){
    var len = arr.length;
    var index,temp;
    for(var i = 0; i < len-1 ;i++){
        index = i;
        for(var j = i + 1 ; j<len; j++){
            if(arr[j] < arr[index]){//寻找最小的数
                index = j;//保存最小数的索引
            }
        }
        temp = arr[i];
        arr[i] = arr[index];
        arr[index] = temp;
    }
    return arr;
}


//插入排序

function insertSort(arr) {
        for (var i = 1; i < arr.length; i++) {
            var temp = arr[i];
            var j = i - 1;
             while (j >= 0 && arr[j] > temp) {
                 arr[j + 1] = arr[j];
                  j--;             }
            arr[j + 1] = temp;
        }
       	return arr;
  }
var arr = [1, 45, 37, 5, 48, 15, 37, 26, 29, 2, 46, 4, 17, 50, 52];

//快速排序

function qSort(arr){

    if(arr.length == 0){
        return [];
    }

    var left = [];
    var right = [];
    var min = arr[0];

    for(var i=1;i<arr.length;i++){
        if(arr[i]<min){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }

    return qSort(left).concat(min,qSort(right));

}
