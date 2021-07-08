import * as express from "express"
import { writeJsonResponse } from "@fclassroom/utils/response/response"

export function hello(req: express.Request, res: express.Response): void {
	const name = req.query.name || "stranger"
	const message = `Hello, ${name}!`
	res.json({
		message: message
	})
}

export function goodbye(_: express.Request, res: express.Response): void {
	const userId = res.locals.auth.userId
	writeJsonResponse(res, 200, { message: `Goodbye, ${userId}` })
}
