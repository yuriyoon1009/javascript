//<div>javascript</div> 5번 추가하기

//가짜 document
var fragment = document.createDocumentFragment();

for (var i = 0; i < 5; i++) {
    var div = document.createElement('div');
    var text = document.createTextNode('javascript');
    div.appendChild(text);
    fragment.appendChild(div);
}

document.body.appendChild(fragment); //진짜 document는 한번만 조작. 성능 부담 덜 됨.