
### Spread 연산자
- Spread 연산자(...) : Rest파라미터는 Spread 연산자(...)를 사용하여 파라미터를 작성한 형태다.
- 인수를 함수 내부에서 배열로 전달받을 수 있다.
- 반드시 마지막 파라미터이어야 한다.
```
function foo(param1, param2, ...rest){
  console.log(Array.isArray(rest)); //true
  console.log(param1) //1
  console.log(rest)
  //[3,4,5]
}

foo(1,2,3,4,5) //arguments {'0':1, '1':2}

/*
  [1,2,3,4,5] arguments 유사배열객체를
  실제 배열이 아니지만 rest파라미터를 
  사용해서 배열로 전달. call, apply 를 써야하는 번거로움이 없어짐.
*/

```

```
//ES5
function convertArr5(){
  var arr = Array.prototype.slice.call(arguments);
  return Array.isArray(arr); //true
}

convertArr5(1,2,3,4); 


//ES6
function convertArr6(...args){
  return Array.isArray(args); //true
}
convertArr6(1,2,3,4); 
```

- Spread 연산자는 이터러블을 개별 요소로 분리한다. (iterable : 순회 가능한 자료 구조)
```
console.log(...[1, 2, 3]) // -> 1, 2, 3

//ES5
Math.min.apply(null, [1,2,4]) //1

//ES6 개별 요소로 분리
Math.min(...[1,2,3]) //1

```

#### 배열에서 사용하는 경우 
- Spread 연산자를 배열에서 사용하면 가독성이 향상된다.

1. conat
```
// ES5
[1,2,3].concat([4,5,6]);

// ES6
[...[1,2,3],4,5,6];

var arr = [1,2,3]
[...arr, 4,5,6];
```
2. push
```
//ES5
var arr1 = [1,2,3];
var arr2 = [4,5,6];

//apply 메소드의 2번째 인자는 배열. 이것은 개별 인자로 push 메소드에 전달

Array.prototype.push.apply(arr1, arr2);
console.log(arr1);

//ES6
const arr1 = [1,2,3];
const arr2 = [4,5,6];
arr1.push(...arr2);
console.log(arr1); [1,2,3,4,5,6];
```




