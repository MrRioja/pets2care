import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("highlights")
export default class Highlight {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column("boolean")
  isSpotlight: boolean;

  @Column({ nullable: true })
  image: string;

  @Column()
  createdAt: number;
}

export { Highlight };
