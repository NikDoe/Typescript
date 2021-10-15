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
    console.log('Property Decorator!')
    console.log(target, propName);
}

class Product {
    @Log
    public title: string
    private _price: number

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

    getPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }
}
