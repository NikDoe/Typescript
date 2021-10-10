type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee; //analogy of interface ElevatedEmployee

const e1: ElevatedEmployee = {
    name: 'NikDoe',
    privileges: ['create-server'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

console.log(add('1', 2))

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(employee: UnknownEmployee) {
    console.log('Name: ' + employee.name)
    if ('privileges' in employee) {
        console.log('Privileges: ' + employee.privileges);
    }
    if ('startDate' in employee) {
        console.log('Start Date: ' + employee.startDate);
    }
}

printEmployeeInformation(e1)
printEmployeeInformation({name: 'Vik', startDate: new Date()})