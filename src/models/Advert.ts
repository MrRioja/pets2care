import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import Image from "./Image";
import User from "./User";

@Entity("adverts")
export default class Advert {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column("date")
  birthDate: string;

  @Column()
  gender: string;

  @Column()
  type: string;

  @Column()
  breed: string;

  @Column()
  description: string;

  @Column("boolean")
  vaccinated: boolean;

  @Column("boolean")
  dewormed: boolean;

  @Column("boolean")
  castrated: boolean;

  @Column("boolean")
  deficit: boolean;

  @Column()
  createdAt: number;

  @OneToMany(() => Image, (image) => image.advert, {
    cascade: ["insert", "update", "remove"],
  })
  @JoinColumn({ name: "advert_id" })
  images: Image[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  userId: User;
}

export { Advert };
