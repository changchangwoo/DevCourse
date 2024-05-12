### 리터럴 타입

- 리터럴 타입은 특정 값을 나타내는 타입으로 해당 값이 정확하게 일치해야 한다.
    
    ```jsx
    //
    let speed : 50 | 100 | 200;
    speed = 100; // 유효
    speed = 150 // 에러, number 타입이지만 리터럴은 정확한 값을 받아야함
    
    //
    
    // 객체 리터럴 타입
    let person: {name: 'John', age:30};
    person = {name:'John', age: 30}; // 유효
    person = {name:'Alice', age:25}; // 에러
    
    // 타입 별칭
    type CardinalDirection = 'North' | 'East' | 'South' | 'West';
    let direction : CardinalDirection;
    direction = 'North'; // 유효
    direction = 'NorthEast' // 에러
    ```
    
- 코드의 가독성 향상
- 잘못된 값의 입력 방지

### 유니온, 타입별칭, 타입가드

- any 타입  : 어떤 타입이여도 명시가 가능
    - 최대한 지양해야한다. 타입스크립트는 제공하는 정보가 명확할 수록 개발자의 의도가 쉽게 전달되기 때문
- 유니온 타입
    - 제한된 타입을 동시에 지정하고 싶을 때가 있다
    - let anyVal : number | string; ⇒ number나 string 타입 중 아무 값이 올 수 있다
    - “|”기호를 사이에 두고 동시에 타입을 지정
    
    ```jsx
    let numStr : number | string = 100;
    function convertToString(val : number | string) : string  {
        return String(val)
    
    }
    function convertToNumber(val : number | string) : number {
        return Number(val)
    }
    ```
    
- 타입 별칭(타입 얼리어스)
    - 자주 사용하는 타입 유니온을 하나의 type으로 묶어 사용할 수 있다
    
    ```jsx
    type strOrNum = number | string;
    
    let numStr : strOrNum = 100;
    function convertToString(val : strOrNum) : string  {
        return String(val)
    
    }
    function convertToNumber(val : strOrNum) : number {
        return Number(val)
    }
    ```
    
- 타입 가드(type of를 통해 타입을 확인하는 절차)
    
    ```jsx
    let item : number;
    function covertToString(val : strOrNum) : string {
        if(typeof val === 'string') {
            item = 0;
        } else {
            item = val;
        }
        return String(item)
    }
    ```
    

### Array와 Tuple

- Array
    - 길이가 가변적이며 동일한 타입의 요소로 구성
    
    ```jsx
    // 기본 배열 타입
    let numbers : number[] = [1,2,3,4,5];
    let fruits : string[] = ['apple', 'banana', 'orange'];
    
    // 유니온 타입 배열
    let mixedArray : (number | string)[] = [1, 'two', 3 ,'four'];
    ```
    
- 튜플
    - 길이가 고정적이며 각 요소의 타입이 정해져있다
    
    ```jsx
    // 튜플 : 타입의 순서가 정해져있다
    let greeting : [number, string, boolean] = [1, 'hello', true]
    ```
    

### 클래스와 객체

- 타입 스크립트 기반의 oop
    - 구조체, 공용체, 열거형, 인터페이스, 클래스 등
    
    ```jsx
    
    class Employee {
        // 일반적인 직원 정보
        empName!: string;
        age! : number;
        empJob! : string;
        printEmp() : void {
            console.log(`${this.empName}의 나이는 ${this.age} 이고, 직업은 ${this.empJob}입니다. `)
        }
    }
    
    let employee1 = new Employee();
    employee1.empName = 'kim'
    employee1.age = 20;
    employee1.empJob ="개발자"
    
    employee1.printEmp();
    ```
    

### 생성자

```jsx
class Employee {
    private empName: string;
    age : number;
    empJob : string;
    // 일반적인 직원 정보
    
    constructor(empName : string, age : number, empJob : string) {
        this.empName = empName
        this.age = age;
        this.empJob = empJob
    }

    printEmp() : void {
        console.log(`${this.empName}의 나이는 ${this.age} 이고, 직업은 ${this.empJob}입니다. `)
    }
}

let employee1 = new Employee("kim", 30, "소프트웨어 개발자");
```

- 기본값을 설정하는 경우 생성자 constructor 사용이 가능

### 접근 지정자

- 외부에서 프로퍼티에 접근해서 바꾸면 문제가 생길 가능성이 있음
    - 접근 지정자 private를 통해서 외부에서 접근하지 못하게 할 수 있다
    
    ```jsx
    class Employee {
        private empName: string; // 접근 지정자 private
        private age : number;
        private empJob : string;
        // 일반적인 직원 정보
    
        constructor(empName : string, age : number, empJob : string) {
            this.empName = empName
            this.age = age;
            this.empJob = empJob
        }
    
        printEmp() : void {
            console.log(`${this.empName}의 나이는 ${this.age} 이고, 직업은 ${this.empJob}입니다. `)
        }
    }
    ```
    
- 그러면 외부에서 접근을 아예 못하나? ⇒ getter, setter을 통해 접근이 가능하다

### getter와 setter

- 생성자 안에 접근 지정자를 포함해서 값을 인자로 넣으면, 생성자의 인자임과 동시에 프로퍼티 값을 설정할 수 있다 (= 간편하다!)
- get과 set 메소드를 통해서 getter setter 지정이 가능하다
- 해당 메소드들은 반환 지정자를 받지 않는다
    
    ```jsx
    class Employee {
    
        constructor(
            private _empName : string, 
            private _age : number, 
            private _empJob : string) { // 생성자 안에 접근 지정자를 넣음으로
            // 프로퍼티를 선언함과 동시에 생성자의 인자로서 활용
        }
    
        get empName() : string{ //getter
            return this._empName;
        }
        set empName(val : string){ // setter
            this._empName = val;
        }
        // getter와 setter를 통해 접근이 가능하다
    
        printEmp() : void {
            console.log(`${this._empName}의 나이는 ${this._age} 이고, 직업은 ${this._empJob}입니다. `)
        }
    }
    
    let employee1 = new Employee("kim", 30, "소프트웨어 개발자");
    
    employee1.printEmp();
    
    ```