interface Student {
    stdId : number;
    stdName : string;
    age : number;
    gender? : 'male' | 'female'
    course : string;
    completed : boolean;
    setName : (name : string) => void;
    getName : () => string;
}

class MyStudent implements Student {
    stdId = 123
    stdName = 'lee'
    age = 20;
    gender : 'male' | 'female' = 'male';
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

// 열거형 : 사용자 정의 타입
enum GenderType{
    Male = 'male',
    Female = 'female'
}

type strOrNum = number | string;

let numStr : strOrNum = 100;
function convertToString(val : strOrNum) : string  {
    return String(val)

}
function convertToNumber(val : strOrNum) : number {
    return Number(val)
}

let item : number;
function covertToString(val : strOrNum) : string {
    if(typeof val === 'string') {
        item = 0;
    } else {
        item = val;
    }
    return String(item)
}

let numbers : number[] = [1,2,3,4,5];
let fruits : string[] = ['apple', 'banana', 'orange'];

let mixedArray : (number | string)[] = [1, 'two', 3 ,'four'];

// 튜플 : 타입의 순서가 정해져있다
let greeting : [number, string, boolean] = [1, 'hello', true]