import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import Advert from "./Advert";
import User from "./User";

@Entity("favorites")
export default class Favorite {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  createdAt: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  userId: User & number;

  @ManyToOne(() => Advert, (advert) => advert.id)
  @JoinColumn({ name: "advertId" })
  advertId: User & number;
}

export { Favorite };
