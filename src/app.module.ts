import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// Entities
import { UserEntity } from './users/entities/user.entity';
import { OrderEntity } from './orders/entities/order.entity';
import { ClientEntity } from './clients/entities/client.entity';
import { ProductEntity } from './products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserEntity, OrderEntity, ClientEntity, ProductEntity],
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
