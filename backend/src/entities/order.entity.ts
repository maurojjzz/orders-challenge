import { Entity, Property, Enum } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.js";

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

@Entity()
export class Order extends BaseEntity {
  @Property({ type: 'text', nullable: false })
  customer_name!: string;

  @Property({ type: 'text', nullable: false })
  item!: string;

  @Property({ type: 'integer', nullable: false })
  quantity!: number;

  @Enum(() => OrderStatus)
  status: OrderStatus = OrderStatus.PENDING;
}
