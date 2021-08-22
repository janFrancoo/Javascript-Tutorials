import { Report } from "src/report/report.entity"
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: Number

	@Column()
	email: string

	@Column()
	password: string

	@Column({ default: false })
	admin: boolean

	@OneToMany(() => Report, (report) => report.user) // arrow function solves the circular dependency problem between User and Report
	reports: Report[]

	@AfterInsert()
	logInsert() {
		console.log(`Inserted with id: ${this.id}`)
	}

	@AfterUpdate()
	logUpdate() {
		console.log(`Updated with id: ${this.id}`)
	}

	@AfterRemove()
	logRemove() {
		console.log(`Removed with id: ${this.id}`)
	}
}
