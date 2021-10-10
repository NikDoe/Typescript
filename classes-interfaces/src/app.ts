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


//так как accountingCopy не является инстансом Department, то мы не сможем вызвать у него describe();
//чтобы мы могли вызывать методы, нам нужно добавить поле name, так ts будет видеть что обьект похожь на Department
/*
const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

accountingCopy.describe();
*/

const accounting = new Department(new Date().getTime(), 'Accounting');

accounting.addEmployee('Nik');
accounting.addEmployee('Vik');
accounting.addEmployee('Alen');


// accounting.employees[2] = 'Alen'; // Error, private
accounting.describe();
accounting.printEmployeeInformation();