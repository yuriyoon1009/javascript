// Angular Repository 만들기
## Angular
- Angular는 Directive와 서비스, 의존성 주입은 간소화 되었다.
- Typescript를 도입하여 정적 타입과 인터페이스, 제네릭 등 타입 체크 지원 가능하다.
- ECMAScript6에 새롭게 도입된 모듈, 클래스 지원한다.
- 개발환경 지원 도구인 Angular CLI를 제공한다.
- AngularJ와는 전혀 호환성이 없으며 새로운 프레임워크다.

### Typescript
- 모듈, 클래스, 인터페이스등의 OOP 지원은 크고 복잡한 프로젝트의 코드 기반을 쉽게 구성한다.

### Angular 
- export 를 하나라도 기입을 해야한다.
- {{title}} 템플릿 엔진
- ng new project name 애플리케이션
- ng serve 생성된 애플 실행하려면  (ex: localhost:4200)
- ng serve --port 4203 port 변경
- ng serve -o localhost 자동실행, reload가 됨
- component는 폴더를 만들어준다. component는 화면단위로 .. 화면전환단위
- styles: [], 인라인 템플릿 방식
- ng g c about -it -is -spec false  (inline 방식) spec 만들지 않음
- -it -is 인라인 방식으로. inline template 
- ng g c service -it -s -spec false -flat flat는 src 바로 아래
- spec 파일이란 // 컴포넌트 유닛 테스트를 위한 스펙 파일이지만 테스트를 하지 않기 때문에 spec false로 ! 
- carmel case로 하면 암묵적으로 케바케이스// 
- 케밥 표기법(kebab-case)
- -it -is option 은 인라인 방식
- css는 javascript 로 만들어진다. 
- 프로젝트의 개발 완료 이후 배포를 위해서는 ng build 명령어를 사용한다.
- root componenet
- main.ts 
- 각각의 모듈이 모여서 하나의 애플리케이션을 만든다 
- 모듈은 하나이상의 componenet 를 가지고 잇어야 한다.
- platformBrowserDynamic().bootstrapModule(AppModule)
- root module내에 ...
- angular는 spa를 위한 프레임워크
- @component 데코레이터
- component 를 뷰가 목적이어서 뷰를 가지고 잇어야 한다.
- directive html 의 중복을 막기 위해서 만든다.
- pipe
- 화면이 바뀐다 = component를 바꾼다.
- ex/ todo는 render 함수를 써서 dom control 
- css는 부품화가 어렵다. shadow dom
- html, template, shadow, imports
- header, footer 공통 사용, aside부분적으로 
- ng new hello -it is -skip-tests
- ng serve -o -p 4300
- 상태 공유하는게 데이터 바인딩
  - 컴포넌트 클래스가 html 에게 주는 경우 
  - html 상태 변화를 컴포넌트 클래스에게 줄 수 잇다. 이 두가지의 바인딩이 잇어야 한다.
```
@componenet({
  
})
//클래스는 component를 참조한다.
export class Appcomponent{

}
```
```
// class의 property, 맴버
export class AppComponent {
  title = 'hello world';
}
```
### Change Detection 변화 감지
- Es6 모듈과 angular 모듈가 다르다
- hello component
- 

```
import { Component} from @angular/core;
@Component({

})
export class HelloComponent{};
//https://angular.io/api/core/Component
```
