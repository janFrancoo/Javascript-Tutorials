import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import * as request from "supertest"
import { AppModule } from "./../src/app.module"

describe("Authentication System", () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it("handles a signup requests", async () => {
		return await request(app.getHttpServer())
			.post("/auth/signup")
			.send({ email: "janjan@janfranco.com", password: "12345" })
			.expect(201)
			.then((res) => {
				const { id, email } = res.body
				expect(id).toBeDefined()
				expect(email).toEqual("janjan@janfranco.com")
			})
	})

	it("signup as a new user then get currently logged in user", async () => {
		const res = await request(app.getHttpServer())
			.post("/auth/signup")
			.send({ email: "jan@janfranco.com", password: "12345" })
			.expect(201)

		const cookie = res.get("Set-Cookie")

		const { body } = await request(app.getHttpServer()).get("/auth/whoami").set("Cookie", cookie).expect(200)

		expect(body.email).toEqual("jan@janfranco.com")
	})
})
