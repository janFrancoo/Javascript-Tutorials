import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { UserService } from "./user.service"
import { randomBytes, scrypt as _scrypt } from "crypto"
import { promisify } from "util"

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async signUp(email: string, password: string) {
		const users = await this.userService.find(email)
		if (users.length > 0) {
			throw new ConflictException("Email is in use")
		}

		const salt = randomBytes(8).toString("hex")
		const hash = (await scrypt(password, salt, 32)) as Buffer // ts does not recognize hash type because of promisify
		const passwordToSave = salt + "." + hash.toString("hex")

		return await this.userService.create(email, passwordToSave)
	}

	async signIn(email: string, password: string) {
		const [user] = await this.userService.find(email)
		if (!user) {
			throw new NotFoundException("User not found")
		}

		const [salt, storedHash] = user.password.split(".")
		const hash = (await scrypt(password, salt, 32)) as Buffer

		if (storedHash !== hash.toString("hex")) {
			throw new BadRequestException("Invalid credentials")
		}

		return user
	}
}
