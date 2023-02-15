import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "provider" })
export class Provider{

    @PrimaryColumn("cpf")
    cpf: string;

    @Column("name")
    name: string;

    @Column("email")
    email: string;

    @Column("password")
    password: string;

    @Column("gender")
    gender: string;

    @Column("description")
    description: string;

    @Column("avatar_url")
    avatarUrl: string;

    @Column("specialty")
    specialty: string;

    @Column("phone_number")
    phoneNumber: string;

    @Column("profile_approved")
    profileApproved: boolean;

};