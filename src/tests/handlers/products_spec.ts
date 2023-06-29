import { app } from '../../server';
import supertest from 'supertest';
import { store } from '../../handlers/products';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const {TOKEN_SECRET} = process.env

const request = supertest(app);

const MockUser: User = {
    id: 1,
    username: 'tombom',
    firstname: 'Tom',
    lastname: 'Bombadil', 
    password: 'pw123'   
}

const token = jwt.sign({ user: MockUser}, TOKEN_SECRET as Secret);


const MockProduct: Product = {
    id: 1,
    name: 'Narsil',
    price: 999,
    category: 'Weapon',
    total_quantity: 5
}



beforeAll(() => {
    spyOn(store, 'index').and.returnValue(Promise.resolve([MockProduct]));
    spyOn(store, 'showProductById').and.returnValue(Promise.resolve(MockProduct));
    spyOn(store, "createNewProduct").and.returnValue(Promise.resolve(MockProduct));
    spyOn(store, "showProductByCategory").and.returnValue(Promise.resolve([MockProduct]));
    spyOn(store, "showTopFiveProducts").and.returnValue(Promise.resolve([MockProduct]));

});


describe('Products endpoint tests', () => {
    it('GET /products should return a list of products ', async () => {
        const response = await request
            .get('/products')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([MockProduct]);
    });
    it('GET /products/:id  should return a user', async () => {
        const response = await request
            .get('/products/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(MockProduct);
    });
    it('POST /products without body should return the product', async () => {
        const response = await request
            .post('/products')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(MockProduct);
    });
    it('GET /products/stats/topFive should return the top five products', async () => {
        const response = await request
            .get('/products/stats/topFive')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([MockProduct]);
    });
    it('GET /products/category/:category should return a product', async () => {
        const response = await request
            .get('/products/category/Weapon')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([MockProduct]);
    });
})