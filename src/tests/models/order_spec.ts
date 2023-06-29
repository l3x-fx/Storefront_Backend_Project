// @ts-ignore
import Client from '../../database'
import { Order, OrderProducts, OrderStore } from '../../models/order';

const store = new OrderStore()

afterEach(async () => {
    //@ts-ignore
    const conn = await Client.connect()
    const sql1 = 'DELETE FROM orders WHERE id > 14';
    const sql2 = 'DELETE FROM order_products WHERE id > 22';

    try {
        await conn.query(sql1);
        await conn.query(sql2);
        conn.release()
    } catch (err) {
        console.error('Error deleting user:', err);
    }
});

describe ("Order Model", () => {
    it ('should have an getOrderById method', () => {
        expect (store.getOrderById).toBeDefined()
    }); 
    it ('should have createOrder method', () => {
        expect (store.createOrder).toBeDefined()
    }); 
    it ('should have addProductToOrder method', () => {
        expect (store.addProductToOrder).toBeDefined()
    });
    it ('should have showRecentOrderByUserId method', () => {
        expect (store.showRecentOrderByUserId).toBeDefined()
    }); 
    it ('should have an showProductsOfOrder method', () => {
        expect (store.showProductsOfOrder).toBeDefined()
    }); 
    it ('should have showCompletedOrdersByUser method', () => {
        expect (store.showCompletedOrdersByUser).toBeDefined()
    }); 

})
describe ('Order Model Methods', () => {
    it ('getOrderById method should return an order by ID', async () => {
        const result:Order = await store.getOrderById(1);
        const ReturnOrder:Order= {
            id:1,
            status:"complete",
            user_id:"4", 
            products: [{product_id:"1", quantity: 2}]
        }
        expect(result).toEqual(ReturnOrder) 
    });
    
    it ('createOrder method should create an empty order and return it', async () => {
        const result = await store.createOrder(1);

        const ReturnOrder = {
            id:15,
            status:"active", 
            user_id: "1"
        }

        expect(result).toEqual(ReturnOrder)
    });

    it ('addProductToOrder method should add a product to the order and return it', async () => {
        const MockProduct:OrderProducts= {
            quantity:6, 
            order_id: '2',
            product_id: '3',
        }

        const ReturnOrderProduct:OrderProducts = {
            id:23,
            order_id: '2',
            product_id: '3',
            quantity: 6
        }

        const result = await store.addProductToOrder(MockProduct);

        expect(result).toEqual(ReturnOrderProduct)

    }); 

    it ('showProductsOfOrder should return all products of an existing order', async()=> {
        const result = await store.showProductsOfOrder(7)
        const ReturnOrderProduct:OrderProducts[] = [
            {
                product_id:'2', 
                quantity:1
            }
        ]
        expect(result).toEqual(ReturnOrderProduct)
    })

    it('showRecentOrderByUserId method should show the latest active order of an User', async () => {
        const result = await store.showRecentOrderByUserId(2);

        const ReturnOrder:Order = {
            id: 7,
            status: 'active',
            user_id: '2',
            products: [ { product_id: '2', quantity: 1 } ]
        }
        
        expect(result).toEqual(ReturnOrder)
    });

    it('showCompletedOrdersByUser method should show an array of completed orders of an User', async () => {
        const result = await store.showCompletedOrdersByUser('3');

        const ReturnOrder:Order[] = [{
            id: 8,
            status: 'complete',
            user_id: '3',
            products: [ { product_id: '7', quantity: 3 } ]
        }]
        
        expect(result).toEqual(ReturnOrder)
    });
})     
