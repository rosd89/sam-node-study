# step1 - express

express http 웹서버 만들기 예제

소스코드 실행
  - `$ npm install`
  - `$ npm start`
  
### 자주 사용 될 es6 문법

* 변수와 상수 선언

  ```javascript
  let a = 1;
  const b = 2;

  a += 2;
  b += 3; // Attempt to assign const variable
  ```

* Template Literals

  ```javascript
  const name = 'sam';
  const age = 29;
  
  const msg = `
  Template Strings Test
      
  저의 이름은 ${name}입니다.
  나이는 ${age} 입니다.
  `;
  
  console.log(msg);
  
  //
  //Template Strings Test
  //    
  //저의 이름은 sam입니다.
  //나이는 29 입니다.
  ```
  
* Arrow Function

  ```javascript
  const printName = (name) => {
      console.log(`제 이름은 ${name}입니다.`);
  }

  printName('sam');
  ```
  
  ```javascript
  const printName = name => console.log(`제 이름은 ${name}입니다.`);
  
  printName('sam');
  ```
  
* Destructuring

  ```javascript
  const [first, ,third] = ['apple', 'banana', 'cherry'];
  console.log(first); // apple
  console.log(third); // cherry
  
  const {name, age} = {name: 'sam', age: 29}
  console.log(name); // sam
  console.log(age); // age
  
  const f = ['apple', 'banana', 'cherry'];
  //Array.prototype.entries() 
  //메서드는 배열의 각 인덱스에 대한 key/value 쌍을 가지는 새로운 Array Iterator 객체를 반환
  for(const [i, val] of f.entries()){
      console.log(`${i}, ${val}`);
  }
  // 0, apple
  // 1, banana
  // 2, cherry
  
  const names = [
      {name: 'sam', age: 29},
      {name: 'seungjin', age: 27}
  ];
  for(const {name = 'noname', age} of names){
      console.log(`이름 : ${name}, 나이 : ${age}`); 
  }
  // 이름 : sam, 나이 : 29
  // 이름 : seungjin, 나이 : 27
  ```
  
* Spread Operator

  ```javascript
  const print = (...arr) => console.log(arr);
  const a = ['apple', 'banana'];
  const b = ['cherry'];

  print([...a, ...b]);
  ```

* Property Shorthand

  ```javascript
  const apple = '사과';
  const banana = '바나나';
  const cherry = '체리';

  const fruits = {apple, banana, cherry};
  console.log(fruits);
  ```

* Method Properties

  ```javascript
  const human = {
    eat(name, food) {
      console.log(`${name}이(가) ${food}을(를) 먹었다.`);
    }
  };

  human.eat('sam', 'apple');
  ```