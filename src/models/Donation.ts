import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import User from "./User";
import Advert from "./Advert";

@Entity("donations")
export default class Donation {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  @Column()
  ownerId: number;

  @ManyToOne(() => Advert, (advert) => advert.id)
  @JoinColumn({ name: "advertId" })
  @Column()
  advertId: number;

  @Column("boolean", { nullable: true })
  accepted: boolean;

  @Column()
  createdAt: number;
}

export { Donation };
