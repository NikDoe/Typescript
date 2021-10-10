class Department {
    public name: string;
    private employees: string[] = [];

    constructor(n: string) {
        this.name = n;
    }

    //this: Department - явное указания для инстансов
    describe(this: Department) {
        console.log('Department: ' + this.name);
    }

    addEmployee(employee: string) {
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

const accounting = new Department('Accounting');

accounting.addEmployee('Nik');
accounting.addEmployee('Vik');
accounting.addEmployee('Alen');


// accounting.employees[2] = 'Alen'; // Error, private
accounting.describe();
accounting.printEmployeeInformation();