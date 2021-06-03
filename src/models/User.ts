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

  @Column()
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

  @Column()
  description: string;

  @Column()
  website: string;

  @Column()
  avatar: string;

  @Column()
  passwordResetToken: string;

  @Column("datetime")
  passwordResetExpires: Date;

  @Column()
  createdAt: number;
}

export { User };
