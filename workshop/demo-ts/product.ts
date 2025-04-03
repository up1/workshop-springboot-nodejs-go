import { Application, Request, Response } from "express";

export class Product {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.get("/product/:id", this.getProductById.bind(this));
    this.app.post("/product", this.createProduct.bind(this));
  }

  private createProduct(req: Request, res: Response): void {
    const newProduct = req.body;
    res.status(201).json({ 
        message: "Product created successfully",
        product: newProduct
    });
  }
  
  private getProductById(req: Request, res: Response): void {
    const productId = req.params.id;
    res.status(200).json({ 
        id: productId,
        name: "Sample Product",
        price: 100.50,
        description: "This is a sample product description."
    });
  }
}