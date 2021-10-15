function Logger(logString: string) {
    console.log('LOGGER FACTORY')
    return function(_: Function) {
        console.log(logString);
    };
}

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function<T extends { new (...args: any[]): {name: string} }>(
        originalConstructor: T
    ) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    };
}

//декорраторы закрепленные за классами/аксессорами/методами могут возвращать что либо
//декорраторы закрепленные за свойствами/параметрами, тоже могут возвращать, но ts проигнорирует этот return

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'NikDoe';

    constructor() {
        console.log('Creating person object...');
    }
}

const newPerson = new Person();
// console.log(newPerson)

//DIFFERENT DECORATORS
function Log (target: any, propName: string | symbol) {
    console.log('PROPERTY DECORATOR!')
    console.log(target, propName);
}

function LogParameter(target: any, name: string | symbol, position: number) {
    console.log('PARAMETER DECORATOR!')
    console.log(target);
    console.log(name);
    console.log(position);
}

function LogAccessor(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
    console.log('ACCESSOR DECORATOR!')
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function LogMethod(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
    console.log('METHOD DECORATOR!')
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

class Product {
    @Log
    public title: string
    private _price: number

    @LogAccessor
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @LogMethod
    getPriceWithTax(@LogParameter tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);


//AUTOBIND DECORATOR
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        }
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);