class Department {
    static fiscalYear = 2020;
    // private id: string;
    // private name: string;
    protected employees: string[] = [];

    constructor(private readonly id: number, private name: string) {
        // this.id = id;
        // this.name = n;
        // console.log(this.fiscalYear); //Error, constructor isn't static method
    }

    static createEmployee(name: string) {
        console.log(this.fiscalYear); // only in static method
        return { name };
    }

    describe(this: Department) {
        // this.id = '1234'; //Error readonly property
        console.log(`Department (${this.id}): ${this.name}`);
        console.log(this.id)
    }

    addEmployee(employee: string) {
        // validation etc
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    constructor(id: number, public admins: string[]) {
        super(id, 'IT');
    }

}

class AccountingDepartment extends Department {

    get mostRecentReport() {
        if (this.lastReport) return this.lastReport;
        throw new Error('no report found')
    }

    set mostRecentReport(value:string) {
        if(!value) throw new Error('Please pass in a valid value!');
        this.addReport(value);
    }
    constructor(private reports: string[], private lastReport: string) {
        super(new Date().getTime(), 'Accounting');
    }

    addEmployee(name: string) {
        if (name === 'Nik') {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
        console.log(this.lastReport)
    }
}

//так как accountingCopy не является инстансом Department, то мы не сможем вызвать у него describe();
//чтобы мы могли вызывать методы, нам нужно добавить поле name, так ts будет видеть что обьект похожь на Department
/*
const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

accountingCopy.describe();
*/

const employee1 = Department.createEmployee('NikDoe'); //call static method
console.log(employee1, Department.fiscalYear); //call static property fiscalYear

const it = new ITDepartment(new Date().getTime(), ['Nik']);

it.addEmployee('Nik');
it.addEmployee('Vik');
it.addEmployee('Alen');


// accounting.employees[2] = 'Alen'; // Error, private
it.describe();
it.printEmployeeInformation();
console.log(it)

const accounting = new AccountingDepartment([], '');

accounting.addReport('Something went wrong...');
accounting.addReport('New report');
accounting.mostRecentReport = 'Year End Report';

accounting.printReports();
accounting.addEmployee('Andrew');
accounting.addEmployee('Nik');
accounting.printEmployeeInformation();