import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column("varchar", { length: 255, nullable: true })
  name: string;

  @Column("varchar", { length: 255, nullable: true })
  email: string;

  @Column({ length: 255, nullable: true })
  password: string;
}
