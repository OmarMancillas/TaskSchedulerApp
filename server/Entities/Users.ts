import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @PrimaryColumn()
    username!: string;

    @Column()
    password!: string;
}
