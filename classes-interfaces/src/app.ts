class Department {
    name: string;

    constructor(n: string) {
        this.name = n;
    }

    //this: Department - явное указания для инстансов
    describe(this: Department) {
        console.log('Department: ' + this.name);
    }
}

const accounting = new Department('Accounting');

accounting.describe();

//так как accountingCopy не является инстансом Department, то мы не сможем вызвать у него describe();
//чтобы мы могли вызывать методы, нам нужно добавить поле name, так ts будет видеть что обьект похожь на Department
const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

accountingCopy.describe();