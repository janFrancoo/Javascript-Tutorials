import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { User } from "./user.entity"
import { UserService } from "./user.service"

describe("AuthService", () => {
	let authService: AuthService
	let userServiceMock: Partial<UserService>

	beforeEach(async () => {
		const users: User[] = []

		userServiceMock = {
			find: (email: string) => {
				const filteredUsers = users.filter((u) => u.email === email)
				return Promise.resolve(filteredUsers)
			},
			create: (email: string, password: string) => {
				const user = { id: Math.floor(Math.random() * 999999), email, password } as unknown as User
				users.push(user)
				return Promise.resolve(user)
			}
		}

		const module = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UserService,
					useValue: userServiceMock
				}
			]
		}).compile()

		authService = module.get(AuthService)
	})

	it("creates a new user with a salted and hashed password", async () => {
		const user = await authService.signUp("jan@janfranco.com", "12345")
		expect(user.password).not.toEqual("12345")
		const [salt, hash] = user.password.split(".")
		expect(salt).toBeDefined()
		expect(hash).toBeDefined()
	})

	it("throws an error if user signs up with email that is in use", async () => {
		await authService.signUp("jan@janfranco.com", "12345")
		try {
			await authService.signUp("jan@janfranco.com", "12345")
		} catch (err) {
			expect(err).toBeInstanceOf(ConflictException)
			expect(err.message).toBe("Email is in use")
		}
	})

	it("throws an error if sign in is called with email that is not in use", async () => {
		try {
			await authService.signIn("jan@janfranco.com", "12345")
		} catch (err) {
			expect(err).toBeInstanceOf(NotFoundException)
			expect(err.message).toBe("User not found")
		}
	})

	it("throws an error if sign in is called with wrong password", async () => {
		await authService.signUp("jan@janfranco.com", "12345")
		try {
			await authService.signIn("jan@janfranco.com", "123456789")
		} catch (err) {
			expect(err).toBeInstanceOf(BadRequestException)
			expect(err.message).toBe("Invalid credentials")
		}
	})

	it("returns the user if correct password is provided", async () => {
		await authService.signUp("jan@janfranco.com", "12345")
		const user = await authService.signIn("jan@janfranco.com", "12345")
		expect(user).toBeDefined()
	})
})
