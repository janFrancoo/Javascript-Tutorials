import request from "supertest"
import { Express } from "express-serve-static-core"
import UserService from "@fclassroom/services/user"
import { createServer } from "@fclassroom/utils/create_server"
import faker from "faker"

let server: Express

beforeAll(() => {
	server = createServer()
})

describe("auth failure", () => {
	it("should return 500 & valid response if auth rejects with an error", (done) => {
		jest.spyOn(UserService, "auth").mockRejectedValue(new Error())
		request(server)
			.get(`/api/v1/goodbye`)
			.set("Authorization", "Bearer fakeToken")
			.expect(500)
			.end(function (err, res) {
				if (err) return done(err)
				expect(res.body).toMatchObject({
					error: { type: "internal_server_error", message: "Internal server error" }
				})
				done()
			})
	})
})

describe("createUser failure", () => {
	it("should return 500 & valid response if auth rejects with an error", async (done) => {
		jest.spyOn(UserService, "createUser").mockResolvedValue({ error: { type: "unkonwn", message: "unknown" } })
		request(server)
			.post(`/api/v1/user`)
			.send({
				email: faker.internet.email(),
				password: faker.internet.password(),
				name: faker.name.firstName()
			})
			.expect(500)
			.end(function (err, res) {
				if (err) return done(err)
				expect(res.body).toMatchObject({
					error: { type: "internal_server_error", message: "Internal Server Error" }
				})
				done()
			})
	})
})
