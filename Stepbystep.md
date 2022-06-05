#### Project init:

1. generate the project and the users/ orders/ products/ clients/ with resource

- nest new projectName
- nest g resource apiName

2. Init the Repository( collect the Database to the programme) - well, I will start with sqlite3 and typeorm(in I will stick with typeorm) - import the Typeorm and setting in the app.module.ts:

```
 TypeOrmModule.forRoot({ type: 'sqlite', database: 'db.sqlite', entities: [], // there all the entities needs to be include in this array synchronize: true, }),
```

3. Define the entity:

```
   //User.entity:
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

```

- and then import the entity into user.module.ts:

```
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

```

- last I need to do is to registe the entity in app.module

```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserEntity],  //registe the entity to the Database
      synchronize: true,
    }),
    UsersModule,
    OrdersModule,
    ClientsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```
