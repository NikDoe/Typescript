function Logger(c: Function) {
    console.log('Logging...');
    console.log(c);
}

@Logger
class Person {
    name = 'NikDoe';

    constructor() {
        console.log('Creating person object...');
    }
}

const newPerson = new Person();

console.log(newPerson);