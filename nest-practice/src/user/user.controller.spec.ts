import { NotFoundException } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UserController } from "./user.controller"
import { User } from "./user.entity"
import { UserService } from "./user.service"

describe("UserController", () => {
	let controller: UserController
	let userServiceMock: Partial<UserService>
	let authServiceMock: Partial<AuthService>

	beforeEach(async () => {
		userServiceMock = {
			findOne: (id: number) => {
				return Promise.resolve({ id, email: "jan@janfranco.com", password: "12345" } as unknown as User)
			}
		}

		authServiceMock = {
			signIn: (email: string, password: string) => {
				return Promise.resolve({ id: 1, email, password } as unknown as User)
			}
		}

		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: userServiceMock
				},
				{
					provide: AuthService,
					useValue: authServiceMock
				}
			]
		}).compile()

		controller = module.get<UserController>(UserController)
	})

	it("findUser returns a single user with the given id", async () => {
		const user = await controller.findUser("1")
		expect(user).toBeDefined()
	})

	it("findUser throws an error if user with the given id is not found", async () => {
		userServiceMock.findOne = () => null
		try {
			await controller.findUser("1")
		} catch (err) {
			expect(err).toBeInstanceOf(NotFoundException)
			expect(err.message).toBe("User not found")
		}
	})

	it("signIn updates session object and returns user", async () => {
		const session = {
			userId: -1
		}
		const user = await controller.signIn({ email: "jan@janfranco", password: "12345" }, session)
		expect(user).toBeDefined()
		expect(user.id).toEqual(1)
		expect(session.userId).toEqual(1)
	})
})
