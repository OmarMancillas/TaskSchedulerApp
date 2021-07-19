import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Tasks extends BaseEntity{
    
    @PrimaryColumn()
    id!: string

    @PrimaryColumn()
    user_id!: number

    @Column()
    task!: string

    // @Column()
    // hours_assigned!: number
    @Column()
    starts_at!: Date

    @Column()
    ends_at!:Date

    @CreateDateColumn()
    create_date!: Date
}