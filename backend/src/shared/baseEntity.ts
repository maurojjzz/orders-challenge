import { DateTimeType, PrimaryKey, Property } from "@mikro-orm/core"
import { v4 } from 'uuid';

export abstract class BaseEntity {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ type: DateTimeType })
    created_at = new Date()
}