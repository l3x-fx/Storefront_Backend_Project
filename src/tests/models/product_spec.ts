// @ts-ignore
import Client from '../../database'
import { Product, ProductStore } from '../../models/product';

const store = new ProductStore()

afterEach(async () => {
    //@ts-ignore
    const conn = await Client.connect()
    const sql = 'DELETE FROM products WHERE name = $1';
    const user = 'Hobbit Ale';

    try {
        await conn.query(sql, [user]);
        conn.release()
    } catch (err) {
        console.error('Error deleting product:', err);
    }
});

describe ("Product Model", () => {
    it ('should have an index method', () => {
        expect (store.index).toBeDefined()
    }); 
    it ('should have showProductById method', () => {
        expect (store.showProductById).toBeDefined()
    }); 
    it ('should have createNewProduct method', () => {
        expect (store.createNewProduct).toBeDefined()
    }); 
    it ('should have an showProductByCategory method', () => {
        expect (store.showProductByCategory).toBeDefined()
    }); 
    it ('should have showTopFiveProducts method', () => {
        expect (store.showTopFiveProducts).toBeDefined()
    }); 
})

describe ("Product Model Methods", () => {
    it ('index method should return a list of products', async () => {
        const result = await store.index();
        expect (result.length).toBeGreaterThan(6)
    });

    it ('showProductById method should return a product by ID', async () => {
        const result = await store.showProductById(1);

        const ReturnProduct:Product = {
            id:1,
            name:'The One Ring',
            price:999,
            category:'Jewelry',
        }

        expect (result).toEqual( ReturnProduct)
    });

    it ('createNewProduct method should create a product return that product', async () => {

        const MockProduct:Product = {
            name:"Hobbit Ale",
            price:3,
            category:'Food',
        }
        const result = await store.createNewProduct(MockProduct);

        const ResultProduct:Product= {
            id:8,
            name:"Hobbit Ale",
            price:3,
            category:'Food',
        }

        expect (result).toEqual(ResultProduct)

    });

    it ('showProductByCategory method should show all products of a given category', async () => {

        const result = await store.showProductByCategory('Jewelry');
        expect (result.length).toEqual(2)

    });

    it ('showTopFiveProducts method should show the 5 most ordered products', async () => {

        const result = await store.showTopFiveProducts();

        expect (result[0].total_quantity).toBeGreaterThanOrEqual(result[1].total_quantity as number)
        expect (result[1].total_quantity).toBeGreaterThanOrEqual(result[2].total_quantity as number)
        expect (result[2].total_quantity).toBeGreaterThanOrEqual(result[3].total_quantity as number)
        expect (result[3].total_quantity).toBeGreaterThanOrEqual(result[4].total_quantity as number)
        expect (result[0].name).toEqual('Anduril')


    })

})