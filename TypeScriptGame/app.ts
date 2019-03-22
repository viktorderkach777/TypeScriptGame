/// <reference path="scripts/typings/jquery/jquery.d.ts" />

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};

interface IAction {
    fight(first: Unit, second: Unit);
    hit(first: Unit, second: Unit);
}

class Ring implements IAction {

    hit(first: Unit, second: Unit) {

        let Damage: number;
        Damage = first.attack - (second.armor * 0.5);      
        second.currentHealth = second.currentHealth - Damage;       
    }

    fight(first: Unit, second: Unit): [Unit, Unit] {
       
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
        winner.buttlesNumber++;

        //winner.printUnit();
        //looser.printUnit();

        winner.armor += (winner.armorAdd / 100) * winner.armor;
        winner.armor = (Math.round(winner.armor * 100)) / 100;
        winner.attack += (winner.attackAdd / 100) * winner.attack;
        winner.attack = (Math.round(winner.attack * 100)) / 100;
        winner.currentHealth = winner.roundStartHealth;
        //looser.currentHealth = 0;

        var mytuple:[Unit, Unit]  = [winner, looser];       

        return mytuple;
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
    
    constructor() { this.buttlesNumber = 0; this.killedBy = "nobody";}
    abstract move(distanceInMeters: number): void;

    setStartAttributes(): void{
        this.roundStartHealth = Math.floor(Math.random() * (this.healthMax - this.healthMin)) + this.healthMin;
        this.armor = Math.floor(Math.random() * (this.armorMax - this.armorMin)) + this.armorMin;
        this.attack = Math.floor(Math.random() * (this.attackMax - this.attackMin)) + this.attackMin;
        this.currentHealth = this.roundStartHealth;
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
        this.healthMin = 200;//200;
        this.healthMax = 280;//250;
        this.armorMin = 100;
        this.armorMax = 150;
        this.attackMin = 70;//20
        this.attackMax = 100;//30;
        this.armorAdd=3;
        this.attackAdd = 2;
        this.setStartAttributes();
    }
    

    move(distance) {
        console.log("Slithering");
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

    move(distance) {
        console.log("Swim");
    }
}



class Wizard extends Unit {
    constructor() {
        super();
        this.name = "Wizard";
        this.healthMin = 1000;
        this.healthMax = 1500;
        this.armorMin = 10;//10;
        this.armorMax = 20;//40;
        this.attackMin = 50;//50;
        this.attackMax = 70;//120;
        this.armorAdd = 2;
        this.attackAdd = 5;
        this.setStartAttributes();
    }

    move(distance) {
        console.log("Swim");
    }
}

let ring: IAction = new Ring();

let key: number;
let array: Unit[] = new Array();
let temp: Unit;
let iteratonsCount = 300;

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

    temp.name +=  "_" + (i + 1).toString();
    array.push(temp);
}


let rivalIndex1: number;
let rivalIndex2: number;
let arrayOfLoosers: Unit[] = new Array();


while (true) {

    rivalIndex1 = Math.floor(Math.random() * (array.length));
    let rival1 = array.splice(rivalIndex1, 1)[0];

    rivalIndex2 = Math.floor(Math.random() * (array.length));
    let rival2 = array.splice(rivalIndex2, 1)[0];

    let players = ring.fight(rival1, rival2);
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


