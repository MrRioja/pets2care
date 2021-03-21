import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";

import Image from "./Image";

@Entity("adverts")
export default class Advert {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  place: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @Column()
  createdAt: number;

  @OneToMany(() => Image, (image) => image.advert, {
    cascade: ["insert", "update", "remove"],
  })
  @JoinColumn({ name: "advert_id" })
  images: Image[];
}

export { Advert };
