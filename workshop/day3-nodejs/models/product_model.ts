import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'demo_product',
})
export class MyProduct extends Model {

  @Column({
    type: 'varchar',
    allowNull: false,
  })
  name!: string;

  @Column({
    type: 'varchar',
    allowNull: true,
  })
  code?: string;

  @Column({
    type: 'integer',
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: 'float',
    allowNull: false,
  })
  price!: number;


}