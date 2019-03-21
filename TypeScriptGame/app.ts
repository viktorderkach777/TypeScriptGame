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

        if (second.health < Damage) {
            second.health = second.health - Damage;
        }
        else {
            second.IsAlive = false;
        }
    }

    fight(first: Unit, second: Unit): Unit {
       
        while (first.IsAlive && second.IsAlive) {

            if (second.IsAlive) {
                this.hit(first, second);
            }
            
            if (first.IsAlive) {
                this.hit(second, first);
            }
        }

        let winner: Unit;

        if (first.IsAlive) {
            winner = first;
        }
        else {
            winner = second;
        }

        first.printUnit();
        second.printUnit();

        return winner;
    }

}


abstract class Unit {
    name: string;
    attack: number;
    health: number;
    armor: number;
    IsAlive: boolean;
    IsUpgrade: boolean;
    healthMin: number;
    healthMax: number;
    armorMin: number;
    armorMax: number;
    attackMin: number;
    attackMax: number;
    armorAdd: number;
    attackAdd: number;
    
    constructor() { this.IsAlive = true, this.IsUpgrade = true; }
    abstract move(distanceInMeters: number): void;

    setStartAttributes(): void{
        this.health = Math.floor(Math.random() * (this.healthMax - this.healthMin)) + this.healthMin;
        this.armor = Math.floor(Math.random() * (this.armorMax - this.armorMin)) + this.armorMin;
        this.attack = Math.floor(Math.random() * (this.attackMax - this.attackMin)) + this.attackMin;
    }

    printUnit(): void {
        console.log();
        console.log("name =" + this.name);
        console.log("health =" + this.health);
        console.log("attack =" + this.attack);
        console.log("armor =" + this.armor);
        console.log();
    }

    
}

class Swordman extends Unit {    
   
    constructor() {
        super();
        this.name = "Swordsman";
        this.healthMin = 200;
        this.healthMax = 250;
        this.armorMin = 100;
        this.armorMax = 150;
        this.attackMin = 20;
        this.attackMax = 30;
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
        this.armorMin = 10;
        this.armorMax = 40;
        this.attackMin = 50;
        this.attackMax = 120;
        this.armorAdd = 2;
        this.attackAdd = 5;
        this.setStartAttributes();
    }

    move(distance) {
        console.log("Swim");
    }
}



let snake: Unit = new Swordman();
snake.printUnit();

let tvarjuka: Unit = new Archer();
tvarjuka.printUnit();

tvarjuka = new Wizard();
tvarjuka.printUnit();


let ring: IAction = new Ring();

let winner: Unit = ring.fight(snake, tvarjuka);




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