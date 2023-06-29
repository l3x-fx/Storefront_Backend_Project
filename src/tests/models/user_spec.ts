// @ts-ignore
import Client from '../../database'
import { User, UserStore } from '../../models/user';

const store = new UserStore()

afterEach(async () => {
    //@ts-ignore
    const conn = await Client.connect()
    const sql = 'DELETE FROM users WHERE username = $1';
    const user = 'testuser';

    try {
        await conn.query(sql, [user]);
        conn.release()
    } catch (err) {
        console.error('Error deleting user:', err);
    }
});

describe ("User Model", () => {
    it ('should have an index method', () => {
        expect (store.index).toBeDefined()
    }); 
    it ('should have showUserById method', () => {
        expect (store.showUserById).toBeDefined()
    }); 
    it ('should have create method', () => {
        expect (store.create).toBeDefined()
    }); 
})
describe ("User Model Methods", () => {
    it ('index method should return a list of users', async () => {
        const result = await store.index();
        expect (result.length).toBeGreaterThan(4)
    });
    
    it ('showUserById method should return a user', async () => {
        const result = await store.showUserById(1);

        const ReturnUser = {
            id:1,
            username:"frodobaggins",
            firstname:"Frodo",
            lastname:"Baggins",
            password_digest:"password1"
        }

        expect (result).toEqual(ReturnUser)
    });

    it ('create method should create a user return that user', async () => {

        const mockUser:User = {
            username:"testuser",
            firstname:"Test",
            lastname:"User",
            password_digest:"testpw"
        }
        const result = await store.create(mockUser);

        expect (result.username).toEqual('testuser')
        expect (result.firstname).toEqual('Test')
        expect (result.lastname).toEqual('User')
    })
})