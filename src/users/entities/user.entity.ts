import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Unique,
} from 'typeorm';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Logger } from '@nestjs/common';

@Entity()
@Unique(['name']) // set the unique attributes
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
  authLevel: string;

  /**
   * this is a classic example of why we should use the entity to create/update the data, for every time the entity is called, codes/hooks in it will be called.
   */
  @AfterInsert()
  logInsert() {
    Logger.log(`user ${this.name} is succesfully created! id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    Logger.log(`user ${this.name} is succesfully removed!`);
  }

  @AfterUpdate()
  logUpdate() {
    Logger.log(`user ${this.name} is succesfully updated!`);
  }
}
