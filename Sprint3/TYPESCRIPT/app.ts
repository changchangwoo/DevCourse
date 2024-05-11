interface Student {
    stdId : number;
    stdName : string;
    age : number;
    gender? : GenderType
    course : string;
    completed : boolean;
    setName : (name : string) => void;
    getName : () => string;
}

class MyStudent implements Student {
    stdId = 123
    stdName = 'lee'
    age = 20;
    gender = GenderType.Male;
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
    Male,
    Female
}