import { Application, Request, Response } from "express";
import Joi from "joi";
import { Database } from "./database";
import { MyProduct } from "./models/product_model";

export class Product {
  private app: Application;
  private database: Database;

  constructor(app: Application) {
    this.app = app;
    this.database = Database.getInstance();
    this.database
      .getSequelize()
      .sync()
      .then(() => {
        console.log("Database synchronized successfully.");
      })
      .catch((error: Error) => {
        console.error("Error synchronizing database:", error);
      });
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.get("/product/:id", this.getProductById.bind(this));
    this.app.post("/product", this.createProduct.bind(this));
  }

  private async createProduct(req: Request, res: Response): Promise<void> {
    const newProduct = req.body;
    // Check if the request body has the correct data types
    if (!req.is('application/json')) {
      res.status(400).json({ error: 'Invalid content type' });
      return;
    }

    // Validate the request body with joi
    const productSchema = Joi.object({
      name: Joi.string().required(),
      code: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    });
    const { error } = productSchema.validate(newProduct);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      res.status(400).json({
        message: "Validation error",
        error: error.details[0].message,
      });
      return;
    }

    console.log("Creating product:", newProduct);
    const product = new MyProduct({
      name: newProduct.name,
      price: newProduct.price,
      quantity: newProduct.quantity,
    });
    try {
      await product.save();
      console.log("Product created successfully.");
      res.status(201).json(newProduct);
    } catch (error: any) {
      console.error("Error creating product:", error);
      res.status(500).json({
        message: "Error creating product",
        error: error.message,
      });
    }
  }

  private async getProductById(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;

    const product = await MyProduct.findByPk(productId);
    if (!product) {
      console.log("Product not found");
      res.status(404).json({ message: "Product not found" });
      return;
    }
    console.log("Product found:", product);

    res.status(200).json({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  }
}
