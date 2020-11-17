import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";

import Image from "./Image";

@Entity("adverts")
export default class Orphanage {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  pet_name: string;

  @Column()
  age: number;

  @Column()
  city: string;

  @Column()
  species: string;

  @Column()
  description: string;

  @Column()
  user_id: number;

  @Column()
  created_at: string;

  @OneToMany(() => Image, (image) => image.advert, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "advert_id" })
  images: Image[];
}
