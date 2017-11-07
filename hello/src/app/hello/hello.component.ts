import { Component} from '@angular/core';

@Component({
  selector:'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent{
  // constrctor 
  // 인스턴스 생성
  // 타입스크립트에서는 클래스랑 다르게 프로퍼티를 먼저 선언하고 ...
  
  name: string;
  // component class에 함수는 setName
  setName(name: string) {
    // HelloComponent.name = input.value;
    this.name = name;
  }
}

/*
this._name = name; 
1. 값 복사해올때 쓴다.
2. 블록레벨
*/
