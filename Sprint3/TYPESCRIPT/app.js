var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.stdId = 123;
        this.stdName = 'lee';
        this.age = 20;
        this.gender = GenderType.Male;
        this.course = 'typescript';
        this.completed = true;
    }
    MyStudent.prototype.setName = function (name) {
        this.stdName = name;
        console.log('이름 설정 ' + this.stdName);
    };
    MyStudent.prototype.getName = function () {
        return this.stdName;
    };
    return MyStudent;
}());
// 열거형 : 사용자 정의 타입
var GenderType;
(function (GenderType) {
    GenderType[GenderType["Male"] = 0] = "Male";
    GenderType[GenderType["Female"] = 1] = "Female";
})(GenderType || (GenderType = {}));
