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
        second.currentHealth = second.currentHealth - Damage;
    };
    Ring.prototype.fight = function (first, second) {
        while (true) {
            if (second.currentHealth > 0) {
                this.hit(first, second);
            }
            if (second.currentHealth < 0) {
                break;
            }
            if (first.currentHealth > 0) {
                this.hit(second, first);
            }
            if (first.currentHealth < 0) {
                break;
            }
        }
        var winner;
        var looser;
        if (first.currentHealth > 0) {
            winner = first;
            looser = second;
        }
        else {
            winner = second;
            looser = first;
        }
        looser.buttlesNumber++;
        looser.killedBy = winner.name;
        winner.buttlesNumber++;
        //winner.printUnit();
        //looser.printUnit();
        winner.armor += (winner.armorAdd / 100) * winner.armor;
        winner.armor = (Math.round(winner.armor * 100)) / 100;
        winner.attack += (winner.attackAdd / 100) * winner.attack;
        winner.attack = (Math.round(winner.attack * 100)) / 100;
        winner.currentHealth = winner.roundStartHealth;
        //looser.currentHealth = 0;
        var mytuple = [winner, looser];
        return mytuple;
    };
    return Ring;
}());
var Unit = /** @class */ (function () {
    function Unit() {
        this.buttlesNumber = 0;
        this.killedBy = "nobody";
    }
    Unit.prototype.setStartAttributes = function () {
        this.roundStartHealth = Math.floor(Math.random() * (this.healthMax - this.healthMin)) + this.healthMin;
        this.armor = Math.floor(Math.random() * (this.armorMax - this.armorMin)) + this.armorMin;
        this.attack = Math.floor(Math.random() * (this.attackMax - this.attackMin)) + this.attackMin;
        this.currentHealth = this.roundStartHealth;
    };
    Unit.prototype.printUnit = function () {
        console.log("\n");
        console.log("name = " + this.name);
        console.log("currentHealth = " + this.currentHealth);
        console.log("attack = " + this.attack);
        console.log("armor = " + this.armor);
        console.log("buttlesNumber = " + this.buttlesNumber);
        console.log("killedBy = " + this.killedBy);
        console.log("\n");
    };
    return Unit;
}());
var Swordman = /** @class */ (function (_super) {
    __extends(Swordman, _super);
    function Swordman() {
        var _this = _super.call(this) || this;
        _this.name = "Swordsman";
        _this.healthMin = 200; //200;
        _this.healthMax = 280; //250;
        _this.armorMin = 100;
        _this.armorMax = 150;
        _this.attackMin = 70; //20
        _this.attackMax = 100; //30;
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
        _this.armorMin = 10; //10;
        _this.armorMax = 20; //40;
        _this.attackMin = 50; //50;
        _this.attackMax = 70; //120;
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
var ring = new Ring();
var key;
var array = new Array();
var temp;
var iteratonsCount = 300;
for (var i = 0; i < iteratonsCount; i++) {
    key = Math.floor(Math.random() * (4 - 1)) + 1;
    if (key == 1) {
        temp = new Swordman();
    }
    else if (key == 2) {
        temp = new Archer();
    }
    else {
        temp = new Wizard();
    }
    temp.name += "_" + (i + 1).toString();
    array.push(temp);
}
var rivalIndex1;
var rivalIndex2;
var arrayOfLoosers = new Array();
while (true) {
    rivalIndex1 = Math.floor(Math.random() * (array.length));
    var rival1 = array.splice(rivalIndex1, 1)[0];
    rivalIndex2 = Math.floor(Math.random() * (array.length));
    var rival2 = array.splice(rivalIndex2, 1)[0];
    var players = ring.fight(rival1, rival2);
    array.push(players[0]);
    arrayOfLoosers.push(players[1]);
    if (array.length == 1) {
        break;
    }
}
//console.log("------------------------------------------");
for (var i = 0; i < arrayOfLoosers.length; i++) {
    arrayOfLoosers[i].printUnit();
}
console.log("------------------------------------------");
array[0].printUnit();
//for (var i = 0; i < array.length; i++) {
//    array[i].printUnit();
//}
//# sourceMappingURL=app.js.map