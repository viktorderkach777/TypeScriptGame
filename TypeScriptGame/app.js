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
var Ring = /** @class */ (function () {
    function Ring(typesCount, iterationCount) {
        this.array = new Array();
        this.iteratonsCount = iterationCount;
        this.typesCount = typesCount;
        this.arrayOfLoosers = new Array();
        this.count = 0;
        var key;
        var temp;
        for (var i = 0; i < this.iteratonsCount; i++) {
            key = Math.floor(Math.random() * typesCount) + 1;
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
            this.array.push(temp);
        }
        var rivalIndex1;
        var rivalIndex2;
        while (true) {
            rivalIndex1 = Math.floor(Math.random() * (this.array.length));
            var rival1 = this.array.splice(rivalIndex1, 1)[0];
            rivalIndex2 = Math.floor(Math.random() * (this.array.length));
            var rival2 = this.array.splice(rivalIndex2, 1)[0];
            var players = this.fight(rival1, rival2);
            this.array.push(players[0]);
            this.arrayOfLoosers.push(players[1]);
            if (this.array.length == 1) {
                break;
            }
        }
        this.arrayOfLoosers.sort(function (a, b) {
            return b.buttlesNumber - a.buttlesNumber;
        });
    }
    Ring.prototype.hit = function (first, second) {
        var Damage;
        Damage = first.attack - (second.armor * 0.5);
        second.currentHealth = second.currentHealth - Damage;
    };
    Ring.prototype.fight = function (first, second) {
        while (second.currentHealth > 0 && first.currentHealth > 0) {
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
        looser.currentHealth = (Math.round(looser.currentHealth * 100)) / 100;
        this.winnerRecovery(winner);
        this.winnerUpgrade(winner);
        var mytuple = [winner, looser];
        return mytuple;
    };
    Ring.prototype.winnerRecovery = function (winner) {
        winner.currentHealth = winner.roundStartHealth;
    };
    Ring.prototype.winnerUpgrade = function (winner) {
        winner.buttlesNumber++;
        winner.armor += (winner.armorAdd / 100) * winner.armor;
        winner.armor = (Math.round(winner.armor * 100)) / 100;
        winner.attack += (winner.attackAdd / 100) * winner.attack;
        winner.attack = (Math.round(winner.attack * 100)) / 100;
    };
    Ring.prototype.showHTMLResults = function () {
        $("#content").append("<tr><td>winner</td><td>" + this.array[0].name + "</td>\n<td>" + this.array[0].currentHealth + "</td>\n<td>" + this.array[0].attackStart + "</td>\n<td>" + this.array[0].attack + "</td>\n<td>" + this.array[0].armorStart + "</td>\n<td>" + this.array[0].armor + "</td>\n<td>" + this.array[0].buttlesNumber + "</td>\n<td>" + this.array[0].killedBy + "</td>");
        for (var i = 0; i < this.arrayOfLoosers.length; i++) {
            $("#content").append("<tr><td>" + ++this.count + "</td><td>" + this.arrayOfLoosers[i].name + "</td>\n<td>" + this.arrayOfLoosers[i].currentHealth + "</td>\n<td>" + this.arrayOfLoosers[i].attackStart + "</td>\n<td>" + this.arrayOfLoosers[i].attack + "</td>\n<td>" + this.arrayOfLoosers[i].armorStart + "</td>\n<td>" + this.arrayOfLoosers[i].armor + "</td>\n<td>" + this.arrayOfLoosers[i].buttlesNumber + "</td>\n<td>" + this.arrayOfLoosers[i].killedBy + "</td>");
        }
    };
    Ring.prototype.showLogResults = function () {
        console.log("-----------LOOSERS--------------");
        for (var i = 0; i < this.arrayOfLoosers.length; i++) {
            this.arrayOfLoosers[i].printUnit();
        }
        console.log("-----------WINNER--------------");
        this.array[0].printUnit();
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
        this.attackStart = this.attack;
        this.armorStart = this.armor;
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
        _this.healthMin = 300; //200;
        _this.healthMax = 330; //250;
        _this.armorMin = 100;
        _this.armorMax = 150;
        _this.attackMin = 90; //20
        _this.attackMax = 100; //30;
        _this.armorAdd = 3;
        _this.attackAdd = 2;
        _this.setStartAttributes();
        return _this;
    }
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
    return Archer;
}(Unit));
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    function Wizard() {
        var _this = _super.call(this) || this;
        _this.name = "Wizard";
        _this.healthMin = 1000;
        _this.healthMax = 1500;
        _this.armorMin = 20; //10;
        _this.armorMax = 40; //40;
        _this.attackMin = 50; //50;
        _this.attackMax = 80; //120;
        _this.armorAdd = 2;
        _this.attackAdd = 5;
        _this.setStartAttributes();
        return _this;
    }
    return Wizard;
}(Unit));
var ring = new Ring(3, 1000);
window.onload = function () {
    ring.showHTMLResults();
    ring.showLogResults();
};
//# sourceMappingURL=app.js.map