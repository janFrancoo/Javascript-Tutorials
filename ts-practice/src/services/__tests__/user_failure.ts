import jwt, { Secret, SignCallback, SignOptions } from "jsonwebtoken"
import db from "@fclassroom/utils/db"
import { createDummy } from "@fclassroom/tests/user"
import user from "../user"

beforeAll(async () => {
	await db.open()
})

afterAll(async () => {
	await db.close()
})

describe("login", () => {
	it("should return internal_server_error if jwt.sign fails with the error", async () => {
		(jwt.sign as any) = (_: string | Buffer | object, __: Secret, ___: SignOptions, callback: SignCallback) => {
			callback(new Error("failure"), undefined)
		}

		const dummy = await createDummy()
		await expect(user.login(dummy.email, dummy.password)).rejects.toEqual({
			error: { type: "internal_server_error", message: "Internal Server Error" }
		})
	})
})
