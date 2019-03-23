/// <reference path="scripts/typings/jquery/jquery.d.ts" />


interface IAction {

    array: Unit[];
    iteratonsCount: number;
    typesCount: number;
    arrayOfLoosers: Unit[];
    count: number;

    fight(first: Unit, second: Unit);
    hit(first: Unit, second: Unit);
    showHTMLResults();
    showLogResults();
    winnerRecovery(winner: Unit);
    winnerUpgrade(winner: Unit);
}

class Ring implements IAction {

    array: Unit[];
    iteratonsCount: number;
    typesCount: number;
    arrayOfLoosers: Unit[];
    count: number;

    constructor(typesCount: number, iterationCount: number) {
        this.array = new Array();
        this.iteratonsCount = iterationCount;
        this.typesCount = typesCount;
        this.arrayOfLoosers = new Array();
        this.count = 0;

        let key: number;       
        let temp: Unit;
       
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

        let rivalIndex1: number;
        let rivalIndex2: number;
       
        while (true) {

            rivalIndex1 = Math.floor(Math.random() * (this.array.length));
            let rival1 = this.array.splice(rivalIndex1, 1)[0];

            rivalIndex2 = Math.floor(Math.random() * (this.array.length));
            let rival2 = this.array.splice(rivalIndex2, 1)[0];

            let players = this.fight(rival1, rival2);
            this.array.push(players[0]);
            this.arrayOfLoosers.push(players[1]);

            if (this.array.length == 1) {
                break;
            }
        }

        this.arrayOfLoosers.sort(function (a, b) {
            return b.buttlesNumber - a.buttlesNumber;
        })
    }

    hit(first: Unit, second: Unit) {

        let Damage: number;
        Damage = first.attack - (second.armor * 0.5);
        second.currentHealth = second.currentHealth - Damage;
    }

    fight(first: Unit, second: Unit): [Unit, Unit] {

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

        let winner: Unit;
        let looser: Unit;

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

        var mytuple: [Unit, Unit] = [winner, looser];

        return mytuple;
    }

    winnerRecovery(winner: Unit) {
        winner.currentHealth = winner.roundStartHealth;
    }

    winnerUpgrade(winner: Unit) {
        winner.buttlesNumber++;

        winner.armor += (winner.armorAdd / 100) * winner.armor;
        winner.armor = (Math.round(winner.armor * 100)) / 100;
        winner.attack += (winner.attackAdd / 100) * winner.attack;
        winner.attack = (Math.round(winner.attack * 100)) / 100;       
    }

    showHTMLResults() {
        $("#content").append(`<tr><td>winner</td><td>${this.array[0].name}</td>
<td>${this.array[0].currentHealth}</td>
<td>${this.array[0].attackStart}</td>
<td>${this.array[0].attack}</td>
<td>${this.array[0].armorStart}</td>
<td>${this.array[0].armor}</td>
<td>${this.array[0].buttlesNumber}</td>
<td>${this.array[0].killedBy}</td>`);

        for (var i = 0; i < this.arrayOfLoosers.length; i++) {
            $("#content").append(`<tr><td>${++this.count}</td><td>${this.arrayOfLoosers[i].name}</td>
<td>${ this.arrayOfLoosers[i].currentHealth}</td>
<td>${ this.arrayOfLoosers[i].attackStart}</td>
<td>${ this.arrayOfLoosers[i].attack}</td>
<td>${ this.arrayOfLoosers[i].armorStart}</td>
<td>${ this.arrayOfLoosers[i].armor}</td>
<td>${ this.arrayOfLoosers[i].buttlesNumber}</td>
<td>${ this.arrayOfLoosers[i].killedBy}</td>`);
        }
    }

    showLogResults() {
        console.log("-----------LOOSERS--------------");
        for (var i = 0; i < this.arrayOfLoosers.length; i++) {
            this.arrayOfLoosers[i].printUnit();
        }

        console.log("-----------WINNER--------------");
        this.array[0].printUnit();
    }
}


abstract class Unit {
    name: string;
    attack: number;
    currentHealth: number;
    roundStartHealth: number;
    armor: number;
    healthMin: number;
    healthMax: number;
    armorMin: number;
    armorMax: number;
    attackMin: number;
    attackMax: number;
    armorAdd: number;
    attackAdd: number;
    buttlesNumber: number;
    killedBy: string;
    attackStart: number;
    armorStart: number;

    constructor() { this.buttlesNumber = 0; this.killedBy = "nobody"; }

    setStartAttributes(): void {
        this.roundStartHealth = Math.floor(Math.random() * (this.healthMax - this.healthMin)) + this.healthMin;
        this.armor = Math.floor(Math.random() * (this.armorMax - this.armorMin)) + this.armorMin;
        this.attack = Math.floor(Math.random() * (this.attackMax - this.attackMin)) + this.attackMin;
        this.currentHealth = this.roundStartHealth;
        this.attackStart = this.attack;
        this.armorStart = this.armor;
    }

    printUnit(): void {
        console.log("\n");
        console.log("name = " + this.name);
        console.log("currentHealth = " + this.currentHealth);
        console.log("attack = " + this.attack);
        console.log("armor = " + this.armor);
        console.log("buttlesNumber = " + this.buttlesNumber);
        console.log("killedBy = " + this.killedBy);
        console.log("\n");
    }
}

class Swordman extends Unit {

    constructor() {
        super();
        this.name = "Swordsman";
        this.healthMin = 300;//200;
        this.healthMax = 330;//250;
        this.armorMin = 100;
        this.armorMax = 150;
        this.attackMin = 90;//20
        this.attackMax = 100;//30;
        this.armorAdd = 3;
        this.attackAdd = 2;
        this.setStartAttributes();
    }
}

class Archer extends Unit {
    constructor() {
        super();
        this.name = "Archer";
        this.healthMin = 300;
        this.healthMax = 400;
        this.armorMin = 20;
        this.armorMax = 50;
        this.attackMin = 100;
        this.attackMax = 150;
        this.armorAdd = 2;
        this.attackAdd = 4;
        this.setStartAttributes();
    }
}


class Wizard extends Unit {
    constructor() {
        super();
        this.name = "Wizard";
        this.healthMin = 1000;
        this.healthMax = 1500;
        this.armorMin = 20;//10;
        this.armorMax = 40;//40;
        this.attackMin = 50;//50;
        this.attackMax = 80;//120;
        this.armorAdd = 2;
        this.attackAdd = 5;
        this.setStartAttributes();
    }
}

let ring: IAction = new Ring(3, 1000);

window.onload = () => {
    ring.showHTMLResults();
    ring.showLogResults();   
}

