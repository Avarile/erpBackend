import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

interface IPayment {
  method:
    | 'cash'
    | 'Debit-card'
    | 'Credit-card'
    | 'Paypal'
    | '3rd-Party Payment';
  amount: number;
  referenceCode: string;
  desc: string;
  payedAt: number;
}

interface IProductInOrder {
  sku: string;
  name: string;
  id: number;
  size: string;
  price: number;
  pcPrice: number;
  installPrice: number;
  currentInStock: number;
}

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  createdAt: number; //  for example Date.parse("2022-05-12"), it will return a number, this applys to all Date data.

  @Column()
  @IsString()
  createdBy: string; // who created this order

  @Column()
  @IsNumber()
  updatedAt: number;

  @Column()
  @IsString()
  updatedBy: string;

  @Column()
  @IsBoolean()
  checked: boolean; // if selected for watch list

  // payment

  @Column()
  @IsNumber()
  priceItemPrice: number;

  @Column()
  @IsNumber()
  pricepcPrice: number;

  @Column()
  @IsNumber()
  priceinstallPrice: number;

  @Column()
  @IsNumber()
  pricetotalAmount: number;

  @Column()
  @IsNumber()
  pricedepositPayed: number;

  @Column()
  @IsString()
  orderStatus: string;

  @Column()
  @IsNumber()
  orderPayed: number;

  @Column('simple-array')
  paymentDetail: Array<IPayment>;

  @Column('simple-array')
  products: Array<IProductInOrder>;

  @Column()
  @IsNumber()
  balanceDue: number;

  // fabrication

  @Column()
  @IsString()
  fabricationStatus: string;

  // logistic

  @Column()
  @IsString()
  shippingAddress: string;

  @Column()
  @IsNumber()
  shippingPostcode: number;

  @Column()
  @IsNumber()
  shippingShippingFee: number;

  @Column()
  @IsString()
  logisticStatus: string;

  @Column()
  @IsString()
  trackingNumber: string;

  @Column()
  @IsString()
  logisticProvider: string;

  @Column()
  @IsNumber()
  pickupAt: number;

  // client

  @Column()
  @IsNumber()
  clientId: number;

  @Column()
  @IsString()
  clientName: string;

  @Column()
  @IsString()
  clientEmail: string;

  @Column()
  @IsBoolean()
  clientVip: boolean;

  @Column()
  @IsString()
  clientAddress: string;

  @Column()
  @IsNumber()
  clientPostcode: number;

  @Column()
  @IsNumber()
  clientMobile: number;
}
