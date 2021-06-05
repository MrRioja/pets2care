import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column("datetime")
  birthDate: string;

  @Column()
  telephone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  avatar: string;

  @Column("boolean")
  isSpotlight: boolean;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ type: "datetime", nullable: true })
  passwordResetExpires: Date;

  @Column()
  createdAt: number;
}

export { User };
