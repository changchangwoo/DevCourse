### 타입 스크립트

- 자바스크립트의 지저분한 코드
- 코드의 스케일이 커지면서 코드 관리가 되지 않음

⇒ 타입 스크립트의 등장

- 버그를 줄이고, 유지보수가 쉽고, 높은 퀄리티의 코드 생산 가능

타입 스크립트 = 자바스크립트 + 타입체크

- 타입스크립트 환경에 자바스크립트 코딩시 동작, 역은 안된다

```jsx
// 자바스크립트
function plus(a, b) {
return a + b;
}

// 타입스크립트
function plus(a : number, b : number) {
return a + b;
}

```

### 환경설정

- npm -i -g typescript을 통해 시스템에 타입스크립트 설치
- .ts 파일을 통해 타입스크립트 생성 가능
- tsc 명령어를 통해 ts파일을 js파일로 컴파일
- ts —init 명령어를 통해 타입스크립트 환경파일 tsconfig.json 설치

### 데이터 타입과 추론

- 타입 추론
    - 타입스크립트는 타입 추론 기능을 통해 변수의 타입을 자동으로 판단한다
    - 타입스크립트는 컴파일러가 초기에 할당된 값을 바탕으로 변수의 타입을 추론한다
- age 변수의 타입을 자동으로 number로 추론한다
- 코드를 간결하게 작성할 수 도와주지만 명시적으로 지정하는것이 더욱 명확하다

```jsx
let student = {
    name : 'john',
    course : 'typescript',
    score : 100,
    grade : function(){
        console.log('A');
    }
}

student.name = 'lee';
student.score = 'hello'; // number 타입으로 할당했기 때문에 문자를 넣으면 오류가 생김
```

- 데이터 타입의 종류
    - 타입스크립트에서는 다양한 데이터 타입 지원
    - 크게 기본 데이터, 객체, 특수 타입으로 나눌 수 있음
    - 기본 데이터 타입
        
        
        | number | 숫자 타입, 정수와 실수 포함 |
        | --- | --- |
        | string | 문자열 타입 |
        | boolean | 참, 거짓을 나타내는 타입 |
        | null | 값이 없음을 나타내는 타입 |
        | undefined | 값이 할당되지 않는 변수의 기본 값인 타입 |
    - 객체 타입
        
        
        | obejct | 객체를 나타내는 타입 |
        | --- | --- |
        | array | 동일한 타입의 요소를 가진 배열을 나타내는 타입 |
        | tuple | 각 요소가 다른 타입을 가질 수 있는 배열을 나타내는 타입 |
    - 특수 타입
        
        
        | any | 어떠한 타입이든 할당될 수 있는 타입 |
        | --- | --- |
        | unknown | 타입을 미리 알 수 없는 경우 사용되는 타입 |

### 타입 명시

- 변수를 선언할 때, 변수 값의 타입을 명시함으로 변수의 데이터 타입을 지정

```jsx
let studId : number = '1111'; // 명시한 타입과 선언한 값의 타입이 일치하지 않음 => 컴파일 에러
let stdName = 'lee';
let age = 20;
let gender = 'male';
let course = 'Typescript';
let completed = false;
```

```jsx
function Plus(a : number, b : number) : number { // 인자의 타입, 함수의 리턴 타입
    return a + b;
}
```

- 함수의 경우 인자에 명시, 인자가 끝난 후 리턴 타입을 명시할 수 있다
- 만약 아무런 타입도 반환하지 않는 경우 void 타입을 지정하면 된다

```jsx

function getInfo(a : number, b : number) : {
    stdId : number;
    stdName : string;
    age : number;
    gender : string;
    course : string;
    completed : boolean;
} {
    return null;
}
```

- 이런식으로 object 형식의 반환타입을 지정할 때 각각의 프로퍼티들의 타입까지 구체적으로 명시할 수 있다
    - 하지만 이렇게 작성하는 경우 가독성에 문제가 있다

### 인터페이스

```jsx
interface Student {
    stdId : number;
    stdName : string;
    age : number;
    gender : string;
    course : string;
    completed : boolean;
}

function getInfo(id : number) : Student {
    return { // 반드시 리턴 타입에 명시한 인터페이스와 프로퍼티가 일치해야한다
        stdId : id,
        stdName : 'lee',
        age : 20,
        gender : 'maile',
        course : 'typescript',
        completed : true
    }
}

```

- 다음과 같이 인터페이스를 통해 미리 명시해둔 타입의 값을 사용할 수 있다
- 인터페이스를 사용하면 자주사용하는 타입을 재사용할 수 있다 ⇒ 뛰어난 재사용성

```jsx
let std = {
    stdId : 123,
    stdName : 'lee',
    age : 20,
    gender : 'maile',
    course : 'typescript',
    completed : true

}

function setInfo(student : Student) : void { 
// 인자의 타입 역시 명시해둔 인터페이스로
// 설정이 가능하다
    console.log(student);
}

setInfo(std);
```

```jsx
setName : (name : string) => void; // 함수형 타입 선언
getName : () => string; // 화살표형 선언
```

- 인터페이스는 상속이 아닌(extends) 구현의 개념 (implements)
    
    ```jsx
    interface Student {
        stdId : number;
        stdName : string;
        age : number;
        gender : string;
        course : string;
        completed : boolean;
        setName : (name : string) => void;
        getName : () => string;
    }
    
    class MyStudent implements Student {
        stdId = 123
        stdName = 'lee'
        age = 20;
        gender = 'mail';
        course = 'typescript';
        completed = true;
        setName(name : string) : void {
            this.stdName = name;
            console.log('이름 설정 ' + this.stdName);
        }
        getName(): string {
            return this.stdName;
        }
    }
    
    ```
    
    - **인터페이스를 통해 구현한 클래스는 반드시 인터페이스에 해당하는 프로퍼티를 재정의** 해야한다
    
    > 인터페이스는 string이나 number 타입처럼 데이터 타입으로 사용 가능
    선택적 프로퍼티로 지정하려면 속성값 뒤에 ?를 붙여준다
    메소드도 인터페이스 내에서 선언 가능
    인터페이스를 클래스에 상속할 수 있음
    >