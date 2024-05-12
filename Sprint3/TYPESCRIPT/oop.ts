

class Employee {

    constructor(
        private _empName : string, 
        private _age : number, 
        private _empJob : string) {
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



