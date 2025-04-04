import request from 'supertest';
import express, { Application } from 'express';
import { Product } from '../product';

describe('Express API', () => {
  let app: Application;
  
  beforeEach(() => {
    // Create a fresh express app for each test
    app = express();
    app.use(express.json()); // Add middleware to parse JSON bodies
    
    // Set up routes directly instead of using Server class to avoid actual server listening
    app.get('/', (req, res) => {
      res.status(200).json({ message: 'Hello World!' });
    });
    
    // Initialize Product routes
    new Product(app);
  });
  
  describe('Root endpoint', () => {
    it('should return Hello World message', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Hello World!' });
    });
  });
  
  describe('Product endpoints', () => {
    it('should get a product by ID', async () => {
      const productId = '123';
      const response = await request(app).get(`/product/${productId}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: productId,
        name: 'Sample Product',
        price: 100.50,
        description: 'This is a sample product description.'
      });
    });
    
    it('should create a new product', async () => {
      const newProduct = {
        name: 'New Product',
        price: 199.99,
        description: 'A brand new product'
      };
      
      const response = await request(app)
        .post('/product')
        .send(newProduct)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'Product created successfully',
        product: newProduct
      });
    });
  });
});