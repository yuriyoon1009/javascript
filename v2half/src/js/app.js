/*eslint-disable*/
import axios from 'axios';

(function () {
  const inputTodo = document.getElementById('input-todo');
  const todoList = document.getElementById('todo-list');
  let todos;
  let status = 'all'; // default
  let colour = 'none';

  const filterByStatus = function () {
    return todos.filter(({ completed }) => {
      switch (status) {
        case 'active':
          return !completed;
        case 'completed':
          return completed;
        default:
          return true;
      }
    });
  };

  const render = function () {
    let html = '';

    // ES6부터 let,const keyword를 사용해 block-level scope가 가능하다.
    // block-level scope : code block({}) 내에서 유효한 scope를 의미한다.  
    // 1. const 상수 이름에 _ 붙이는 이유 : (1) 값을 복사할때 (2) block-level scope
    // _todos는 render 함수 안에서만 유효함. 
    // 2. _todos = [{...}]
    const _todos = filterByStatus();
    _todos.forEach(({ id, content, completed }) => {
      const checked = completed ? 'checked' : '';
      // cross-over
      html += `<li class="list-group-item">
        <div class="hover-anchor">
            <a class="hover-action text-muted">
                <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${id}">
                </span>
            </a>
            <label class="i-checks" for="${id}">
            <input type="checkbox" id="${id}" ${checked}><i></i>
            <span class="">${content}</span>
            </label>
        </div>
        </li>`;
    });

    todoList.innerHTML = html;
  };

  const getTodos = function () {
    // payload : 전송되는 데이터를 뜻하다.
    axios.get('/todos')
        .then(res => {
            todos = res.data;
            render();
            console.log('[GET]\n', todos)
        })
        .catch(err => console.log(err.response));
  };

  window.addEventListener('load', () => {
    getTodos();
  });
  
  document.querySelector('.nav').addEventListener('click', function (e) {
    if (!e.target || e.target.nodeName !== 'A') return;
    // 1 spread 연산자로 LI
    // this == e.currentTarget
    // this.childNodes는 유사배열객체이다. 진짜 배열로 변환하려면 es6 spread 연산자 사용
    [...this.childNodes].forEach(ulChild => {
      if(ulChild.nodeName === 'LI') {
        ulChild.classList.remove('active');
      }
    });
    e.target.parentNode.classList.add('active'); 
    // 2
    status = e.target.parentNode.id;
    render();
  });

  const toggleComplete = function (checkBoxId) {
    
    let {completed} = todos.find(({id})=>{return id == checkBoxId}); 
   
    axios.patch(`/todos/${checkBoxId}`, {completed:!completed})
    .then(res => {
        getTodos();
    })
    .catch(err => console.log(err.response));
  }  
   

  //change true or false
  todoList.addEventListener('change', function(e){
      //if(!e.target || e.target.nodeName !== 'INPUT') return;
      toggleComplete(e.target.id);
  });

  //https://stackoverflow.com/questions/33262256/javascript-add-click-event-after-another-click-event
  const selectedLabel = function (num, colourLabel){
    //return colourLabel;
    // num = 3
    return colourLabel;
  }

  const setLabelColor = function (inputId) {
    let {label} = todos.find(({id}) => id == inputId);
    
    axios.patch(`todos/${inputId}`, {label: selectedLabel(inputId) })
    .then(res => {
        getTodos();
    })
    .catch(err => console.log(err.response));
  }

  
  todoList.addEventListener('click', function(e){
    const target = e.target;
    if(!target || target.nodeName !=='INPUT') return;

    setLabelColor(target.id);
  });

  document.querySelector('.list-nav').addEventListener('click', function(e){
      colour = e.target.id;
      selectedLabel(colour);
  })

  todoList.addEventListener('click', function(e) {
    var target = e.target;
    //console.log(e.target.id)
    //target.nodeName == 'SPAN'
    //target = 'li'  !'li' true

    if (!target || target.nodeName !== 'SPAN' || target.parentNode.nodeName === 'LABEL') return;

    //console.log(target.dataset.id)
    //console.log(target.getAttribute('data-id'));
    //data-id
    //e.target.getAttribute('data-id') 1,2,3
    //console.log(target.dataset.id)
    removeTodo(target.dataset.id);
});


  // 두번 쓰니까 const로??
  /*document.querySelector('.list-nav').addEventListener('click', function (e) {  
    // console.log(e.target.id);
    colour = e.target.id;

  });*/

  //give up Label 
  /*todoList.addEventListener('click', function(e){
    if (!e.target || e.target.nodeName == 'LABEL') return;
    
    const selectedId = e.target.id;
    let {label} = todos.find(({id}) => { return id == selectedId; } );
    
    label = 'pink';
    //axios
    //Object.assign({}, editLabel)
    // id 찾아야 됨. 
    /*axios.patch(`/todos/${id}`, { label: 'pink' })
    .then(() => {
      // console.log('[TOGGLE-COMP] ', id);
      getTodos();
    })
    .catch(err => console.log(err.response));*/
   
 
  //todoList.addEventListener('click', function (e) {  })
  

  /*document.querySelector('.list-group-item').addEventListener('click', function (e) {  
   // console.log(e.currentTar)
  })*/
  // make label
  
    // then 두개의 콜백함수를 인자로 전달 받는다. 첫번째 함수는 성공시 호출되는 함수이고 
    // 두번째 함수는 rected
    // asyncFunc(true)
    // .then{result => }  result에는 response 객체를 가져온다. res.data
    // payload : 전송되는 데이터를 뜻한다.
    // 데이터 베이스를 row 처음부터 끝까지 바뀌는게 put이다.
    /*
    페이로드란 : 전송되는 데이터
       //patch
       axios.patch(`/todos/${id}`,payload)
        .then(res => console.log(res))
        .catch(res => console.log(err));
    
       //patch all
       axios.patch(`/todos`, payload)
        .then(res => console.log(res))
        .catch(res => console.log(err));
    
    
        // GET ALL
        axios.get('/todos')
        .then(res => console.log(res))
        .catch(err => console.log(err));
        // POST
        axios.post('/todos', payload)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        // PATCH
        axios.patch(`/todos/${id}`, payload)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        // PATCH ALL
        axios.patch('/todos', payload)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        //DELETE
        axios.delete(`/todos/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    */


    
    var lastTodoId = function() {
        return todos ? Math.max.apply(null, todos.map(function(todo) {
            return todo.id;
        })) + 1 : 1;
    };
    
    console.log(lastTodoId())
    
    
    
    
    
    //es6 함수 표현식
    const addTodo = (...args) => {
        const content = inputTodo.value;
        inputTodo.value = '';
    
        let todo;
    
        if (!todos || todos.length == 0) {
            // content : content  es6
            todo = { id: 1, content, completed: false, label: 'red' };
        } else {
            todo = { id: lastTodoId(), content, completed: false, label: 'blue' };
            // todos = [{ id: lastTodoId(), content, completed: false }, ...todos];
            // console.log(todos)
            //return todo;
        }
        console.log(todos)
        axios.post('/todos', todo)
            .then(res => {
                console.log('[ADD]\n', res.data);
                getTodos();
            })
            .catch(err => console.log(err.response))
            // render();
            // console.log('[ADD]\n', todos);
    };
    
    // completed 
    const removeTodo = (id) => {
        todos = todos.filter(function(todo) {
            return todo.id != id;
        });
    
    
    
    
        axios.delete(`/todos/${id}`)
            .then(res => {
                console.log(res);
                render();
            })
            .catch(err => console.log(err));
    
        console.log('[REMOVE]\n', todos);
    };
    
    const toggleTodoComplete = (id) => {
        let todo;
    
        /* todos = todos.map((todo, index) => {
             return todo.id == id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
         });*/
    
        /*todo = todos.find((todo) => {
            return {completed: !todo.completed};
        });*/
        //todo ={id:2.....}
    
        //render();
        let todoSelected;
        todoSelected = todos.find((todo) => {
            return todo.id === parseInt(id);
        })
    
        //Object.assign({}, todo, {completed:false});
    
        // ${!(todoSelected.completed)}
        let todoCompleted = { completed: !todoSelected.completed };
    
        axios.patch(`/todos/${id}`, todoCompleted)
            .then(res => {
                //console.log('[EDIT]\n',);
                getTodos();
            })
            .catch(err => console.log(err.response))
    };
    
    
    /*
        todos에서 id가 3인 요소의 completed프로퍼티 값을 반전하는 함수를 작성하라
    */
    
    /*var toggleComplete = function(e) {
        todos = todos.forEach(function(todo) {
            return todo.id == 3;
        });
    }
    
    toggleComplete();*/
    
    // load 이벤트는 모든 리소스(image, script, css 등)의 로드가 완료하면 발생한다.
    /*window.addEventListener('load', function() {
        getTodos();
    });*/
    
    inputTodo.addEventListener('keyup', function(e) {
        if (e.keyCode !== 13 || inputTodo.value === '') return;
        addTodo();
    });
    
    /*todoList.addEventListener('change', function(e) {
        //console.log(e.target.id);
        //<input type="checkbox" id="todo.id"/>
        toggleTodoComplete(e.target.id);
        //console.log('test');
    });*/
    
    todoList.addEventListener('click', function(e) {
        var target = e.target;
        //console.log(e.target.id)
        //target.nodeName == 'SPAN'
        //target = 'li'  !'li' true
    
        if (!target || target.nodeName !== 'SPAN' || target.parentNode.nodeName === 'LABEL') return;
    
        //console.log(target.dataset.id)
        //console.log(target.getAttribute('data-id'));
        //data-id
        //e.target.getAttribute('data-id') 1,2,3
        //console.log(target.dataset.id)
        removeTodo(target.dataset.id);
    });
    
    
    
    //todoList.addEventListener('click', function(e) {
    // if (!e.target || e.target.parentNode.nodeName !== 'LABEL' || e.target.nodeName === 'INPUT') return;
    
    //<span></span>
    
    //change tag
    
    //console.log(input)
    /*var div = document.createElement('div')
    var inputinput = document.createElement('input')
    inputinput.setAttribute('type', 'text');
    div.appendChild(inputinput);
    var p = document.createElement('p');
    
    //inputinput.replaceWith(p);
    console.log(div)*/
    
    //////
    /*var ii = e.target.parentNode.replaceChild(inputinput, e.target);
    e.target = ii;
    
    console.log(ii);
    console.log(e.target);*/
    
    
    /*var myAnchor = document.getElementById("myAnchor");
    var mySpan = document.createElement("span");
    
    //mySpan.innerHTML = "replaced anchor!";
    myAnchor.parentNode.replaceChild(mySpan, myAnchor);*/
    
    // p 삭제하고 
    
    /*
                  var parent = document.createElement("div");
        var child = document.createElement("p");
        parent.appendChild(child);
        var span = document.createElement("span");
    
        child.replaceWith(span);
    
        console.log(parent.outerHTML);
        // "<div><span></span></div>"
      
        */
    
    /*var input = document.createElement('input');
    input.setAttribute('type', 'text');
    var a = e.target;
    a.replaceWith(input);
    
    console.log(a)*/
    
    //배열 디스트처러링
    
    //})
    
    //object.keys
    
    /*
      const addTodo = function(){
    
        axios.post('/todos')
    
      }
        
    */
    
    
    
    
    //function level scope가 아닌 block level scope 중복 선언 안 됨
    /*
    let foo = 123;
    {
    let foo = 456;
    let bar = 456
    }
    
    선언문 이전에 참조 안 됨. 
    
    함수만 코드블록인데 es6는 for도 코드블록으로 클로저가 된다
    let 은 함수 레벨이 아닌 블록 레벨 스코프이다.
    
    var foo; foo = 1; const는 선언문과 할당을 나누면 안 됨. 상수여서
    
    const 는 값이 변하지 않을때 사용함. 전역 변수. (가독성, 유지보수 good)
    
    var foo = {};
    var bar = foo;
    
    foo.name = 'lee';
    
    //객체를 할당하고 나면 참조를 바꾸지 않는다.
    
    foo = {} 참조를 바꿈. 
    bar = {}; 
    //한번 바뀐 객체는 참조를 쉽게 바뀔일은 없다. 
    
    객체 리터럴은 const
    배열은 const 안 됨, let
    
    함수 표현식 const
    
    샐행 컨텍스트, 클로저, passbyreference,  pass by value
    
    클로저를 사용하는 이유는 전역변수...
    
    
    
    */
}(axios));
