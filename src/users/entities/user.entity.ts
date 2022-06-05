import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNumber, IsString } from 'class-validator';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsString()
  auth: string;
}
