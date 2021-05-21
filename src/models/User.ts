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
  address: string;

  @Column("date")
  birthDate: string;

  @Column()
  telephone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: number;
}

export { User };
