// type addFn = (a: number, b: number) => number; // type as fn
interface addFn { //interface as fn
    (a: number, b: number): number;
}

const add: addFn = (n1:number, n2:number) => {
    return n1 + n2;
}

interface Named {
    readonly name: string;
}

interface Greetable extends Named{
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string
    age = 30;
    constructor(n: string) {
        this.name = n
    }

    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
}

let user1: Greetable;

user1 = new Person('Nik')
// user1.name = 'Vik'; //Error, readonly property

user1.greet('Hi');

console.log(user1);