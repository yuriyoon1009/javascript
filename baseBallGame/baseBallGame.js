//var number = [];
//for(var i = 0; i < 4; i++){number[i] = Math.floor(Math.random() * 10)}

var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var num = [];

for (var i = 0; i < 4; i++) {
    var select = Math.floor(Math.random() * list.length);
    num[i] = list.splice(select, 1)[0];
}

//console.log(num)

var count = 0;
var strike = 0;
var ball = 0;

while (count < 10) {

    var input = prompt('input number'); //string
    var inputArray = input.split(''); //'3456' string > inputArray = ['3', '4', '5', '6']
    strike = 0;
    ball = 0;
    count++;

    for (var k = 0; k < 4; k++) {
        for (var j = 0; j < 4; j++) {
            if (num[k] == inputArray[j]) {
                if (k === j) {
                    strike++;
                } else { ball++; }
                break;
            }
        }
    }
    if (strike === 4) {
        console.log('Home run ' + (count - 1) + 'times, you are done ! ')
    } else if (count >= 10) {
        console.error('Game over, you must guess by 10 times. the answer is ' + num);
    } else {
        // ['1','2','3','4'].join('') 
        // '1234'
        console.info(inputArray.join('') + ' strike ' + strike + ' ball ' + ball)
    }
}