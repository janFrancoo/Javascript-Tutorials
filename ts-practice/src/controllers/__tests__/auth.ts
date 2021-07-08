import request from "supertest"
import { Express } from "express-serve-static-core"
import { createServer } from "@fclassroom/utils/create_server"
import db from "@fclassroom/utils/db"
import { createDummyAndAuthorize } from "@fclassroom/tests/user"

let server: Express

beforeAll(async () => {
	await db.open()
	server = createServer()
})

afterAll(async () => {
	await db.close()
})

describe("auth", () => {
	it("should return 200 & valid response when auth success", async (done) => {
		const dummy = await createDummyAndAuthorize()
		request(server)
			.get(`/api/v1/goodbye`)
			.set("Authorization", `Bearer ${dummy.token}`)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err)
				expect(res.body).toMatchObject({
					message: `Goodbye, ${dummy.userId}`
				})
				done()
			})
	})

	it("should return 401 & valid response when auth fail", (done) => {
		request(server)
			.get(`/api/v1/goodbye`)
			.set("Authorization", "Bearer randomToken")
			.expect(401)
			.end(function (err, res) {
				if (err) return done(err)
				expect(res.body).toMatchObject({
					error: { type: "Unauthorized", message: "Auth failed" }
				})
				done()
			})
	})
})
