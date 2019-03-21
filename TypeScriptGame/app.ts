﻿/// <reference path="scripts/typings/jquery/jquery.d.ts" />

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
    
    constructor() { this.IsAlive = true, this.IsUpgrade = true; }
    abstract move(distanceInMeters: number): void;

    setStartAttributes(): void{
        this.health = Math.floor(Math.random() * (this.healthMax - this.healthMin)) + this.healthMin;
        this.armor = Math.floor(Math.random() * (this.armorMax - this.armorMin)) + this.armorMin;
        this.attack = Math.floor(Math.random() * (this.attackMax - this.attackMin)) + this.attackMin;
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
    }

    move(distance) {
        console.log("Swim");
    }
}



class Wizard extends Unit {
    constructor() {
        super();
        this.name = "Wizard";
    }

    move(distance) {
        console.log("Swim");
    }
}



let snake: Unit = new Swordman();
snake.move(5);

let tvarjuka: Unit = new Archer();
tvarjuka.move(40);

tvarjuka = new Wizard();
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