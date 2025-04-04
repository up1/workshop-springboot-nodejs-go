// Working with postgresql and sequelize
import { Sequelize } from 'sequelize-typescript';
import { MyProduct } from './models/product_model';

export class Database {
  private static instance: Database;
  private sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      database: process.env.POSTGRES_DATABASE_NAME,
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USERNAME,
      models: [MyProduct], //  your models
      logging: true, // enable logging
    });
    this.sequelize.sync({ force: true });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }
}