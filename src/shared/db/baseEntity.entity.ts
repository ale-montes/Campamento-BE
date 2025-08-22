import { PrimaryKey } from '@mikro-orm/core';
import { Property } from '@mikro-orm/core';
import { DateTimeType } from '@mikro-orm/mysql'; // Adjust import based on your setup

export abstract class BaseEntity {
  @PrimaryKey()
  id?: number;

  @Property({ type: DateTimeType })
  createdAt? = new Date();

  @Property({
    type: DateTimeType,
    onUpdate: () => new Date(),
  })
  updatedAt? = new Date();
}
