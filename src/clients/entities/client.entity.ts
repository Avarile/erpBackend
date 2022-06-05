import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsNumber()
  mobile: number;

  @Column()
  @IsBoolean()
  vip: boolean;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsNumber()
  postcode: number;
}
