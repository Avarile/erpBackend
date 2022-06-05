import { IsString, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  sku: string;

  @Column()
  @IsString()
  type: string;

  @Column()
  @IsString()
  subtype: string;

  @Column()
  @IsString()
  detail: string;

  @Column()
  @IsNumber()
  currentInStock: number;

  @Column()
  @IsNumber()
  price: number;

  @Column({ nullable: true })
  powdercoatingPrice: number | null;

  @Column({ nullable: true })
  installationPrice: number | null;

  @Column()
  @IsString()
  size: string;

  @Column()
  @IsNumber()
  length: number;

  @Column()
  @IsString()
  desc: string;

  @Column()
  @IsString()
  spec: string;

  @Column()
  @IsString()
  updateLog: string;

  @Column()
  @IsNumber()
  lastUpdate: number;
}
