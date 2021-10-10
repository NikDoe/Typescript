class Department {
    // private id: string;
    // private name: string;
    private employees: string[] = [];

    constructor(private readonly id: number, private name: string) {
        // this.id = id;
        // this.name = n;
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
    constructor(id: number, private reports: string[]) {
        super(id, 'Accounting');
    }

    addReport(text: string) {
        this.reports.push(text);
    }

    printReports() {
        console.log(this.reports);
    }
}

//так как accountingCopy не является инстансом Department, то мы не сможем вызвать у него describe();
//чтобы мы могли вызывать методы, нам нужно добавить поле name, так ts будет видеть что обьект похожь на Department
/*
const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

accountingCopy.describe();
*/

const it = new ITDepartment(new Date().getTime(), ['Nik']);

it.addEmployee('Nik');
it.addEmployee('Vik');
it.addEmployee('Alen');


// accounting.employees[2] = 'Alen'; // Error, private
it.describe();
it.printEmployeeInformation();
console.log(it)

const accounting = new AccountingDepartment(new Date().getTime(), []);

accounting.addReport('Something went wrong...');

accounting.printReports();