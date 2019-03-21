/// <reference path="scripts/typings/jquery/jquery.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Greeter = /** @class */ (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
var Unit = /** @class */ (function () {
    //name: string;
    function Unit(theName) {
    }
    return Unit;
}());
var Swordman = /** @class */ (function (_super) {
    __extends(Swordman, _super);
    function Swordman(name) {
        return _super.call(this, name) || this;
    }
    Swordman.prototype.move = function (distance) {
        console.log("Slithering");
    };
    return Swordman;
}(Unit));
var Archer = /** @class */ (function (_super) {
    __extends(Archer, _super);
    function Archer(name) {
        return _super.call(this, name) || this;
    }
    Archer.prototype.move = function (distance) {
        console.log("Swim");
    };
    return Archer;
}(Unit));
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    function Wizard(name) {
        return _super.call(this, name) || this;
    }
    Wizard.prototype.move = function (distance) {
        console.log("Swim");
    };
    return Wizard;
}(Unit));
var snake = new Swordman('snake');
snake.move(5);
var tvarjuka = new Archer("python");
tvarjuka.move(40);
tvarjuka = new Wizard("seledka");
tvarjuka.move(20);
//function universalFunction(getFn: () => string[], algoFn: (a: string[]) => string, setFn: (b: string) => void): void {
//    setFn(algoFn(getFn()));
//};
//function Func1(list: string[]): string {
//    let resultString = (list[0] + list[1] + list[2]).toLocaleUpperCase();
//    return resultString;
//}
//function Func2(list: string[]): string {
//    let resString = "";
//    let maxNum = Math.max(list[0].length, list[1].length, list[2].length);
//    for (var i = 0; i < maxNum; i++) {
//        for (var j = 0; j < list.length; j++) {
//            if (list[j].length > i) {
//                resString += list[j][i];
//            }
//        }
//    }
//    return resString;
//}
//function Func3(list: string[]): string {
//    let resString = UniqueCharacters(list[0]) + UniqueCharacters(list[1]) + UniqueCharacters(list[2]);
//    resString = resString.split('').sort().join('');
//    return resString;
//}
//function UniqueCharacters(test: string): string {
//    let temp = "";
//    for (let i = 0; i < test.length; i++) {
//        if (temp.indexOf(test.charAt(i)) == - 1) {
//            temp = temp + test.charAt(i);
//        }
//    }
//    return temp;
//}
//function SetValues(resString: string): void {
//    (<HTMLInputElement>document.getElementById('result')).value = resString;
//}
//function GetValues(): string[] {
//    let fr = (<HTMLInputElement>document.getElementById('first')).value;
//    let sc = document.getElementById("second")["value"];
//    let th = document.getElementById("third")["value"];
//    let list: string[] = [fr, sc, th];
//    return list;
//};
//# sourceMappingURL=app.js.map