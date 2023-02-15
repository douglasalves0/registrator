import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "provider" })
export class Provider{

    @PrimaryColumn({ name: "cpf", type: "varchar", nullable: false })
    cpf: string;

    @Column({ name: "name", type: "varchar", nullable: true })
    name: string;

    @Column({ name: "email", type: "varchar", nullable: true })
    email: string;

    @Column({ name: "password", type: "varchar", nullable: true })
    password: string;

    @Column({ name: "gender", type: "varchar", nullable: true })
    gender: string;

    @Column({ name: "description", type: "varchar", nullable: true })
    description: string;

    @Column({ name: "avatar_url", type: "varchar", nullable: true })
    avatarUrl: string;

    @Column({ name: "specialty", type: "varchar", nullable: true })
    specialty: string;

    @Column({ name: "phone_number", type: "varchar", nullable: true })
    phoneNumber: string;

    @Column({ name: "profile_approved", type: "boolean", nullable: true })
    profileApproved: boolean;

};