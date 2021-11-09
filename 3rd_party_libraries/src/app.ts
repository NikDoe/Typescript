import { Product } from './product.model';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

const products = [
    {title: "A book", price: 12.99},
    {title: "A carpet", price: 24.99}
]
// const loadedProducts = products.map(prod => {
//     return new Product(prod.title, prod.price)
// })

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
    console.log(prod.getInformation());
}