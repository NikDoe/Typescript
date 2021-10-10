abstract class Department {
    static fiscalYear = 2020;
    // private id: string;
    // private name: string;
    protected employees: string[] = [];

    protected constructor(protected readonly id: number, protected name: string) {
        // this.id = id;
        // this.name = n;
        // console.log(this.fiscalYear); //Error, constructor isn't static method
    }

    static createEmployee(name: string) {
        console.log(this.fiscalYear); // only in static method
        return { name };
    }

    abstract describe(this: Department): void;

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

    describe() {
        console.log('The IT describe method' + this.id)
    }

}

class AccountingDepartment extends Department {
    private static accountingInstance: AccountingDepartment;

    static getAccountingInstance(){
        return this.accountingInstance || (this.accountingInstance = new AccountingDepartment([], ''))
    }


    get mostRecentReport() {
        if (this.lastReport) return this.lastReport;
        throw new Error('no report found')
    }

    set mostRecentReport(value:string) {
        if(!value) throw new Error('Please pass in a valid value!');
        this.addReport(value);
    }

    private constructor(private reports: string[], private lastReport: string) {
        super(new Date().getTime(), 'Accounting');
    }

    describe(this: AccountingDepartment){
        console.log('The Accounting describe method' + this.name)
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

///static
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

const accounting = AccountingDepartment.getAccountingInstance();
const accounting1 = AccountingDepartment.getAccountingInstance();
console.log(accounting, accounting1);

accounting.addReport('Something went wrong...');
accounting.addReport('New report');
accounting.mostRecentReport = 'Year End Report';

accounting.printReports();
accounting.addEmployee('Andrew');
accounting.addEmployee('Nik');
accounting.printEmployeeInformation();

///abstract
accounting.describe();