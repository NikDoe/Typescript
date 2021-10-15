function Logger(logString: string) {
    console.log('LOGGER FACTORY')
    return function(_: Function) {
        console.log(logString);
    };
}

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY')
    return function(constructor: any) {
        console.log('RENDER TEMPLATE')
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'NikDoe';

    constructor() {
        console.log('Creating person object...');
    }
}

const newPerson = new Person();

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
