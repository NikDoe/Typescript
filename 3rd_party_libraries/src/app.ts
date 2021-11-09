import { Product } from './product.model';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

const products = [
    {title: "A book", price: 12.99},
    {title: "A carpet", price: 24.99}
]

const newProd = new Product('', -5.99);

validate(newProd).then(errors => {
    if (errors.length > 0) {
        console.log('VALIDATION ERRORS!');
        console.log(errors);
    } else {
        console.log(newProd.getInformation());
    }
});

// const loadedProducts = products.map(prod => {
//     return new Product(prod.title, prod.price)
// })

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
    console.log(prod.getInformation());
}