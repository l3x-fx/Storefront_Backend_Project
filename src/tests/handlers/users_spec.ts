import { app } from '../../server';
import supertest from 'supertest';
import { store } from '../../handlers/users';
import { User } from '../../models/user';
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

const MockUserReturn: User = {
    id: 1,
    username: 'tombom',
    firstname: 'Tom',
    lastname: 'Bombadil', 
}
const token = jwt.sign({ user: MockUser}, TOKEN_SECRET as Secret);

beforeAll(() => {
    spyOn(store, 'index').and.returnValue(Promise.resolve([MockUserReturn]));
    spyOn(store, 'showUserById').and.returnValue(Promise.resolve(MockUserReturn));
    spyOn(store, 'create').and.returnValue(Promise.resolve(MockUser));

});


describe('Users endpoint tests', () => {
    it('GET /users should return a list of users ', async () => {
        const response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([MockUserReturn]);
    });
    it('GET /users/:id  should return a user', async () => {
        const response = await request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(MockUserReturn);
    });
    it('POST /users should result in status 200', async () => {
        const response = await request
            .post('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
    
})
    


