import express, { Application, Request, Response } from 'express';

class Server {
  private app: Application;
  private port: number;

  constructor(port = 3000) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.port = port;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.get('/', this.handleRoot.bind(this));
  }

  private handleRoot(req: Request, res: Response): void {
    res.status(200).json({ message: 'Hello World!' });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

// Create and start the server
const server = new Server();
server.start();
