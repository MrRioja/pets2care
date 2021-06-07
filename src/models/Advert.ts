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

  @Column("datetime")
  birthDate: string;

  @Column()
  gender: string;

  @Column()
  type: string;

  @Column()
  breed: string;

  @Column()
  description: string;

  @Column("boolean", { default: false })
  vaccinated: boolean;

  @Column("boolean", { default: false })
  dewormed: boolean;

  @Column("boolean", { default: false })
  castrated: boolean;

  @Column("boolean", { default: false })
  deficit: boolean;

  @Column("boolean", { default: true })
  isActive: boolean;

  @Column("boolean", { default: false })
  isSpotlight: boolean;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  createdAt: number;

  @OneToMany(() => Image, (image) => image.advert, {
    cascade: ["insert", "update", "remove"],
  })
  @JoinColumn({ name: "advert_id" })
  images: Image[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  userId: User & number;
}

export { Advert };
