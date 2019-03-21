/// <reference path="scripts/typings/jquery/jquery.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var Ring = /** @class */ (function () {
    function Ring() {
    }
    Ring.prototype.hit = function (first, second) {
        var Damage;
        Damage = first.attack - (second.armor * 0.5);
        if (second.health < Damage) {
            second.health = second.health - Damage;
        }
        else {
            second.IsAlive = false;
        }
    };
    Ring.prototype.fight = function (first, second) {
        while (first.IsAlive && second.IsAlive) {
            if (second.IsAlive) {
                this.hit(first, second);
            }
            if (first.IsAlive) {
                this.hit(second, first);
            }
        }
        var winner;
        if (first.IsAlive) {
            winner = first;
        }
        else {
            winner = second;
        }
        first.printUnit();
        second.printUnit();
        return winner;
    };
    return Ring;
}());
var Unit = /** @class */ (function () {
    function Unit() {
        this.IsAlive = true, this.IsUpgrade = true;
    }
    Unit.prototype.setStartAttributes = function () {
        this.health = Math.floor(Math.random() * (this.healthMax - this.healthMin)) + this.healthMin;
        this.armor = Math.floor(Math.random() * (this.armorMax - this.armorMin)) + this.armorMin;
        this.attack = Math.floor(Math.random() * (this.attackMax - this.attackMin)) + this.attackMin;
    };
    Unit.prototype.printUnit = function () {
        console.log();
        console.log("name =" + this.name);
        console.log("health =" + this.health);
        console.log("attack =" + this.attack);
        console.log("armor =" + this.armor);
        console.log();
    };
    return Unit;
}());
var Swordman = /** @class */ (function (_super) {
    __extends(Swordman, _super);
    function Swordman() {
        var _this = _super.call(this) || this;
        _this.name = "Swordsman";
        _this.healthMin = 200;
        _this.healthMax = 250;
        _this.armorMin = 100;
        _this.armorMax = 150;
        _this.attackMin = 20;
        _this.attackMax = 30;
        _this.armorAdd = 3;
        _this.attackAdd = 2;
        _this.setStartAttributes();
        return _this;
    }
    Swordman.prototype.move = function (distance) {
        console.log("Slithering");
    };
    return Swordman;
}(Unit));
var Archer = /** @class */ (function (_super) {
    __extends(Archer, _super);
    function Archer() {
        var _this = _super.call(this) || this;
        _this.name = "Archer";
        _this.healthMin = 300;
        _this.healthMax = 400;
        _this.armorMin = 20;
        _this.armorMax = 50;
        _this.attackMin = 100;
        _this.attackMax = 150;
        _this.armorAdd = 2;
        _this.attackAdd = 4;
        _this.setStartAttributes();
        return _this;
    }
    Archer.prototype.move = function (distance) {
        console.log("Swim");
    };
    return Archer;
}(Unit));
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    function Wizard() {
        var _this = _super.call(this) || this;
        _this.name = "Wizard";
        _this.healthMin = 1000;
        _this.healthMax = 1500;
        _this.armorMin = 10;
        _this.armorMax = 40;
        _this.attackMin = 50;
        _this.attackMax = 120;
        _this.armorAdd = 2;
        _this.attackAdd = 5;
        _this.setStartAttributes();
        return _this;
    }
    Wizard.prototype.move = function (distance) {
        console.log("Swim");
    };
    return Wizard;
}(Unit));
var snake = new Swordman();
snake.printUnit();
var tvarjuka = new Archer();
tvarjuka.printUnit();
tvarjuka = new Wizard();
tvarjuka.printUnit();
var ring = new Ring();
var winner = ring.fight(snake, tvarjuka);
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