import express, { Application, Request, Response } from "express";
import { Product } from "./product";

import logger from "pino-http";

export class Server {
  private app: Application;
  private port: number;

  constructor(port: number = 3000) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(logger());
    this.port = port;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.get("/", this.handleRoot.bind(this));
    new Product(this.app);
  }

  private handleRoot(req: Request, res: Response): void {
    req.log.info({key: "value"}, "Demo structured log");
    res.status(200).json({ message: "Hello World!" });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}