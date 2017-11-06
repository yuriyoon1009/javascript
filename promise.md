## Promise
- 자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백을 사용한다.
- 콜백이란 이벤트가 발생하였을 경우에 함수를 통해 전달
```
//jquery
$('.btn').on('click', function(){
  // 콜백함수
})

//조금 더 복잡한 콜백함수
//함수를 정의해 해당 함수의 이름을 파라메터로 넘기는 방식
var alldata = [];
function log(data){
  for(var key in data){
     console.log(key + ":" + data[item])
  }
}

function input(options, callback){
 alldata.push(options);
 //log함수는 콜백하수가 되어 input함수 내부에서 동작한다.
 callback(options);
}

input({name:'hi', program:'javascript}, log);
```
- 여기서 비동기 프로그래밍이란?
명령의 수행이 끝나지 않아도 다음 명령을 실행한다.
특정 명령이 실행된 후 그 명령이 끝나기 전에 다음 명령이 실행될 수 있다.
js는 비동기 처리를 위한 하나의 패턴으로 콜백을 사용한다.

```
for (var i = 0; i < 10; i++) {
	setTimeout(function() {
		console.log(i);
	}, 10);
}
console.log('done');
done
10 10 10 10..... 10
```
- 비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야 하는 경우, 
함수의 호출이 nesting이 되어 복잡도가 높아지는 현상을 Callback Hell이라 한다.


## promise state
promise 는 비동기 처리가 성공하였는지 실패하였는지 등의 상태 정보를 알 수 있다.
- pending : 비동기 처리가 아직 수행되지 않은 상태 (resolve, reject 함수가 아직) 실행되지 않은 상태
- fulfilled : 비동기 처리가 성공 (resolve)
- rejected : 비동기 처리가 실패 (reject)
- settled : 비동기 처리 성공 또는 실패 (resolve or reject)

```
function asyncFunc(param) {
  // Promise 객체 선언과 반환
  return new Promise((resolve, reject) => {
    // 비동기 함수
    param ? resolve('resolved!') : reject('rejected!');
  });
}
undefined
asyncFunc('a')
Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: "resolved!"}
asyncFunc()
Promise {[[PromiseStatus]]: "rejected", [[PromiseValue]]: "rejected!"}
```

Reference

http://yubylab.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%BD%9C%EB%B0%B1%ED%95%A8%EC%88%98-%EC%9D%B4%EC%BD%9C%ED%95%98%EA%B8%B0
